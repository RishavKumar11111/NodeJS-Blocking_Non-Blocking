const express = require('express');
const app = express();
const port = 8082;
const { fork } = require('child_process');

app.get('/isPrime/:number', (req, res, next) => {
  const number = parseInt(req.params.number);
  if (typeof number !== 'number' || number < 2 || number !== Math.round(number) || !isFinite(number) || isNaN(number)) {
    res.status(400).json({
      StatusCode: 400,
      Status: 'Bad Request',
      Description: `Invalid Number: ${number}`
    }).end();
    return;
  }
  const childProcess = fork('./isPrime.js');
  childProcess.send({ number });
  childProcess.on('message', message => res.status(200).json(message));
  return;
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));