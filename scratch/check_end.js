const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

[101, 102, 103].forEach(t => {
  try {
    execSync(`"${ffmpeg}" -ss ${t} -i "public/testimonial.mp4" -vframes 1 -q:v 2 "scratch/test_frames/end_${t}.jpg" -y`, { stdio: 'pipe' });
  } catch (e) {}
});
console.log('done extracting end frames');

