// Script de integración rápido
const storage = require('../data/storage');
const tareas = require('../data/tareas');
const Tarea = require('../models/tarea');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function run() {
  console.log('Tareas iniciales en memoria:', tareas.length);

  const nueva = new Tarea({ titulo: 'prueba-integration', descripcion: 'tarea de prueba (temporal)', dificultad: 'bajo', estado: 'pendiente' });
  tareas.push(nueva);
  storage.guardarTareas(tareas);
  console.log('✅ Agregada tarea de prueba con id:', nueva.id);

  // marcar como terminada
  const t = tareas.find(x => x.id === nueva.id);
  if (!t) {
    console.error('❌ No se encontró la tarea añadida en memoria');
    process.exit(1);
  }
  t.actualizar({ estado: 'terminada' });
  storage.guardarTareas(tareas);
  console.log('✅ Tarea marcada como terminada y guardada.');

  // recargar desde disco para verificar
  const recargadas = storage.cargarTareas();
  const tareaRec = recargadas.find(x => x.id === nueva.id);
  console.log('Desde disco:', tareaRec ? { id: tareaRec.id, estado: tareaRec.estado, finalizada: tareaRec.finalizada } : 'no encontrada');

  // limpieza: eliminar la tarea de prueba
  const idx = tareas.findIndex(x => x.id === nueva.id);
  if (idx !== -1) {
    tareas.splice(idx, 1);
    storage.guardarTareas(tareas);
    console.log('🧹 Tarea de prueba eliminada (limpieza).');
  }

  console.log('Integración: OK');
}

run().catch(err => {
  console.error('Test falló:', err);
  process.exit(1);
});
