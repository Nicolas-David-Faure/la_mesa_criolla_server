# 🎮 La Mesa Criolla Server

Un servidor de juegos de mesa criollos argentinos construido con Node.js, Express y Socket.IO, diseñado para permitir a los usuarios jugar juegos tradicionales como Uno, Truco, Chinchón y Escoba en tiempo real.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API de Sockets](#-api-de-sockets)
- [Juegos Disponibles](#-juegos-disponibles)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

## ✨ Características

- **Juegos en Tiempo Real**: Sistema de salas para múltiples juegos simultáneos
- **Gestión de Usuarios**: Sistema de conexión/desconexión con estado persistente
- **Sistema de Salas**: Creación y unión a salas de juego por tipo de juego
- **Arquitectura Escalable**: Diseño modular y extensible para nuevos juegos
- **TypeScript**: Código tipado para mayor robustez y mantenibilidad
- **CORS Habilitado**: Configuración para desarrollo y producción

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js 22.x
- **Framework**: Express 5.1.0
- **WebSockets**: Socket.IO 4.8.1
- **Lenguaje**: TypeScript 5.8.3
- **Desarrollo**: ts-node-dev para hot reload
- **UI Components**: Taiga UI 4.34.0
- **Utilidades**: UUID para identificación única

## 🚀 Instalación

### Prerrequisitos

- Node.js 22.x o superior
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd la_mesa_criolla_server
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno** (opcional)
   ```bash
   # Crear archivo .env si es necesario
   PORT=3000
   NODE_ENV=development
   ```

## 🎯 Uso

### Desarrollo

Para ejecutar el servidor en modo desarrollo con hot reload:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### Producción

Para construir y ejecutar en producción:

```bash
# Construir el proyecto
npm run build

# Ejecutar la versión compilada
node dist/index.js
```

## 📁 Estructura del Proyecto

```
la_mesa_criolla_server/
├── src/                          # Código fuente TypeScript
│   ├── games/                    # Lógica de juegos específicos
│   │   ├── generala/            # Juego de Generala
│   │   └── uno/                 # Juego de Uno
│   ├── sockets/                  # Sistema de WebSockets
│   │   ├── infoServer/          # Tipos y estructuras de datos
│   │   │   ├── types.ts         # Definiciones de tipos
│   │   │   ├── users.ts         # Gestión de usuarios
│   │   │   └── rooms.ts         # Gestión de salas
│   │   ├── connection.ts        # Manejo de conexiones
│   │   ├── userHandlers.ts      # Manejadores de usuarios
│   │   ├── roomsHandlers.ts     # Manejadores de salas
│   │   ├── utils/               # Utilidades
│   │   └── index.ts             # Configuración principal de sockets
│   └── index.ts                 # Punto de entrada del servidor
├── dist/                         # Código compilado JavaScript
├── package.json                  # Dependencias y scripts
├── tsconfig.json                 # Configuración de TypeScript
└── README.md                     # Este archivo
```

## 🔌 API de Sockets

### Eventos del Cliente

#### Conexión de Usuario
```typescript
socket.emit('user_connected', {
  userID: string,
  nombre: string,
  game: Games,
  socketID: string,
  roomID: string | null,
  status: 'connected'
});
```

#### Crear Sala
```typescript
socket.emit('create_room', {
  game: Games,
  name: string,
  userID: string
});
```

#### Unirse a Sala
```typescript
socket.emit('join_room', {
  userID: string,
  roomID: string
});
```

#### Mensaje General
```typescript
socket.emit('mensaje', string);
```

### Eventos del Servidor

El servidor emite eventos de respuesta para cada acción del cliente, incluyendo:
- Confirmación de conexión
- Estado de creación de salas
- Estado de unión a salas
- Actualizaciones de estado de usuarios y salas

## 🎲 Juegos Disponibles

### Juegos Implementados
- **Uno**: Juego de cartas clásico
- **Generala**: Juego de dados argentino tradicional

### Juegos Planificados
- **Truco**: Juego de cartas argentino
- **Chinchón**: Juego de cartas de origen español
- **Escoba**: Juego de cartas de baraja española

## 🔧 Configuración

### TypeScript
El proyecto está configurado con TypeScript estricto:
- Target: ES6
- Módulos: CommonJS
- Strict mode habilitado
- Salida compilada en `./dist`

### Servidor
- Puerto: 3000 (configurable)
- CORS: Habilitado para todos los orígenes
- Hot reload en desarrollo

## 📝 Scripts Disponibles

```json
{
  "dev": "ts-node-dev --respawn src/index.ts",  // Desarrollo con hot reload
  "build": "tsc",                                // Compilar TypeScript
  "test": "echo \"Error: no test specified\" && exit 1"  // Placeholder para tests
}
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Estándares de Código
- Usar TypeScript para todo el código nuevo
- Seguir las convenciones de nomenclatura existentes
- Documentar funciones y tipos complejos
- Mantener la arquitectura modular

## 🚧 Estado del Proyecto

### ✅ Completado
- [x] Estructura base del servidor
- [x] Sistema de WebSockets
- [x] Gestión de usuarios y conexiones
- [x] Sistema de salas
- [x] Tipos TypeScript básicos
- [x] Arquitectura modular para juegos

### 🚧 En Desarrollo
- [ ] Implementación de juegos específicos
- [ ] Lógica de juego para Uno
- [ ] Lógica de juego para Generala

### 📋 Pendiente
- [ ] Tests unitarios y de integración
- [ ] Documentación de API completa
- [ ] Sistema de autenticación
- [ ] Persistencia de datos
- [ ] Logs y monitoreo
- [ ] Docker y despliegue

## 📄 Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **Nicolas Faure** - *Desarrollo inicial*

## 🙏 Agradecimientos

- Comunidad de Socket.IO por la excelente documentación
- Equipo de TypeScript por el sistema de tipos robusto
- Comunidad de desarrolladores argentinos por mantener vivos los juegos criollos

---

**¡Que disfrutes jugando a los juegos de mesa criollos argentinos! 🇦🇷**
