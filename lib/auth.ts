import { createHmac, pbkdf2Sync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DEFAULT_ADMIN_PASSWORD, DEFAULT_ADMIN_USERNAME, SESSION_COOKIE_NAME, SESSION_DURATION_SECONDS } from "@/lib/constants";
import type { AdminSession } from "@/lib/types";

const AUTH_SECRET = process.env.ADMIN_SESSION_SECRET ?? "local-physique-session-secret-change-me";
const PASSWORD_SALT = process.env.ADMIN_PASSWORD_SALT ?? "local-physique-password-salt";

export function hashPassword(password: string) {
  return pbkdf2Sync(password, PASSWORD_SALT, 120000, 64, "sha512").toString("hex");
}

export function verifyPassword(password: string, storedHash: string) {
  const incoming = Buffer.from(hashPassword(password), "hex");
  const existing = Buffer.from(storedHash, "hex");
  if (incoming.length !== existing.length) {
    return false;
  }

  return timingSafeEqual(incoming, existing);
}

export function getDefaultAdminSeed() {
  return {
    username: DEFAULT_ADMIN_USERNAME,
    passwordHash: hashPassword(DEFAULT_ADMIN_PASSWORD),
  };
}

function sign(value: string) {
  return createHmac("sha256", AUTH_SECRET).update(value).digest("base64url");
}

export function createSessionToken(session: AdminSession) {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token?: string | null): AdminSession | null {
  if (!token) {
    return null;
  }

  const [payload, signature] = token.split(".");
  if (!payload || !signature) {
    return null;
  }

  const expected = sign(payload);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as AdminSession;
    if (Date.now() / 1000 > session.exp) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function getServerSession() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE_NAME)?.value ?? null);
}

export async function requireAdminSession() {
  const session = await getServerSession();
  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export function createCookieValue(username: string) {
  return createSessionToken({
    username,
    exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS,
  });
}
