import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { COURSE_FORMATS, DEFAULT_PRICING, DEFAULT_SITE_SETTINGS, SCHOOL_LEVELS } from "@/lib/constants";
import { getDefaultAdminSeed } from "@/lib/auth";
import type { DashboardStats, Pricing, Reservation, ReservationStatus, SiteSettings, StudentProfile } from "@/lib/types";
import { normalizeMoroccanPhone } from "@/lib/utils";

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "physique.db");
let db: Database.Database | null = null;
let initialized = false;

function getDb() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!db) {
    db = new Database(dbPath);
    db.pragma("journal_mode = WAL");
    db.pragma("busy_timeout = 5000");
  }

  if (!initialized) {
    initDb(db);
    initialized = true;
  }

  return db;
}

function initDb(database: Database.Database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_name TEXT NOT NULL,
      school TEXT NOT NULL,
      level TEXT NOT NULL,
      course_format TEXT NOT NULL DEFAULT 'Cours collectif mini groupe',
      whatsapp TEXT NOT NULL,
      city TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      confirmed_at TEXT
    );

    CREATE TABLE IF NOT EXISTS pricing (
      level TEXT PRIMARY KEY,
      price INTEGER NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      center_name TEXT NOT NULL,
      center_address TEXT NOT NULL,
      maps_url TEXT NOT NULL,
      format_pricing_json TEXT NOT NULL DEFAULT '{}',
      course_formats_json TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const reservationColumns = database.prepare("PRAGMA table_info(reservations)").all() as Array<{ name: string }>;
  const hasCourseFormat = reservationColumns.some((column) => column.name === "course_format");
  if (!hasCourseFormat) {
    database.exec(
      "ALTER TABLE reservations ADD COLUMN course_format TEXT NOT NULL DEFAULT 'Cours collectif mini groupe'",
    );
  }

  const settingsColumns = database.prepare("PRAGMA table_info(site_settings)").all() as Array<{ name: string }>;
  const hasFormatPricing = settingsColumns.some((column) => column.name === "format_pricing_json");
  if (!hasFormatPricing) {
    database.exec("ALTER TABLE site_settings ADD COLUMN format_pricing_json TEXT NOT NULL DEFAULT '{}'");
  }

  const seed = getDefaultAdminSeed();
  database.prepare(
    `
      INSERT INTO admins (username, password_hash)
      VALUES (@username, @passwordHash)
      ON CONFLICT(username) DO NOTHING
    `,
  ).run(seed);

  const insertPricing = database.prepare(
    `
      INSERT INTO pricing (level, price)
      VALUES (@level, @price)
      ON CONFLICT(level) DO NOTHING
    `,
  );

  for (const level of SCHOOL_LEVELS) {
    insertPricing.run({ level, price: DEFAULT_PRICING[level] });
  }

  database
    .prepare(
      `
        INSERT INTO site_settings (id, center_name, center_address, maps_url, course_formats_json)
        VALUES (1, @centerName, @centerAddress, @mapsUrl, @courseFormatsJson)
        ON CONFLICT(id) DO NOTHING
      `,
    )
    .run({
      centerName: DEFAULT_SITE_SETTINGS.centerName,
      centerAddress: DEFAULT_SITE_SETTINGS.centerAddress,
      mapsUrl: DEFAULT_SITE_SETTINGS.mapsUrl,
      courseFormatsJson: JSON.stringify(DEFAULT_SITE_SETTINGS.courseFormats),
    });

  database
    .prepare(
      `
        UPDATE site_settings
        SET format_pricing_json = COALESCE(NULLIF(format_pricing_json, '{}'), @formatPricingJson)
        WHERE id = 1
      `,
    )
    .run({
      formatPricingJson: JSON.stringify(DEFAULT_SITE_SETTINGS.formatPricing),
    });
}

function mapReservation(row: Record<string, unknown>): Reservation {
  return {
    id: row.id as number,
    studentName: row.student_name as string,
    school: row.school as string,
    level: row.level as StudentProfile,
    courseFormat: row.course_format as Reservation["courseFormat"],
    whatsapp: row.whatsapp as string,
    city: row.city as string,
    status: row.status as ReservationStatus,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    confirmedAt: row.confirmed_at as string | null,
  };
}

export function getAdminByUsername(username: string) {
  return getDb().prepare("SELECT * FROM admins WHERE username = ?").get(username) as
    | { username: string; password_hash: string }
    | undefined;
}

export function createReservation(input: Omit<Reservation, "id" | "status" | "createdAt" | "updatedAt" | "confirmedAt">) {
  const now = new Date().toISOString();
  const result = getDb()
    .prepare(
      `
        INSERT INTO reservations (student_name, school, level, course_format, whatsapp, city, status, created_at, updated_at)
        VALUES (@studentName, @school, @level, @courseFormat, @whatsapp, @city, 'pending', @createdAt, @updatedAt)
      `,
    )
    .run({
      ...input,
      whatsapp: normalizeMoroccanPhone(input.whatsapp),
      createdAt: now,
      updatedAt: now,
    });

  return getReservationById(Number(result.lastInsertRowid));
}

export function getReservationById(id: number) {
  const row = getDb().prepare("SELECT * FROM reservations WHERE id = ?").get(id) as Record<string, unknown> | undefined;
  return row ? mapReservation(row) : null;
}

export function getReservations() {
  const rows = getDb()
    .prepare("SELECT * FROM reservations ORDER BY id DESC")
    .all() as Record<string, unknown>[];
  return rows.map(mapReservation);
}

export function getLatestReservation() {
  const row = getDb()
    .prepare("SELECT * FROM reservations ORDER BY id DESC LIMIT 1")
    .get() as Record<string, unknown> | undefined;
  return row ? mapReservation(row) : null;
}

