const tareas = require('../data/tareas');
const { guardarTareas } = require('../data/storage');

function eliminarTarea(id) {
  const index = tareas.findIndex(t => t.id === id);
  if (index === -1) {
    console.log('❌ Tarea no encontrada.');
    return;
  }
  const eliminada = tareas.splice(index, 1)[0];
  guardarTareas(tareas);
  console.log(`🗑️ Tarea "${eliminada.titulo}" eliminada con éxito.`);
}

module.exports = eliminarTarea;
