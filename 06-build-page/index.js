const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'project-dist');
const stylesPath = path.join(__dirname, 'styles');
const assetsOldPath = path.join(__dirname, 'assets');
const assetsNewPath = path.join(distPath, 'assets');
const bundlePath = path.join(distPath, 'style.css');
const templatePath = path.join(__dirname, 'template.html');
const htmlPath = path.join(distPath, 'index.html');

fs.mkdir(distPath, { recursive: true }, (err) => {
  if (err) throw err;
});

function copyDir(oldDir, newDir) {
  fs.rm(newDir, { recursive: true }, () => {
    fs.mkdir(newDir, { recursive: true }, err => {
      if (err) throw err;
      fs.readdir(oldDir, { withFileTypes: true }, (err, files) => {
        if (err) throw err;
        else {
          files.forEach(file => {
            const oldFile = path.join(oldDir, file.name);
            const newFile = path.join(newDir, file.name);

            if (file.isFile()) {
              fs.copyFile(oldFile, newFile, (err) => {
                if (err) throw err;
              });
            }
            if (file.isDirectory()) {
              copyDir(oldFile, newFile);
            }
          });
        }
      });
    });
  });
}

function createBundle() {
  fs.rm(bundlePath, { recursive: true }, () => {
    const bundle = fs.createWriteStream(bundlePath);

    fs.readdir(stylesPath, (err, files) => {
      if (err) throw err;
      else {
        for (let file of files) {
          const filePath = path.join(stylesPath, file);
          const extention = path.extname(filePath);
          if (extention === '.css') {
            const input = fs.createReadStream(filePath, 'utf-8');
            input.on('data', data => {
              bundle.write(data.toString() + '\n');
            });
          }
        }
      }
    });
  });
}

fs.readFile(templatePath, 'utf-8', (err, data) => {
  if (err) throw err;
  let templateData = data;

  const templateTags = data.match(/{{\w+}}/gm);

  for (let tag of templateTags) {
    const tagPath = path.join(__dirname, '/components', `${tag.slice(2, -2)}.html`,);

    fs.readFile(tagPath, 'utf-8', (err, tagData) => {
      if (err) throw err;

      const htmlWS = fs.createWriteStream(htmlPath);

      templateData = templateData.replace(tag, tagData);
      htmlWS.write(templateData);
    });
  }
});

copyDir(assetsOldPath, assetsNewPath);
createBundle();