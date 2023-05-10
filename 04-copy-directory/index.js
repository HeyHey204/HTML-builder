
const fs = require('fs');
const path = require('path');

const oldDir = path.join(__dirname, 'files');
const newDir = path.join(__dirname, 'files-copy');

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

copyDir(oldDir, newDir);