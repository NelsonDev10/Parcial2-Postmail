const mongoose = require('mongoose');
require('dotenv').config();

class Database {
    constructor(){
        this.connect();
    }

    connect(){
        mongoose.connect(process.env.MONGO_URI, {
        })
        .then(() => console.log('Conexión exitosa a bd'))
        .catch(err => console.error('Error de configuración', err));
    }

    static obtenerConexion()
    {
        if(!Database.instance){
            Database.instance = new Database();
        }

        return Database.instance;
    }    
}
module.exports = Database.obtenerConexion();
  