const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');
const dbConnection = require('./database/connection');

dotEnv.config();

const app = express();

//db Connection
dbConnection();
//cors
app.use(cors());

//requesrt Payload middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1/product', require('./routes/productRoutes'));

/*const myMiddleware = (req, res, next) => {
    console.log('Hey Arnav');
    next();
}*/
//we can initiate the  appliaction middleware using below code
//app.use(myMiddleware);

/*app.get('/',myMiddleware, (req, res, next)=>{
    res.send('Hello form node API server.');
});*/

app.get('/', (req, res, next)=>{
    res.send('Hello form node API server.');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
   console.log(`Server listening on port ${PORT}`) ;
});

//error handler middleware
app.use(function(err, req, res, next){
 console.error(err.stack);
 res.status(500).send({
     status:500,
     message: err.message,
     body:{}
 });
});