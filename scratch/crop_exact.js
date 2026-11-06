const sharp = require('sharp');

sharp('scratch/test_frames/yash_10s.jpg')
  .metadata()
  .then(meta => {
    console.log('dimensions:', meta.width, meta.height);
    return sharp('scratch/test_frames/yash_10s.jpg')
      .extract({
        left: Math.round(meta.width * 0.5),
        top: Math.round(meta.height * 0.3),
        width: Math.round(meta.width * 0.45),
        height: Math.round(meta.height * 0.15)
      })
      .toFile('scratch/test_frames/yash_crop_exact.jpg');
  })
  .then(() => console.log('Cropped'));

