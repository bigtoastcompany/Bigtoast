const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

// Extract frames at 8, 9, 10, 11, 12, 13, 14s of yash final-cc.mp4
[8, 9, 10, 11, 12, 13, 14].forEach(t => {
  try {
    execSync(`"${ffmpeg}" -ss ${t} -i "public/yash final-cc.mp4" -vframes 1 -q:v 2 "scratch/test_frames/yash_name_${t}.jpg" -y`, { stdio: 'pipe' });
  } catch (e) {}
});
console.log('done extracting yash name frames');

