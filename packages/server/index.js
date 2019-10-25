const server = require('http').createServer();
const axios = require('axios');

const io = require('socket.io')(server, {
  path: '/',
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

server.listen(7000, () => {
  console.log('server running');
  getPosition();
});

io.on('news', function(socket) {
  console.log(socket);
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

getPosition = () => {
  axios.get('http://api.open-notify.org/iss-now.json').then(response => {
    io.emit('iss', { ...response.data.iss_position });
    setTimeout(() => {
      getPosition();
    }, 3000);
  });
};
