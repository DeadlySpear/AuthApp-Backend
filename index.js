const express = require('express');
const app = express();
require ('dotenv').config();
require('./models/db.js');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/authRouter.js');

app.use(bodyParser.json());
app.use(cors());

app.get('/test', (req, res) => {
  res.send('test success')
})

app.use('/auth', authRouter);     
app.use('/products', require('./routes/productRouter.js'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})