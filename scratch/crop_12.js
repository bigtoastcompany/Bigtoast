const sharp = require('sharp');

sharp('scratch/test_frames/yash_name_12.jpg')
  .extract({ left: 1000, top: 1200, width: 1100, height: 600 })
  .toFile('scratch/test_frames/yash_crop_12.jpg')
  .then(() => console.log('Cropped 12'));

