const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;

// Middleware Setup
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rutas
const taskRoutes = require('./routes/taskRoutes');
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`La tarea está funcionando en http://localhost:${port}`)
});