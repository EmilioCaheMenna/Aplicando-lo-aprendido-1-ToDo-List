function verDetalles(tarea) {
  console.log(`\n📌 ${tarea.titulo}`);
  if (tarea.descripcion) console.log(`📝 ${tarea.descripcion}`);
  console.log(`📅 Creación: ${new Date(tarea.fechaCreacion).toLocaleDateString()}`);
  if (tarea.fechaVencimiento) console.log(`📆 Vencimiento: ${new Date(tarea.fechaVencimiento).toLocaleDateString()}`);
  console.log(`📍 Estado: ${tarea.estado}`);
  console.log(`✅ Finalizada: ${tarea.finalizada}`);
  console.log(`🎯 Dificultad: ${tarea.dificultad || 'Sin datos'}`);
  if (tarea.fechaFinalizacion) console.log(`🏁 Finalizada el: ${new Date(tarea.fechaFinalizacion).toLocaleDateString()}`);
}

module.exports = verDetalles;
