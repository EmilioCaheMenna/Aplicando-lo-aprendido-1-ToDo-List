const readline = require('readline');
const agregarTarea = require('../controllers/agregarTarea');
const buscarTareaPorTitulo = require('../controllers/buscarTarea');
const verTareas = require('../controllers/verTareas');
const verDetalles = require('../controllers/verDetalles');
const eliminarTarea = require('../controllers/eliminarTarea');
const tareas = require('../data/tareas');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function menuPrincipal() {
  console.log('\n¿Qué deseas hacer?');
  console.log('1. Agregar una Tarea');
  console.log('2. Ver Mis Tareas');
  console.log('3. Buscar una Tarea');
  console.log('4. Eliminar una Tarea');
  console.log('0. Salir');

  rl.question('> ', (opcion) => {
    switch (opcion) {
      case '1':
        rl.question('Título: ', (titulo) => {
          rl.question('Descripción: ', (descripcion) => {
            rl.question('Dificultad (bajo/medio/alto): ', (dificultad) => {
              rl.question('Estado (pendiente/en curso/terminada): ', (estado) => {
                rl.question('Fecha de vencimiento (YYYY-MM-DD): ', (fechaVencimiento) => {
                  agregarTarea({ titulo, descripcion, dificultad, estado, fechaVencimiento });
                  menuPrincipal();
                });
              });
            });
          });
        });
        break;

      case '2':
        const lista = verTareas();
        rl.question('¿Ver detalles de cuál? (número): ', (num) => {
          const tarea = lista[parseInt(num) - 1];
          if (tarea) verDetalles(tarea);
          menuPrincipal();
        });
        break;

      case '3':
        rl.question('🔍 Buscar por título: ', (query) => {
          const resultados = buscarTareaPorTitulo(query);
          if (resultados.length === 0) {
            console.log('❌ No se encontraron tareas.');
          } else {
            resultados.forEach((t, i) => console.log(`${i + 1}. ${t.titulo}`));
            rl.question('¿Ver detalles de cuál? (número): ', (num) => {
              const tarea = resultados[parseInt(num) - 1];
              if (tarea) verDetalles(tarea);
              menuPrincipal();
            });
          }
        });
        break;

      case '4':
        tareas.forEach((t, i) => console.log(`${i + 1}. ${t.titulo}`));
        rl.question('¿Cuál deseas eliminar? (número): ', (num) => {
          const tarea = tareas[parseInt(num) - 1];
          if (tarea) eliminarTarea(tarea.id);
          menuPrincipal();
        });
        break;

      case '0':
        console.log('👋 ¡Hasta luego!');
        rl.close();
        break;

      default:
        console.log('❌ Opción inválida.');
        menuPrincipal();
    }
  });
}

module.exports = menuPrincipal;
