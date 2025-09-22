const tareas = require('../data/tareas');

function buscarTareaPorTitulo(query) {
  return tareas.filter(t => t.titulo.toLowerCase().includes(query.toLowerCase()));
}

module.exports = buscarTareaPorTitulo;
