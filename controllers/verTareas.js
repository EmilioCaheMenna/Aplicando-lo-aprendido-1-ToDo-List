const tareas = require('../data/tareas');

function verTareas(filtro = 'todas') {
  let resultado = tareas;
  if (filtro === 'pendientes') resultado = tareas.filter(t => t.estado === 'pendiente');
  if (filtro === 'en curso') resultado = tareas.filter(t => t.estado === 'en curso');
  if (filtro === 'terminada') resultado = tareas.filter(t => t.estado === 'terminada');

  resultado.forEach((t, i) => console.log(`${i + 1}. ${t.titulo}`));
  return resultado;
}

module.exports = verTareas;
