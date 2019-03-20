const http = require('http');
const app = require('./app');

// returns valid port whether it is provided as a string or number
const normalizePort = val => {
  const port = parseInt(val, 10); // converts to integer

  if (isNaN(port)) { // return true when port is not a number
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// checks errors and handle them appropriately
const errorHandler = error => {
  /* error.syscall property is a string describing the syscall that failed. The system call (ie syscall) is the fundamental interface between an application and the Linux kernel.'listen' (ie socketcall()) is a common kernel entry point for the socket system calls.
  */
  if (error.syscall !== 'listen') {
    throw error;
  }

  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;

  switch (error.code) { // error.code is a string representing the error code.
    case 'EACCES': // permission denied
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;

    case 'EADDRINUSE': // address(ie port) already in use
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;

    default:
      throw error;
  }
};

const server = http.createServer(app);

// both error and listening events are registered to the server.
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
