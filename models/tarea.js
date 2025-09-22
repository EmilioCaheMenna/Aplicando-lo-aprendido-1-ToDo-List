class Tarea {
  constructor({ titulo, descripcion = '', archivo = null, dificultad = 'media', estado = 'pendiente', fechaVencimiento = null }) {
    this.id = Tarea.generarID();
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.archivo = archivo;
    this.fechaCreacion = new Date();
    this.fechaActualizacion = null;
    this.fechaVencimiento = fechaVencimiento ? new Date(fechaVencimiento) : null;
    this.fechaFinalizacion = null;
    this.finalizada = estado === 'terminada';
    this.dificultad = dificultad;
    this.estado = estado;
  }

  static generarID() {
    return Math.floor(Math.random() * 100000);
  }

  actualizar(datos) {
    Object.assign(this, datos);
    this.fechaActualizacion = new Date();
    if (datos.estado === 'terminada') {
      this.finalizada = true;
      this.fechaFinalizacion = new Date();
    }
  }
}

module.exports = Tarea;
