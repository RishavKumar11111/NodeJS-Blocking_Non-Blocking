const express = require('express');
const app = express();
const port = 8081;

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
  const response = isPrime(number);
  res.status(200).json(response);
  return;
});

function isPrime(num) {
  let startTime = new Date(), endTime;
  let isPrime = true;
  const sqrtNum = Math.sqrt(num);
  for (let i = 2; i <= num; i++) {
    if (num % i == 0) {
      isPrime = false;
      endTime = new Date();
      break;
    }
  }
  if (isPrime) endTime = new Date();
  return { number: num, isPrime, durationForCalculation: endTime.getTime() - startTime.getTime() };
}

app.listen(port, () => console.log(`Server is listening on port ${port}`));