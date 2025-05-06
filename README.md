# 📦 POSTMAIL API - Parcial 2 de Programación Orientada a Objetos

Este proyecto consiste en una API REST para la gestión de envíos postales. Utiliza Node.js, Express y MongoDB, y aplica los pilares de la Programación Orientada a Objetos (POO): encapsulamiento, herencia, polimorfismo y abstracción.

---

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

---

## 📡 Endpoints disponibles

### ✉️ Registrar envío
**POST `/api/envio`**  
Registra un envío asociado a un cliente y un producto. Este endpoint descuenta créditos del cliente según el peso del producto.

#### Lógica de créditos:
- Si el peso del producto es menor o igual a **3 lb**, se descuenta **1 crédito**.
- Si el peso del producto sobrepasa las **3 lb**, se cobra el doble de créditos por cada 3 lb adicionales:
  - **3-6 lb**: 2 créditos.
  - **6-9 lb**: 3 créditos.
  - Y así sucesivamente.

#### Ejemplo de solicitud:
```json
{
  "clienteId": "REEMPLAZAR_ID_CLIENTE",
  "productoId": "REEMPLAZAR_ID_PRODUCTO",
  "nombre": "Envio 1",
  "direccion": "Calle Falsa 123",
  "telefono": "12345678",
  "referencia": "Casa azul",
  "observacion": "Entregar en la mañana"
}
```

#### Ejemplo de respuesta:
```json
{
  "id": "REEMPLAZAR_ID_ENVIO",
  "cliente": "REEMPLAZAR_ID_CLIENTE",
  "producto": "REEMPLAZAR_ID_PRODUCTO",
  "nombre": "Envio 1",
  "direccion": "Calle Falsa 123",
  "telefono": "12345678",
  "referencia": "Casa azul",
  "observacion": "Entregar en la mañana",
  "pesoProducto": 7.5,
  "costoEnvio": 3, // Créditos descontados
  "creditosRestantes": 27
}
```

---

### 🔍 Ver créditos de un cliente
**GET `/api/creditos/:clienteId`**  
Consulta cuántos créditos le quedan a un cliente.

#### Ejemplo de respuesta:
```json
{
  "clienteId": "REEMPLAZAR_ID_CLIENTE",
  "creditos": 27
}
```

---

### 🗂️ Ver todos los envíos de un cliente
**GET `/api/envios/:clienteId`**  
Lista todos los envíos realizados por un cliente.

#### Ejemplo de respuesta:
```json
[
  {
    "id": "REEMPLAZAR_ID_ENVIO",
    "nombre": "Envio 1",
    "direccion": "Calle Falsa 123",
    "telefono": "12345678",
    "referencia": "Casa azul",
    "observacion": "Entregar en la mañana",
    "pesoProducto": 7.5,
    "costoEnvio": 3
  }
]
```

---

### ❌ Eliminar un envío
**DELETE `/api/envio/:envioId`**  
Elimina un envío específico y reembolsa los créditos al cliente.

#### Ejemplo de respuesta:
```json
{
  "mensaje": "Envío eliminado exitosamente. Créditos reembolsados.",
  "creditosRestantes": 30
}
```

---

### 👥 Listar todos los clientes
**GET `/api/clientes`**  
Muestra una lista completa de los clientes registrados con su información básica.

#### Ejemplo de respuesta:
```json
[
  {
    "id": "REEMPLAZAR_ID_CLIENTE",
    "nombre": "Nelson",
    "creditos": 30
  }
]
```

---

## 🗂️ Estructura de carpetas

```
PARCIAL POO/
│
├── app.js                 # Archivo principal de la aplicación
├── .env                   # Variables de entorno
├── package.json           # Dependencias del proyecto
├── README.md              # Documentación del proyecto
├── models/                # Modelos de datos
│   ├── Cliente.js         # Modelo para los clientes
│   ├── Envio.js           # Modelo para los envíos
│   └── Producto.js        # Modelo para los productos
├── services/              # Servicios de la aplicación
│   ├── dataBase.js        # Conexión a la base de datos
│   └── EnvioService.js    # Lógica de negocio para los envíos
```

---
