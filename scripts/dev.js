import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';

const children = [];
let stopping = false;
function start(label, command, args) {
  const child = spawn(command, args, { stdio: 'inherit', env: process.env });
  children.push(child);
  child.on('error', error => {
    console.error(`[${label}] Could not start: ${error.message}`);
    shutdown(1);
  });
  child.on('exit', (code, signal) => {
    if (!stopping) {
      console.error(`[${label}] stopped (${signal || code}). Shutting down both servers.`);
      shutdown(code || 1);
    }
  });
}
function shutdown(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) if (child.exitCode === null && !child.killed) child.kill('SIGTERM');
  setTimeout(() => process.exit(code), 300).unref();
}
process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
const envArgs = existsSync('.env') ? ['--env-file=.env'] : [];
start('API', process.execPath, ['--watch', ...envArgs, 'src/server/index.js']);
start('Vite', process.execPath, ['node_modules/vite/bin/vite.js']);
