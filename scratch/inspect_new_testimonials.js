const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');
const fs = require('fs');

const outDir = 'scratch/test_frames';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Extract sample frames from each video
const videos = [
  { name: 'arezou', file: 'public/arezou testimonial.mov', times: [2, 5, 10, 15, 20] },
  { name: 'testimonial', file: 'public/testimonial.mp4', times: [3, 10, 25, 50, 75] },
  { name: 'yash', file: 'public/yash final-cc.mp4', times: [3, 10, 25, 50, 75] }
];

videos.forEach(v => {
  v.times.forEach(t => {
    const out = `${outDir}/${v.name}_${t}s.jpg`;
    try {
      execSync(`"${ffmpeg}" -ss ${t} -i "${v.file}" -vframes 1 -q:v 2 "${out}" -y`, { stdio: 'pipe' });
      console.log('Saved', out);
    } catch (e) {
      console.error('Error on', v.name, t, e.message);
    }
  });
});

