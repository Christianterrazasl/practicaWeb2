const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');
const sequelize = require('./config/database');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

sequelize.sync().then(()=> console.log('Base de datos sincronizada')).catch(err => console.error('Error al sincronizar la base de datos: ', err));

app.post('/persona', async (req,res)=>{
    try{
        const {name, email} = req.body;
        const user = await User.create({name, email});
        res.status(201).json(user);
    }
    catch(err){
        res.status(500).send('No se pudo crear el usuario');
    }
});

app.get('/persona', async (req,res)=>{
    try{
        const users = await User.findAll();
        res.status(200).json(users);

    }catch(err){
        res.status(500).send('Error de db');
    }
})

app.listen(PORT, ()=>{console.log(`Listening on port ${PORT}`)});