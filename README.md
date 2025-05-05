# POSTMAIL API - Parcial 2 de Programación Orientada a Objetos

Este proyecto consiste en una API REST para la gestión de envíos postales. Utiliza Node.js, Express y MongoDB, y aplica los pilares de la Programación Orientada a Objetos (POO): encapsulamiento, herencia, polimorfismo y abstracción.

## 🚀 Instalación

1. Clona el repositorio y entra a la carpeta del proyecto.
2. Ejecuta:

```bash
npm install
```

3. Asegúrate de tener un archivo `.env` con tu conexión de MongoDB Atlas, por ejemplo:

```env
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/Postmail?retryWrites=true&w=majority
PORT=3000
```

4. Inicia el servidor:

```bash
node app.js
```

## 🧪 Endpoints de la API

### 📦 Registrar producto
**POST `/api/producto`**  
Registra un nuevo producto disponible para envío.

```bash
curl -X POST http://localhost:3000/api/producto \
-H "Content-Type: application/json" \
-d '{"descripcion": "Libro de programación", "peso": 1.5, "bultos": 1, "fechaEntrega": "2025-05-10"}'
```

---

### ✉️ Registrar envío
**POST `/api/envio`**  
Registra un envío asociado a un cliente y un producto, y descuenta créditos del cliente.

```bash
curl -X POST http://localhost:3000/api/envio \
-H "Content-Type: application/json" \
-d '{"clienteId": "REEMPLAZAR_ID_CLIENTE", "productoId": "REEMPLAZAR_ID_PRODUCTO", "nombre": "Envio 1", "direccion": "Calle Falsa 123", "telefono": "12345678", "referencia": "Casa azul", "observacion": "Entregar en la mañana"}'
```

---

### 🔍 Ver créditos de un cliente
**GET `/api/creditos/:clienteId`**  
Consulta cuántos créditos le quedan a un cliente.

```bash
curl http://localhost:3000/api/creditos/REEMPLAZAR_ID_CLIENTE
```

---

### 🗂️ Ver todos los envíos de un cliente
**GET `/api/envios/:clienteId`**  
Lista todos los envíos realizados por un cliente.

```bash
curl http://localhost:3000/api/envios/REEMPLAZAR_ID_CLIENTE
```

---

### ❌ Eliminar un envío
**DELETE `/api/envio/:envioId`**  
Elimina un envío específico y reembolsa los créditos al cliente.

```bash
curl -X DELETE http://localhost:3000/api/envio/REEMPLAZAR_ID_ENVIO
```

---

### 🧍 Crear cliente con créditos
**POST `/api/cliente`**  
Registra un cliente con créditos iniciales según el plan seleccionado.

```bash
curl -X POST http://localhost:3000/api/cliente \
-H "Content-Type: application/json" \
-d '{"nombre": "Nelson", "plan": 1}'
```

---

### 👥 Listar todos los clientes
**GET `/api/clientes`**  
Muestra una lista completa de los clientes registrados con su información básica.

```bash
curl http://localhost:3000/api/clientes
```

---

## 🧠 Comentarios

Cada endpoint aplica los principios de la POO. Se manejan modelos para `Cliente`, `Producto` y `Envio`, y todos los servicios están centralizados en `services/EnvioService.js`.

📌 **Recuerda reemplazar `REEMPLAZAR_ID_CLIENTE`, `REEMPLAZAR_ID_PRODUCTO`, y `REEMPLAZAR_ID_ENVIO` por los valores reales que obtengas desde MongoDB.**
