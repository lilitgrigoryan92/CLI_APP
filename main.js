import os from "os"
import fs from "fs"
import path from "path"

const username = os.userInfo().username;
const currentDirectory = process.cwd();

console.log(`Welcome ${username}!`);

process.on('SIGINT', () => {
  console.log(`Thank you ${username}, goodbye!`);
  process.exit();
});

function call(command) {
  const [operation, ...args] = command.split(' ');

  switch (operation) {
    case '.exit':
      process.emit('SIGINT');
      break;
    case 'ls':
      listDirectoryContents();
      break;
    case 'add':
      createFile(args[0]);
      break;
    case 'rn':
      renameFile(args[0], args[1]);
      break;
    case 'cp':
      copyFile(args[0], args[1]);
      break;
    case 'mv':
      moveFile(args[0], args[1]);
      break;
    case 'rm':
      deleteFile(args[0]);
      break;
    case 'os':
      callCommandOs(args[0]);
      break;
    default:
      console.log('Invalid input.');
  }
}

const fileIndex = [];

function listDirectoryContents() {
  fs.readdir(currentDirectory, (err, files) => {
    if (err) {
      console.log('Error reading directory:', err);
      return;
    }

    files.sort();

    const directories = [];
    const fileList = []

    files.forEach((file) => {
      const filePath = path.join(currentDirectory, file);
      const stats = fs.statSync(filePath);
      const isDirectory = stats.isDirectory();
      const fileEntry = {
        name: file,
        type: isDirectory ? "directory" : "file"
      }
      fileIndex.push(fileEntry)

      

      if (isDirectory) {
        directories.push(fileEntry);
      } else {
        fileList.push(fileEntry);
      }
     });

    console.log('Directories:');
    directories.forEach((dir,index) => console.log(`${index},${dir.name},${dir.type}`));

    console.log('Files:');
    fileIndex.forEach((file,index) => console.log(`${index}\t${file.name}\t${file.type}`));
  });
}

function createFile(fileName) {
  const filePath = path.join(currentDirectory, fileName);
  fs.writeFile(filePath, '', (err) => {
    if (err) {
      console.log('Error creating file:', err);
      return;
    }
    console.log(`File "${fileName}" created successfully.`);

})
}

function renameFile(oldPath, newFileName) {
  const oldFilePath = path.join(currentDirectory, oldPath);
  const newFilePath = path.join(currentDirectory, newFileName);

  fs.rename(oldFilePath, newFilePath, (err) => {
    if (err) {
      console.log('Renaming failed:', err);
      return;
    }
    console.log(`File "${oldPath}" renamed to "${newFileName}" successfully.`);
  });
}

function copyFile(sourcePath, destinationPath) {
  const sourceFilePath= path.join(currentDirectory, sourcePath);
  const destinationFilePath = path.join(currentDirectory, destinationPath);

  fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
    if (err) {
      console.log('Copying failed:', err);
      return;
    }
    console.log(`File "${sourcePath}" copied to "${destinationPath}" successfully.`);
  });
}

function moveFile(sourcePath, destinationPath) {
  const sourceFilePath = path.join(currentDirectory, sourcePath);
  const destinationFilePath = path.join(currentDirectory, destinationPath);

  fs.rename(sourceFilePath, destinationFilePath, (err) => {
    if (err) {
      console.log('Error moving file:', err);
      return;
    }
    console.log(`File "${sourcePath}" moved to "${destinationPath}" successfully.`);
  });
}

function deleteFile(filePath) {
  const fileToDelete = path.join(currentDirectory, filePath);

  fs.unlink(fileToDelete, (err) => {
    if (err) {
      console.log('Error deleting file:', err);
      return;
    }
    console.log(`File "${filePath}" deleted successfully.`);
  });
}

function callCommandOs(argument) {
  switch (argument) {
    case '--cpus':
      const cpus = os.cpus();
      cpus.forEach((cpu, index) => {
        console.log(`CPU ${index + 1}:`);
        console.log(`  Model: ${cpu.model}`);
        console.log(`  Clock Rate: ${cpu.speed / 1000} GHz`);
      });
      break;
    case '--homedir':
      console.log(`Home Directory: ${os.homedir()}`);
      break;
    case '--username':
      console.log(`Username: ${username}`);
      break;
    case '--architecture':
      console.log(`CPU Architecture: ${os.arch()}`);
      break;
    case '--hostname':
      console.log(`Hostname: ${os.hostname()}`);
      break;
    case '--platform':
      console.log(`Platform: ${os.platform()}`);
      break;
    case '--memory':
      console.log(`Total Memory: ${os.totalmem()} bytes`);
      break;
    default:
      console.log('Invalid input. Please enter a valid command.');
  }
}

process.stdin.on('data', (data) => {
  const command = data.toString().trim();
  call(command);
});