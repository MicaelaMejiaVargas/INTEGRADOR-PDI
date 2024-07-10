const { DataTypes } = require('sequelize');
const db = require('../config/database');

/**
 * Modelo de las tareas que se almacenan en la base de datos.
 * @property {number} id - El ID de la tarea.
 * @property {string} name - El título de la tarea.
 * @property {string} description - La descripción de la tarea.
 * @property {boolean} completed - Estado de la tarea.
 */
const Task = db.define('Task', {
  id: {
    type: DataTypes.NUMBER,
    required: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    required: true,
  },
  description: {
    type: DataTypes.STRING,
    required: true
  },
  completed: {
    type: DataTypes.BOOLEAN,
    default: false
  }
}, {
  timestamps: false
})

Task.sync();

module.exports = Task;