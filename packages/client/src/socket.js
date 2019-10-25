import io from 'socket.io-client';

const socket = io('http://localhost:7000', {
  transports: ['websocket']
});

const longitude = document.getElementById('longitude');
const latitude = document.getElementById('latitude');

socket.on('connect', () => {});

socket.on('disconnect', () => {});

socket.on('iss', data => {
  latitude.innerHTML = data.latitude;
  longitude.innerHTML = data.longitude;
});
