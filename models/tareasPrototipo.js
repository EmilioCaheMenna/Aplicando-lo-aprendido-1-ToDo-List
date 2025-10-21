
function Tarea({ 
  titulo, 
  descripcion = '', 
  archivo = null, 
  dificultad = 'medio', 
  estado = 'pendiente', 
  fechaVencimiento = null 
}) {
  this.id = Tarea.generarID();
  this.titulo = titulo;
  this.descripcion = descripcion;
  this.archivo = archivo;
  this.fechaCreacion = new Date();
  this.fechaActualizacion = null;
  this.fechaVencimiento = fechaVencimiento ? new Date(fechaVencimiento) : null;
  this.fechaFinalizacion = null;
  this.estado = estado;
  // Propiedad booleana para compatibilidad con controladores
  this.finalizada = (estado === 'terminada');
}

// Método estático para generar IDs
Tarea.generarID = function() {
  return Math.floor(Math.random() * 100000);
};

// Método de instancia para actualizar
Tarea.prototype.actualizar = function(datos) {
  // Aplicar cambios selectivamente para normalizar fechas y estado
  if (datos.titulo !== undefined) this.titulo = datos.titulo;
  if (datos.descripcion !== undefined) this.descripcion = datos.descripcion;
  if (datos.archivo !== undefined) this.archivo = datos.archivo;
  if (datos.dificultad !== undefined) this.dificultad = datos.dificultad;
  if (datos.fechaVencimiento !== undefined) this.fechaVencimiento = datos.fechaVencimiento ? new Date(datos.fechaVencimiento) : null;
  if (datos.estado !== undefined) {
    this.estado = datos.estado;
    this.finalizada = (datos.estado === 'terminada');
    if (datos.estado === 'terminada' && !this.fechaFinalizacion) {
      this.fechaFinalizacion = new Date();
    }
    if (datos.estado !== 'terminada') {
      // Si se marca como no terminada, limpiar fechaFinalizacion
      this.fechaFinalizacion = null;
    }
  }
  this.fechaActualizacion = new Date();
};


function ListaTareas() {
  this.tareas = [];
}

ListaTareas.prototype.agregar = function(datos) {
  const nueva = new Tarea(datos);
  this.tareas.push(nueva);
  return nueva;
};

ListaTareas.prototype.buscarPorId = function(id) {
  return this.tareas.find(t => t.id === id);
};

ListaTareas.prototype.eliminar = function(id) {
  this.tareas = this.tareas.filter(t => t.id !== id);
};

ListaTareas.prototype.filtrar = function(estado) {
  if (estado === 'todas') return this.tareas;
  return this.tareas.filter(t => t.estado === estado);
};

ListaTareas.prototype.listar = function() {
  if (this.tareas.length === 0) {
    console.log('📭 No hay tareas registradas.');
    return;
  }
  this.tareas.forEach((t, i) => {
    console.log(`${i + 1}. ${t.titulo} [${t.estado}]`);
  });
};

module.exports = { Tarea, ListaTareas };
