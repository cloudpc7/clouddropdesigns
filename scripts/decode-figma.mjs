import fs from 'fs';

const raw = fs.readFileSync('figma-screenshot.json', 'utf8');
const match = raw.match(/"data":"([^"]+)"/);
if (!match) {
  console.error('no match');
  process.exit(1);
}
fs.writeFileSync('assets/figma-node-11-1816.png', Buffer.from(match[1], 'base64'));
console.log('written', match[1].length);