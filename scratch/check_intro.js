const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

// Extract frames at 1, 2, 4, 6, 8, 12, 16, 20s from testimonial.mp4
[1, 2, 4, 6, 8, 12, 16, 20].forEach(t => {
  try {
    execSync(`"${ffmpeg}" -ss ${t} -i "public/testimonial.mp4" -vframes 1 -q:v 2 "scratch/test_frames/t_intro_${t}.jpg" -y`, { stdio: 'pipe' });
  } catch (e) {}
});
console.log('done extracting testimonial intro');

