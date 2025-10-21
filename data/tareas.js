const { cargarTareas } = require('./storage');
const Tarea = require('../models/tarea');

// Cargar y revivir todas las tareas como instancias con comportamiento
const tareasRaw = cargarTareas();
const tareas = tareasRaw.map(t => Tarea(t));

module.exports = tareas;
