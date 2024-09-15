const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const client2 = fs.readFileSync(`${__dirname}/../client/client2.html`);
const client3 = fs.readFileSync(`${__dirname}/../client/client3.html`);

// Called in server.js. Sends one of the above html files (index) as a response. -SJH
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// Called in server.js. Sends one of the above html files (index) as a response. -SJH
const getClient2 = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(client2);
  response.end();
};

// Called in server.js. Sends one of the above html files (index) as a response. -SJH
const getClient3 = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(client3);
  response.end();
};

module.exports.getIndex = getIndex;
module.exports.getClient2 = getClient2;
module.exports.getClient3 = getClient3;
