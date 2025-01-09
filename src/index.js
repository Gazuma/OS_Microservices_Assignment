const express = require('express');
const app = express();
const userRoutes = require('./controllers/userController');

app.use(express.json());
app.use('/users', userRoutes);

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})