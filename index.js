const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

/**
 * Const defining crypto pair rates
 */
const prices = 
  { 'BTCUSD' : '6,133.9048',
    'ETHUSD' : '438.70',
    'ETHBTC' : '0.071300',
    'XRPUSD' : '0.47067'
  };

/**
 * Serve index.html at root endpoint
 */
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

/**
 * Handle getQuote request on connection
 */
io.on('connection', function (socket) {
  console.log('Hi from server!');
  socket.on('getQuote', function(quoteRequest){
    console.log('quoteRequest: ' + quoteRequest);
    var quote = prices[quoteRequest];
    if (quote == null) {
      quote = 'Not found!';
    }
    socket.emit('rate', { 'ticker' : quoteRequest, 'quote' : quote } );
  });
});

/**
 * Server listens on port 5000
 */
server.listen(5000, () => {
  console.log("Server started!")
})