const { spawn } = require('child_process');
const path = require('path');

console.log('Starting Balama Marketplace Application...');
console.log('========================================');

// Function to start a service
function startService(name, command, cwd, port) {
  console.log(`Starting ${name} (Port ${port})...`);
  
  const [cmd, ...args] = command.split(' ');
  const service = spawn(cmd, args, { 
    cwd: path.resolve(cwd),
    shell: true,
    stdio: 'inherit'
  });
  
  service.on('error', (error) => {
    console.error(`Error starting ${name}:`, error);
  });
  
  service.on('close', (code) => {
    console.log(`${name} process exited with code ${code}`);
  });
  
  return service;
}

// Start all services
const services = [
  {
    name: 'Backend Server',
    command: 'node server.js',
    cwd: './server',
    port: 3001
  },
  {
    name: 'ML Engine',
    command: 'node index.js',
    cwd: './ml',
    port: 4000
  },
  {
    name: 'Frontend',
    command: 'npm run dev',
    cwd: './client',
    port: 3000
  }
];

// Start each service
services.forEach(service => {
  startService(service.name, service.command, service.cwd, service.port);
});

console.log('\nAll services started successfully!');
console.log('Access the application at: http://localhost:3000');
console.log('Backend API: http://localhost:3001');
console.log('ML Engine: http://localhost:4000');