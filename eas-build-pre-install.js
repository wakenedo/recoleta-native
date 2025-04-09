const { execSync } = require('child_process');

execSync('node scripts/decodeGoogleServicesJson.js', { stdio: 'inherit' });