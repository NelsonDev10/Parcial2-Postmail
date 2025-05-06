const mongoose = require('mongoose');
const Cliente = require('../models/Cliente');
const Envio = require('../models/Envio');
const Producto = require('../models/Producto');

// Funciones relacionadas con clientes

// Verifica si el cliente tiene créditos disponibles
exports.verCreditos = async (req, res) => {
    try {
        const { clienteId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(clienteId)) {
            return res.status(400).json({ error: 'ID de cliente inválido' });
        }

        const cliente = await Cliente.findById(clienteId);
        if (!cliente) return res.status(404).json({ error: 'No se encontró ningún cliente' });

        res.json({ creditos: cliente.creditos });
    } catch (err) {
        console.error('Error en verCreditos:', err);
        res.status(500).json({ error: 'Error al consultar créditos' });
    }
};

// Registra un nuevo cliente y asigna créditos según el plan seleccionado
exports.registrarClienteConCreditos = async (req, res) => {
    try {
        const { nombre, plan } = req.body; // plan: 1, 2 o 3
        const creditosPorPlan = { 1: 30, 2: 40, 3: 60 };
        const costoPorPlan = { 1: 135, 2: 160, 3: 180 };

        // Validar que el nombre y el plan sean proporcionados
        if (!nombre || !plan) {
            return res.status(400).json({ error: 'El nombre y el plan son obligatorios' });
        }

        // Validar que el plan sea válido
        if (!creditosPorPlan[plan]) {
            return res.status(400).json({ error: 'Plan inválido' });
        }

        // Crear un nuevo cliente con los créditos asignados según el plan
        const cliente = new Cliente({ nombre, creditos: creditosPorPlan[plan] });
        await cliente.save();

        res.status(201).json({
            mensaje: `Cliente registrado exitosamente con ${creditosPorPlan[plan]} créditos por $${costoPorPlan[plan]}`,
            cliente
        });
    } catch (err) {
        console.error('Error en registrarClienteConCreditos:', err);
        res.status(500).json({ error: 'Error al registrar el cliente y asignar créditos' });
    }
};

// Lista todos los clientes con información básica
exports.listarClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find({}, 'nombre creditos'); // Selecciona solo los campos necesarios
        res.json(clientes);
    } catch (err) {
        console.error('Error en listarClientes:', err);
        res.status(500).json({ error: 'Error al obtener la lista de clientes' });
    }
};

// Funciones relacionadas con productos

// Crea un nuevo producto
exports.registrarProducto = async (req, res) => {
    try {
        const producto = new Producto(req.body);
        await producto.save();
        res.status(201).json(producto);
    } catch (error) {
        console.error('Error en registrarProducto:', error);
        res.status(400).json({ error: 'Error al crear un producto' });
    }
};

// Funciones relacionadas con envíos

// Registra un nuevo envío y reduce los créditos del cliente
exports.registrarEnvio = async (req, res) => {
    try {
        const { clienteId, productoId, nombre, direccion, telefono, referencia, observacion } = req.body;

        if (!mongoose.Types.ObjectId.isValid(clienteId) || !mongoose.Types.ObjectId.isValid(productoId)) {
            return res.status(400).json({ error: 'ID de cliente o producto inválido' });
        }

        const cliente = await Cliente.findById(clienteId);
        const producto = await Producto.findById(productoId);

        if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

        const costo = Math.ceil(producto.peso / 3);
        if (cliente.creditos < costo) {
            return res.status(400).json({ error: 'Créditos insuficientes' });
        }

        cliente.creditos -= costo;
        await cliente.save();

        const envio = new Envio({
            cliente: cliente._id,
            producto: producto._id,
            nombre,
            direccion,
            telefono,
            referencia,
            observacion,
            costoEnvio: costo
        });

        await envio.save();
        res.status(201).json(envio);
    } catch (error) {
        console.error('Error en registrarEnvio:', error);
        res.status(500).json({ error: 'Error al registrar el envío.' });
    }
};

// Ver los envíos de un cliente
exports.verEnviosPorCliente = async (req, res) => {
    try {
        const { clienteId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(clienteId)) {
            return res.status(400).json({ error: 'ID de cliente inválido' });
        }

        const envios = await Envio.find({ cliente: clienteId }).populate('producto');
        res.json(envios);
    } catch (err) {
        console.error('Error en verEnviosPorCliente:', err);
        res.status(500).json({ error: 'Error al consultar envíos' });
    }
};

// Elimina un envío y reembolsa créditos al cliente
exports.eliminarEnvio = async (req, res) => {
    try {
        const { envioId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(envioId)) {
            return res.status(400).json({ error: 'ID de envío inválido' });
        }

        const envio = await Envio.findById(envioId);
        if (!envio) {
            return res.status(404).json({ error: 'No se encontró ningún envío' });
        }

        const cliente = await Cliente.findById(envio.cliente);
        if (cliente) {
            cliente.creditos += envio.costoEnvio;
            await cliente.save();
        }

        await Envio.deleteOne({ _id: envioId });

        res.json({
            mensaje: 'Envío eliminado exitosamente. Créditos reembolsados.',
            creditosRestantes: cliente ? cliente.creditos : 'Cliente no encontrado'
        });
    } catch (err) {
        console.error('Error en eliminarEnvio:', err);
        res.status(500).json({ error: 'Error al eliminar el envío' });
    }
};