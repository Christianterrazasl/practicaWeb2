const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('web2', 'postgres', 'postgres', { host: 'localhost', dialect:'postgres' });

async function testConnection() {
    try{
        await sequelize.authenticate();
        console.log("Conexion establecida con exito");
    }
    catch(error){
        console.error("Error al establecer conexion:", error);
    }
}

testConnection();

module.exports= sequelize;