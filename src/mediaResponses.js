const fs = require('fs');
const path = require('path');

const writeResponseHead = (response, chunkSize, start, end, total, isMp3) => {
  if (isMp3) {
    response.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'audio/mpeg',
    });
  } else {
    response.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    });
  }
};

// Helper method. Steams media (based upon the specified fileObject) back to the client. -SJH
const streamMedia = (fileObject, request, response) => {
  fs.stat(fileObject, (error, statsObject) => {
    // Check to see if the file could be found;
    if (error) {
      if (error === 'ENOENT') {
        response.writeHead(404);
      }
      return response.end(error);
    }

    // No error. Continue parsing file to be streamed. -SJH
    let { range } = request.headers;
    if (!range) {
      range = 'bytes=0-';
    }

    // Determine what chunks of data to send based upon headers. -SJH
    const positions = range.replace(/bytes=/, '').split('-');
    let start = parseInt(positions[0], 10);
    const total = statsObject.size;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

    if (start > end) {
      start = end - 1;
    }

    const chunkSize = end - start + 1;
    // Check to see if file type is mp3 or mp4 -SJH
    let isMp3 = false;
    if (request.url.substr(request.url.length - 4) === '.mp3') {
      isMp3 = true;
    }
    writeResponseHead(
      response,
      chunkSize,
      start,
      end,
      total,
      isMp3,
    );

    const stream = fs.createReadStream(fileObject, { start, end });

    stream.on('open', () => {
      stream.pipe(response);
    });

    stream.on('error', (streamError) => {
      stream.end(streamError);
    });

    return stream;
  });
};

// Called in server.js.  -SJH
const getParty = (request, response) => {
  const fileObject = path.resolve(__dirname, '../client/party.mp4');
  return streamMedia(fileObject, request, response);
};

// Called in server.js.  -SJH
const getBird = (request, response) => {
  const fileObject = path.resolve(__dirname, '../client/bird.mp4');
  return streamMedia(fileObject, request, response);
};

// Called in server.js.  -SJH
const getBling = (request, response) => {
  const fileObject = path.resolve(__dirname, '../client/bling.mp3');
  return streamMedia(fileObject, request, response);
};

module.exports.getParty = getParty;
module.exports.getBling = getBling;
module.exports.getBird = getBird;
