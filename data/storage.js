const fs = require('fs');
const path = require('path');

const rutaArchivo = path.join(__dirname, 'tareas.json');

function cargarTareas() {
  if (!fs.existsSync(rutaArchivo)) return [];
  const contenido = fs.readFileSync(rutaArchivo, 'utf-8');
  return JSON.parse(contenido);
}

function guardarTareas(tareas) {
  fs.writeFileSync(rutaArchivo, JSON.stringify(tareas, null, 2), 'utf-8');
}

module.exports = { cargarTareas, guardarTareas };
