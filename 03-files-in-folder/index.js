const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, data) => {
  data.forEach(file => {
    if (!file.isDirectory()) {
      const ext = path.extname(file.name);
      const fp = path.join(__dirname, 'secret-folder', file.name);
      fs.stat(fp, (err, stats) => {
        console.log(`${path.basename(file.name, ext)} - ${ext.substring(1)} - ${stats.size}b`);

      });

    }
  });
});