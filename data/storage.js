const fs = require('fs');
const path = require('path');

const rutaArchivo = path.join(__dirname, 'tareas.json');

function cargarTareas() {
  if (!fs.existsSync(rutaArchivo)) return [];
  const contenido = fs.readFileSync(rutaArchivo, 'utf-8');
  return JSON.parse(contenido);
}

function serializarTarea(t) {
  return {
    id: t.id,
    titulo: t.titulo,
    descripcion: t.descripcion || null,
    archivo: t.archivo || null,
    fechaCreacion: t.fechaCreacion ? new Date(t.fechaCreacion).toISOString() : null,
    fechaActualizacion: t.fechaActualizacion ? new Date(t.fechaActualizacion).toISOString() : null,
    fechaVencimiento: t.fechaVencimiento ? new Date(t.fechaVencimiento).toISOString() : null,
    fechaFinalizacion: t.fechaFinalizacion ? new Date(t.fechaFinalizacion).toISOString() : null,
    finalizada: (t.finalizada === undefined) ? (t.estado === 'terminada') : Boolean(t.finalizada),
    dificultad: t.dificultad || null,
    estado: t.estado || null
  };
}

function guardarTareas(tareas) {
  const plain = tareas.map(serializarTarea);
  fs.writeFileSync(rutaArchivo, JSON.stringify(plain, null, 2), 'utf-8');
}

module.exports = { cargarTareas, guardarTareas };
