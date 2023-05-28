import os from "node:os"

const username = os.userInfo().username;

console.log(`Welcome ${username}!`);
process.stdout.write('> ');

process.stdin.on('data', (input) => {
  const command = input.toString().trim();

  if (command === '.exit') {
    console.log(`Thank you ${username}, goodbye!`);
    process.exit();
  } else if (command.startsWith('os')) {
    const option = command.split(' ')[1];

    if (option === '--cpus') {
      const cpus = os.cpus();
      console.log(`CPUs: ${cpus.length}`);
      cpus.forEach((cpu, index) => {
        console.log(`CPU ${index }: Model - ${cpu.model}, Clock Rate - ${cpu.speed} MHz`);
      });
    } else if (option === '--homedir') {
      console.log(`Home Directory: ${os.homedir()}`);
    } else if (option === '--username') {
      console.log(`Username: ${os.userInfo().username}`);
    } else if (option === '--architecture') {
      console.log(`CPU Architecture: ${os.arch()}`);
    } else if (option === '--hostname') {
      console.log(`Hostname: ${os.hostname()}`);
    } else if (option === '--platform') {
      console.log(`Platform: ${os.platform()}`);
    } else if (option === '--memory') {
      const totalMemory = os.totalmem();
      console.log(`Total memory: ${totalMemory} bytes`)

    } else {
      console.log('Invalid operation');
    }
  } else {
    console.log('Invalid input');
  }

  process.stdout.write('> ');
});

process.on('SIGINT', () => {
  console.log(`Thank you ${username}, goodbye!`);
  process.exit();
});