const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');

router.get('/', taskController.getAllTasks); //Testeado con exito (muestra todos los datos ingresados)
router.get('/:id', taskController.getTaskById); //Testeado con exito (probamos llamando por id) 
router.post('/', taskController.createTask); //Testeado con exito (enviamos 4 datos)
router.put('/:id', taskController.updateTask); //Testeado con exito (editamos los datos, no es posible modificar primary key)
router.put('/:id', taskController.completeTask); //Testeado  con exito (editamos el campo completed a true o false respectivamente)
router.delete('/:id', taskController.deleteTask); //Testeado con exito (se borró la tarea encontrada por id)

module.exports = router