const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');
const fs = require('fs');

const files = [
  'public/arezou testimonial.mov',
  'public/testimonial.mp4',
  'public/yash final-cc.mp4'
];

files.forEach(f => {
  console.log('=== File:', f, '===');
  try {
    const s = fs.statSync(f);
    console.log('Size:', (s.size / (1024 * 1024)).toFixed(2), 'MB');
  } catch (e) {
    console.log('File error:', e.message);
  }

  try {
    execSync(`"${ffmpeg}" -i "${f}"`, { stdio: 'pipe' });
  } catch (err) {
    const lines = err.stderr.toString().split('\n');
    lines.forEach(l => {
      if (l.includes('Duration') || l.includes('Stream') || l.includes('Video') || l.includes('Audio')) {
        console.log(l.trim());
      }
    });
  }
});

