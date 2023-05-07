const fs = require('fs');
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles');
const distPath = path.join(__dirname, 'project-dist');
const bundlePath = path.join(distPath, 'bundle.css');

fs.rm(bundlePath, { recursive: true }, () => {
  const bundle = fs.createWriteStream(bundlePath);

  fs.readdir(stylesFolder, (err, files) => {
    if (err) throw err;
    else {
      files.forEach(file => {
        const filePath = path.join(stylesFolder, file);
        const extention = path.extname(filePath);
        if (extention === '.css') {
          const input = fs.createReadStream(filePath, 'utf-8');
          input.on('data', data => {
            bundle.write(data.toString() + '\n');
          });
        }
      });
    }
  });
});