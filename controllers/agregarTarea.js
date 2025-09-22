const Tarea = require('../models/tarea');
const tareas = require('../data/tareas');
const { guardarTareas } = require('../data/storage');

function agregarTarea(datos) {
  const nueva = new Tarea(datos);
  tareas.push(nueva);
  guardarTareas(tareas);
  console.log('✅ Tarea agregada con éxito.');
}

module.exports = agregarTarea;
