const { cargarTareas } = require('./storage');
const tareas = cargarTareas();

module.exports = tareas;
