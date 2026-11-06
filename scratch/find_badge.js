const fs = require('fs');
const content = fs.readFileSync('app/project/page.tsx', 'utf8');
const lines = content.split('\n');

lines.forEach((l, idx) => {
  if (l.includes('Yanisa') || (l.includes('client') && (l.includes('===') || l.includes('&&') || l.includes('badge')))) {
    console.log(`${idx + 1}: ${l.trim()}`);
  }
});

