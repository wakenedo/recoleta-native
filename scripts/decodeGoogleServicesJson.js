const fs = require("fs");
const path = require("path");

function decodeGoogleServicesJson() {
  const base64 = process.env.GOOGLE_SERVICES_JSON;

  if (!base64) {
    console.warn("⚠️ No GOOGLE_SERVICES_JSON env var found");
    return;
  }

  const outputDir = path.join(__dirname, "..", "android", "app");
  const outputPath = path.join(outputDir, "google-services.json");

  fs.mkdirSync(outputDir, { recursive: true });

  try {
    const buffer = Buffer.from(base64, "base64");
    fs.writeFileSync(outputPath, buffer);
    console.log("✅ google-services.json written to android/app/");
  } catch (err) {
    console.error("❌ Failed to write google-services.json:", err);
  }
}

decodeGoogleServicesJson();
