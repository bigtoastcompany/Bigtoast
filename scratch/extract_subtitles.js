const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

for (let i = 1; i <= 25; i++) {
  try {
    execSync(`"${ffmpeg}" -ss ${i} -i "public/testimonial.mp4" -vframes 1 -q:v 2 "scratch/test_frames/sub_${i}.jpg" -y`, { stdio: 'pipe' });
  } catch (e) {}
}
console.log('done extracting subtitle frames');

