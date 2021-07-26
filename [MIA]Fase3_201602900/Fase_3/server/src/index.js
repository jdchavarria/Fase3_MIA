const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const path = require('path');

//import
const personRoutes = require('./routes/user-routes');

//setting
app.set('port',3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extend:false}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use(personRoutes);

//run
app.listen(app.set('port'),()=>{
    console.log('server on port 3000')
})