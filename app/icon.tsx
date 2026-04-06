import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #082335, #13a0d2)",
          color: "white",
          fontSize: 180,
          fontWeight: 700,
        }}
      >
        β
      </div>
    ),
    size,
  );
}
