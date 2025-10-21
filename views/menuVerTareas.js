const rl = require('../utils/terminal');
const verTareas = require('../controllers/verTareas');
const verDetalles = require('../controllers/verDetalles');

function menuVerTareas(callbackVolver) {
  console.log('\n¿Qué tareas deseas ver?');
  console.log('1. Todas');
  console.log('2. Pendientes');
  console.log('3. En curso');
  console.log('4. Terminadas');
  console.log('0. Volver');

  rl.question('> ', (opcion) => {
    let filtro = '';
    switch (opcion) {
      case '1':
        filtro = 'todas';
        break;
      case '2':
        filtro = 'pendientes';
        break;
      case '3':
        filtro = 'en curso';
        break;
      case '4':
        filtro = 'terminada';
        break;
      case '0':
        callbackVolver();
        return;
      default:
        console.log('❌ Opción inválida.');
        return menuVerTareas(callbackVolver);
    }

    const lista = verTareas(filtro);
    if (lista.length === 0) {
      console.log('📭 No hay tareas para mostrar.');
      return menuVerTareas(callbackVolver);
    }

    rl.question('\n¿Deseas ver los detalles de alguna?\nIntroduce el número para verlo o 0 para volver.\n> ', (numRaw) => {
      const num = (numRaw || '').trim();
      const index = parseInt(num, 10);
      if (isNaN(index)) {
        console.log('❌ Entrada no válida. Introduce un número.');
        return menuVerTareas(callbackVolver);
      }
      if (index === 0) return menuVerTareas(callbackVolver);
      if (index < 1 || index > lista.length) {
        console.log('❌ Número fuera de rango.');
        return menuVerTareas(callbackVolver);
      }
      const tarea = lista[index - 1];
      verDetalles(tarea);
      menuVerTareas(callbackVolver);
    });
  });
}

module.exports = menuVerTareas;
