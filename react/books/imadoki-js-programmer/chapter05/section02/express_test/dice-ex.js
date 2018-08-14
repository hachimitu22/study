const express = require('express');
const app = express();
const portNo = 3000;

app.get('/', (req, res) => {
  res.send(
    '<p><a href="/dice/6">6面体のサイコロ</a><br />' +
    '<p><a href="/dice/12">12面体のサイコロ</a><br />'
  );
});

app.get('/dice/:num', (req, res) => {
  res.send('今回の値は...' + dice(req.params.num));
});

app.get('/dice/12', (req, res) => {
  res.send('今回の値は...' + dice(12));
});

function dice (n) {
  return Math.floor(Math.random() * n) + 1;
}

app.listen(portNo, () => {
  console.log('起動しました', `http://localhost:${portNo}`);
});
