const express = require('express');
const { addEmp, showEmp, deleteEmp, updateEmp } = require('../controllers/empController');

const routes = express.Router();

routes.get('/',showEmp);
routes.post('/add',addEmp);
routes.put('/:id',updateEmp);
routes.delete('/:id',deleteEmp);

module.exports = routes;
