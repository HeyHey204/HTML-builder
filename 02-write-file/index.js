const fs = require('fs');
const path = require('path');
const { stdin, stdout } = require('process');
const readline = require('readline');

const output = fs.createWriteStream(path.join(__dirname, 'newfile.txt'));
const rl = readline.createInterface(stdin, stdout);

console.log('Hi! Please, type something below. Type "exit" or press CTRL+C to close.');

rl.on('line', chunk => {
  if (chunk === 'exit') {
    rl.close();
  } else {
    output.write(chunk);
  }
});

process.on('exit', () => stdout.write('\nExit event reached... Thanks for typing!'));