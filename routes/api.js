import { Router } from 'express';
import ApiController from '../app/Controllers/ApiController.js';
import TodoApiController from '../app/Controllers/TodoApiController.js';
import ColaboradoresApiController from '../app/Controllers/ColaboradoresApiController.js';

export default (function () {

    const router = Router();

    router.get('/colaboradores', ColaboradoresApiController.list);

    router.get('/colaboradores/:id', ColaboradoresApiController.get);

    router.post('/colaboradores', ColaboradoresApiController.insert);

    router.get('/todos', TodoApiController.list);

    router.get('/todos/:id', TodoApiController.get);

    router.post('/todos', TodoApiController.insert);

    router.put('/todos/:id', TodoApiController.update);

    router.delete('/todos/:id', TodoApiController.delete);

    return router;

})();