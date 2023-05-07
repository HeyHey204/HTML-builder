
const fs = require('fs');
const path = require('path');

const copyDir = () => {
  const oldDir = path.join(__dirname, 'files');
  const newDir = path.join(__dirname, 'files-copy');

  fs.rm(newDir, { recursive: true }, () => {
    fs.mkdir(newDir, { recursive: true }, err => {
      if (err) throw err;
      fs.readdir(oldDir, (err, files) => {
        if (err) throw err;
        else {
          for (let file in files) {
            fs.copyFile(path.join(oldDir, files[file]), path.join(newDir, files[file]), (err) => {
              if (err) throw err;
            });
          }
        }
      });
    });
  });
};

copyDir();