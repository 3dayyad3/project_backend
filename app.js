const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'view')));

const initServer = () => {
  try {
    console.log('');

    const url = `mongodb://127.0.0.1:27017/project_backend`;
    mongoose.connect(url);
    console.log(url);

    const port = 8080;
    app.listen(port);
    console.log(`http://localhost:${port}`);

    console.log('');
  } catch (error) {
    console.log(error);
  }
};

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/view`);

app.use(express.json());

const eventRoute = require('./route/event.js');
const paymentRoute = require('./route/payment.js');
const userRoute = require('./route/user.js');
const ticketRoute = require('./route/ticket.js');
const stockRoute = require('./route/stock.js');
const adminRoute = require('./route/admin.js');

app.use('/api', eventRoute);
app.use('/api', paymentRoute);
app.use('/api', userRoute);
app.use('/api', ticketRoute);
app.use('/api', stockRoute);
app.use('/api', adminRoute);

const pageRoute = require('./route/page.js');

app.use('', pageRoute);

initServer();
