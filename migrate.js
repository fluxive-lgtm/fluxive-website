require('dotenv').config();
const { spawn } = require('child_process');

console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Found' : 'Missing');

const child = spawn('npx', ['prisma', 'db', 'push'], {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env }
});

child.on('exit', code => {
    console.log(`Child process exited with code ${code}`);
    process.exit(code);
});