export function updateReservation(
  id: number,
  input: Omit<Reservation, "id" | "createdAt" | "updatedAt" | "confirmedAt">,
) {
  const now = new Date().toISOString();
  const confirmedAt = input.status === "confirmed" ? now : null;

  getDb().prepare(
    `
      UPDATE reservations
      SET student_name = @studentName,
          school = @school,
          level = @level,
          course_format = @courseFormat,
          whatsapp = @whatsapp,
          city = @city,
          status = @status,
          updated_at = @updatedAt,
          confirmed_at = @confirmedAt
      WHERE id = @id
    `,
  ).run({
    id,
    ...input,
    whatsapp: normalizeMoroccanPhone(input.whatsapp),
    updatedAt: now,
    confirmedAt,
  });

  return getReservationById(id);
}

export function confirmReservation(id: number) {
  const now = new Date().toISOString();
  getDb().prepare(
    `
      UPDATE reservations
      SET status = 'confirmed',
          updated_at = ?,
          confirmed_at = ?
      WHERE id = ?
    `,
  ).run(now, now, id);

  return getReservationById(id);
}

export function deleteReservation(id: number) {
  return getDb().prepare("DELETE FROM reservations WHERE id = ?").run(id);
}

export function getPricing(): Pricing {
  const rows = getDb().prepare("SELECT level, price FROM pricing").all() as Array<{ level: StudentProfile; price: number }>;

  return rows.reduce(
    (acc, row) => {
      acc[row.level] = row.price;
      return acc;
    },
    { ...DEFAULT_PRICING },
  );
}

export function updatePricing(pricing: Pricing) {
  const now = new Date().toISOString();
  const database = getDb();
  const statement = database.prepare(
    `
      INSERT INTO pricing (level, price, updated_at)
      VALUES (@level, @price, @updatedAt)
      ON CONFLICT(level) DO UPDATE SET
        price = excluded.price,
        updated_at = excluded.updated_at
    `,
  );

  const transaction = database.transaction((input: Pricing) => {
    for (const level of SCHOOL_LEVELS) {
      statement.run({
        level,
        price: input[level],
        updatedAt: now,
      });
    }
  });

  transaction(pricing);
  return getPricing();
}

export function getDashboardStats(): DashboardStats {
  const settings = getSiteSettings();
  const reservations = getReservations();
  const today = new Date().toISOString().slice(0, 10);
  const levelBreakdown = SCHOOL_LEVELS.map((level) => ({
    level,
    count: reservations.filter((reservation) => reservation.level === level).length,
  }));
  const getReservationValue = (reservation: Reservation) => settings.formatPricing[reservation.courseFormat] ?? 0;
  const revenueByFormat = COURSE_FORMATS.map((format) => {
    const confirmed = reservations.filter((reservation) => reservation.status === "confirmed" && reservation.courseFormat === format);
    return {
      format,
      count: confirmed.length,
      revenue: confirmed.reduce((total, reservation) => total + getReservationValue(reservation), 0),
    };
  });

  return {
    totalReservations: reservations.length,
    todayReservations: reservations.filter((reservation) => reservation.createdAt.slice(0, 10) === today).length,
    confirmedReservations: reservations.filter((reservation) => reservation.status === "confirmed").length,
    estimatedRevenue: reservations
      .filter((reservation) => reservation.status === "confirmed")
      .reduce((total, reservation) => total + getReservationValue(reservation), 0),
    pendingRevenue: reservations
      .filter((reservation) => reservation.status === "pending")
      .reduce((total, reservation) => total + getReservationValue(reservation), 0),
    revenueByFormat,
    levelBreakdown,
  };
}

export function getSiteSettings(): SiteSettings {
  const row = getDb()
    .prepare("SELECT center_name, center_address, maps_url, format_pricing_json, course_formats_json FROM site_settings WHERE id = 1")
    .get() as
    | {
        center_name: string;
        center_address: string;
        maps_url: string;
        format_pricing_json: string;
        course_formats_json: string;
      }
    | undefined;

  if (!row) {
    return DEFAULT_SITE_SETTINGS;
  }

  return {
    centerName: row.center_name,
    centerAddress: row.center_address,
    mapsUrl: row.maps_url,
    formatPricing: {
      ...DEFAULT_SITE_SETTINGS.formatPricing,
      ...JSON.parse(row.format_pricing_json || "{}"),
    },
    courseFormats: JSON.parse(row.course_formats_json),
  };
}

export function updateSiteSettings(settings: SiteSettings) {
  const now = new Date().toISOString();
  getDb()
    .prepare(
      `
        INSERT INTO site_settings (id, center_name, center_address, maps_url, course_formats_json, updated_at)
        VALUES (1, @centerName, @centerAddress, @mapsUrl, @courseFormatsJson, @updatedAt)
        ON CONFLICT(id) DO UPDATE SET
          center_name = excluded.center_name,
          center_address = excluded.center_address,
          maps_url = excluded.maps_url,
          course_formats_json = excluded.course_formats_json,
          updated_at = excluded.updated_at
      `,
    )
    .run({
      centerName: settings.centerName,
      centerAddress: settings.centerAddress,
      mapsUrl: settings.mapsUrl,
      courseFormatsJson: JSON.stringify(settings.courseFormats),
      updatedAt: now,
    });

  getDb()
    .prepare("UPDATE site_settings SET format_pricing_json = @formatPricingJson, updated_at = @updatedAt WHERE id = 1")
    .run({
      formatPricingJson: JSON.stringify(settings.formatPricing),
      updatedAt: now,
    });

  return getSiteSettings();
}
