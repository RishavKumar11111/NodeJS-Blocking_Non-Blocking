process.on('message', message => {
  const jsonResponse = isPrime(message.number);
  process.send(jsonResponse);
  process.exit();
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