import os from "os"


const username = os.userInfo().username;

console.log(`Welcome ${username}!`);

process.on('SIGINT', () => {
  console.log(`Thank you ${username}, goodbye!`);
  process.exit();
});

function call(command) {
  const [operation, argument] = command.split(' ');

  switch (operation) {
    case '.exit':
      process.emit('SIGINT');
      break;
    case 'os':
        callCommandOs(argument);
      break;
    default:
      console.log('Invalid input. Please enter a valid command.');
  }
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
