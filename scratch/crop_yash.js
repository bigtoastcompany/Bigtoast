const sharp = require('sharp');

sharp('scratch/test_frames/yash_name_11.jpg')
  // The frame is 2160x3840. The name is around x: 1000..2000, y: 1200..1600
  .extract({ left: 1000, top: 1200, width: 1000, height: 400 })
  .toFile('scratch/test_frames/yash_name_crop.jpg')
  .then(() => console.log('Cropped yash name'))
  .catch(console.error);

