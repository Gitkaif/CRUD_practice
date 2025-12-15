const express = require('express');
const { addEmp, showEmp, deleteEmp } = require('../controllers/empController');

const routes = express.Router();

routes.get('/',showEmp);
routes.post('/add',addEmp);
routes.delete('/:id',deleteEmp);

module.exports = routes;
