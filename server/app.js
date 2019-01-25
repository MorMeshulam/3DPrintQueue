
const express = require('express');
const queue = require('./controllers/queue');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// app.all('*', function (req, res, next) {
//   console.log('Accessing the secret section ...')
//   next() // pass control to the next handler
// });
//app.all('/api/*', requireAuthentication);
app.get('/', (req, res) => {
  res.status(200).send('3DPrint Queue Server Is Running!').end();
});
app.use('/api/queue', queue);

if (module === require.main) {

  const server = app.listen(process.env.PORT || 4001, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);

    //init socket io client server communication
    const socketWorker = require('./services/socket.io.worker');
    socketWorker.init(server);
  });
}

module.exports = app;