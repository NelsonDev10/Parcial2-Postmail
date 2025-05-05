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
MONGODB_URI=mongodb+srv://nelsonjr:c4BXfQCk6AKc0VG8@cluster0.dwrj6n0.mongodb.net/Postmail?retryWrites=true&w=majority&appName=Cluster0
PORT=3000
```

4. Inicia el servidor:

```bash
node app.js
```

---

## 📡 Endpoints disponibles

### 🧍 Crear cliente con créditos
**POST `/api/cliente`**  
Registra un cliente con créditos iniciales según el plan seleccionado.

#### Planes disponibles:
- **Plan 1**: 30 créditos por $135.
- **Plan 2**: 40 créditos por $160.
- **Plan 3**: 60 créditos por $180.

#### Ejemplo de solicitud:
```json
{
  "nombre": "Nelson",
  "plan": 1
}
```

#### Ejemplo de respuesta:
```json
{
  "mensaje": "Cliente registrado exitosamente con 30 créditos por $135",
  "cliente": {
    "id": "REEMPLAZAR_ID_CLIENTE",
    "nombre": "Nelson",
    "creditos": 30
  }
}
```

---

### 📦 Registrar producto
**POST `/api/producto`**  
Registra un nuevo producto disponible para envío.

#### Ejemplo de solicitud:
```json
{
  "descripcion": "Libro de programación",
  "peso": 1.5,
  "bultos": 1,
  "fechaEntrega": "2025-05-10"
}
```

#### Ejemplo de respuesta:
```json
{
  "id": "REEMPLAZAR_ID_PRODUCTO",
  "descripcion": "Libro de programación",
  "peso": 1.5,
  "bultos": 1,
  "fechaEntrega": "2025-05-10"
}
```

---

### ✉️ Registrar envío
**POST `/api/envio`**  
Registra un envío asociado a un cliente y un producto. Este endpoint descuenta créditos del cliente según el peso del producto.

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
  "costoEnvio": 5
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
  "creditos": 30
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
    "costoEnvio": 5
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
