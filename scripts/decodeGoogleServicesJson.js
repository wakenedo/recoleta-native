// eas-build-pre-install.js
const fs = require("fs");
const path = require("path");

function decodeGoogleServicesJson() {
  const base64 = process.env.GOOGLE_SERVICE_JSON;
  if (!base64) {
    console.warn("No GOOGLE_SERVICES_JSON env var found");
    return;
  }

  const outputPath = path.join(
    __dirname,
    "android",
    "app",
    "google-services.json"
  );
  const buffer = Buffer.from(base64, "base64");
  fs.writeFileSync(outputPath, buffer);
  console.log("✅ google-services.json written to android/app/");
}

decodeGoogleServicesJson();
