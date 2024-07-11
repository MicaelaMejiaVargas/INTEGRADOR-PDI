const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');

router.get('/', taskController.getAllTasks); //Testeado con exito (muestra todos los datos ingresados)
router.get('/:id', taskController.getTaskById); //Testeado con exito (probamos llamando por id) 
router.post('/', taskController.createTask); //Testeado con exito (enviamos 4 datos)
router.put('/:id', taskController.updateTask); //Testeado con exito (editamos los datos, no es posible modificar id)
router.put('/id', taskController.completeTask); //Testeado 
router.delete('/:id', taskController.deleteTask); //

module.exports = router