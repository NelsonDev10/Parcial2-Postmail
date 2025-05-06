const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
require('./services/dataBase');

const envioService = require('./services/EnvioService');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

// rutas de los endpoints
app.post('/api/cliente', envioService.registrarClienteConCreditos); // Registra cliente con créditos
app.post('/api/producto', envioService.registrarProducto); // Registra un nuevo producto
app.post('/api/envio', envioService.registrarEnvio); // Registra un envío y ajusta créditos
app.get('/api/creditos/:clienteId', envioService.verCreditos); // Consulta créditos de un cliente
app.get('/api/envios/:clienteId', envioService.verEnviosPorCliente); // Lista envíos de un cliente
app.delete('/api/envio/:envioId', envioService.eliminarEnvio); // Elimina un envío y reembolsa créditos
app.get('/api/clientes', envioService.listarClientes); // Lista todos los clientes

app.listen(port, () => {
    console.log(`Servidor corriendo en ${port}`);
});