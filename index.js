const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');
const sequelize = require('./config/database');
const { render } = require('express/lib/response');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

sequelize.sync().then(()=> console.log('Base de datos sincronizada')).catch(err => console.error('Error al sincronizar la base de datos: ', err));

app.post('/persona', async (req,res)=>{
    try{
        const {nombre, apellido, email,fechaNacimiento} = req.body;
        const user = await User.create({nombre,apellido, email, fechaNacimiento});
        res.status(201).json(user);
    }
    catch(err){
        res.status(500).send('No se pudo crear el usuario');
    }
});

app.get('/personas-page', async (req,res)=>{
    try{
        const users = await User.findAll();
        res.render('pages/personas', {users});

    }catch(err){
        res.status(500).send('Error de db');
    }
})

app.get('/form-page', (req, res)=>{
    res.render('pages/form');

})

app.listen(PORT, ()=>{console.log(`Listening on port ${PORT}`)});