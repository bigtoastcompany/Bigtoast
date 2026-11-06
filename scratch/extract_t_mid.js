const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

[30, 45, 60, 75, 90, 100].forEach(t => {
  try {
    execSync(`"${ffmpeg}" -ss ${t} -i "public/testimonial.mp4" -vframes 1 -q:v 2 "scratch/test_frames/t_mid_${t}.jpg" -y`, { stdio: 'pipe' });
  } catch (e) {}
});
console.log('done extracting testimonial mid frames');

