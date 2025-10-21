# ToDo List - Proyecto

Pequeña aplicación de consola para gestionar tareas. Cambios realizados:

- Modelo basado en prototipos en `models/tareasPrototipo.js`.
- Adaptador `models/tarea.js` para revivir objetos JSON a instancias con métodos.
- `data/tareas.js` carga y revive tareas desde `data/tareas.json`.
- `data/storage.js` ahora serializa las tareas limpiando funciones y normalizando fechas.
- Validaciones sencillas en vistas para inputs de usuario.

Cómo ejecutar:

1. Instala dependencias: `npm install` (usa el paquete `prompt` si es necesario)
2. Ejecuta: `node index.js`

Notas:
- Las fechas se guardan en ISO y se reviven al cargar.
- `finalizada` se deriva de `estado` si falta en los datos.
