require('dotenv').config();
const express = require('express')
const connectDB = require('./src/config/db')
const routes = require('./src/routes/empRoutes')

const PORT = process.env.PORT
const app = express();
connectDB();

app.use(express.json());
app.use('/crud',routes);

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})
