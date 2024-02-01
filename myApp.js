const express = require('express');
const app = express();

app.use('/public', express.static(__dirname + '/public'));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

const getUnixAndUTCDate = (date) => {
  return {
    'unix': date.valueOf(),
    'utc': date.toUTCString()
  }
}

const getInvalidDateObj = () => {
  return { error: 'Invalid Date' };
} 
const convertStringToDateObj = (string) => {

  if (!string) return getUnixAndUTCDate(new Date());

  if (Number(string)) return getUnixAndUTCDate(new Date(Number(string)));
  
  let date = new Date(string);

  if (date.toString() === 'Invalid Date') return getInvalidDateObj();

  return getUnixAndUTCDate(date);
};

app.get('/api/:date?', (req, res) => {
  const response = convertStringToDateObj(req.params.date);
  res.send(response);
})





module.exports = app;