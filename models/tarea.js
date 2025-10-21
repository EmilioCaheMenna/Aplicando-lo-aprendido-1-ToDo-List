// Archivo de compatibilidad: exporta un constructor Tarea compatible con los controladores
const { Tarea: TareaProto } = require('./tareasPrototipo');

// Re-exportar el constructor original para que `require('../models/tarea')` funcione
function Tarea(datos) {
  // Si se pasa un objeto que parece provenir de JSON (tiene id), creamos una instancia vacía
  if (datos && typeof datos === 'object' && datos.id !== undefined && datos.fechaCreacion) {
    // Crear un objeto cuyo prototipo sea TareaProto.prototype y asignar propiedades
    const tarea = Object.create(TareaProto.prototype);
    Object.assign(tarea, datos);
    // Normalizar fechas (si vienen como strings)
    if (tarea.fechaCreacion) tarea.fechaCreacion = new Date(tarea.fechaCreacion);
    if (tarea.fechaActualizacion) tarea.fechaActualizacion = new Date(tarea.fechaActualizacion);
    if (tarea.fechaVencimiento) tarea.fechaVencimiento = new Date(tarea.fechaVencimiento);
    if (tarea.fechaFinalizacion) tarea.fechaFinalizacion = new Date(tarea.fechaFinalizacion);
      // Derivar finalizada desde estado si no existe
      if (tarea.finalizada === undefined) {
        tarea.finalizada = (tarea.estado === 'terminada');
      }
      // Asegurar tipos
      if (tarea.id && typeof tarea.id === 'string' && !isNaN(Number(tarea.id))) tarea.id = Number(tarea.id);
      if (!tarea.fechaCreacion) tarea.fechaCreacion = new Date();
    return tarea;
  }

  // Si no es un objeto persistido, delegamos a la implementación prototípica
  return new TareaProto(datos);
}

// permitir acceso a generarID si algún código lo usa
Tarea.generarID = TareaProto.generarID;

// función auxiliar para revivir objetos JSON a instancias con prototipo
function revivir(obj) {
  if (!obj) return null;
  return Tarea(obj);
}

module.exports = Tarea;
module.exports.revivir = revivir;
