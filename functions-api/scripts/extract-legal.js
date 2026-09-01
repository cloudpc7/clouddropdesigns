const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../../src/content/vibenmedLegalContent.js');
const outPath = path.join(__dirname, '../src/seed/vibenmedLegal.json');
const src = fs.readFileSync(srcPath, 'utf8');

const extract = (name) => {
  const match = src.match(new RegExp(`export const ${name} = "([\\s\\S]*?)";`));
  if (!match) {
    throw new Error(`Could not extract ${name} from ${srcPath}`);
  }
  return JSON.parse(`"${match[1]}"`);
};

const payload = {
  privacyPolicyHtml: extract('PRIVACY_POLICY_HTML'),
  termsBodyHtml: extract('TERMS_BODY_HTML'),
};

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`);
console.log(`Wrote ${outPath}`);
