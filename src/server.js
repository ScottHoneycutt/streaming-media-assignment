const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const mediaHandler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Define what to do when this server recieves a request (what response it sends).
// This code executes on the server, response is sent to the client. -SJH
const onRequest = (request, response) => {
  if (request.url === '/client2') {
    htmlHandler.getClient2(request, response);
  } else if (request.url === '/client3') {
    htmlHandler.getClient3(request, response);
  } else if (request.url === '/party.mp4') {
    mediaHandler.getParty(request, response);
  } else if (request.url === '/bling.mp3') {
    mediaHandler.getBling(request, response);
  } else if (request.url === '/bird.mp4') {
    mediaHandler.getBird(request, response);
  } else {
    htmlHandler.getIndex(request, response);
  }
};

http.createServer(onRequest).listen(port);
