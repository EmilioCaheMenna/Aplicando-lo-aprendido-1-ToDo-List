const tareas = require('../data/tareas');
const { guardarTareas } = require('../data/storage');

function editarTarea(id, nuevosDatos) {
  const tarea = tareas.find(t => t.id === id);
  if (!tarea) return console.log('❌ Tarea no encontrada.');
  tarea.actualizar(nuevosDatos);
  guardarTareas(tareas);
  console.log('✏️ Tarea editada exitosamente.');
}

module.exports = editarTarea;
