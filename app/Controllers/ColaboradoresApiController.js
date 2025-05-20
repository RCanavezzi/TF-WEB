// controllers/ToDoController.js
import "../../bootstrap/app.js"
import ColaboradoresApiController from "../Models/ColaboradoresModel.js";

export default (function () {

    const MAX_LIMIT = 100;

    return {

        // GET /todos
        'list': async (req, res) => {

            // req.query = query vars

            const limit = parseInt(req.query.limit) || 100;
            const offset = parseInt(req.query.offset) || 0;

            if (limit > MAX_LIMIT) {
                return res.status(400).json({ error: 'Limit máximo: 100.' });
            }

            const colaboradores= await ColaboradoresApiModel.findAll({
                limit: limit + 1,
                offset: offset,
                order: [["id", "ASC"]]
            })

            const temMais = colaboradores.length > limit;
            let rows = colaboradores;

            const resposta = {
                rows: (temMais)?(colaboradores.slice(0,limit)): colaboradores,
                limit: limit,
                next: (temMais)? (offset=limit):null
            };
            return res.status(200).json(resposta);

            // TodoModel.findAll(options: {...})
            // limit: int
            // offset: int
            // order: [field, ASC or DESC]

            try {

            } catch (error) {
                return res.status(500).json({ error: 'Error de servidor.' })
            }

        },

        // GET /todos/:id
        'get': async (req, res) => {

            // req.params = parametros da url (id)

            const id = req.params.id;

            // TodoModel.findByPk(id)

            return res.status(404).json({ error: 'Tarefa não encontrada.' });

            try {

            } catch (error) {
                return res.status(500).json({ error: 'Error de servidor.' })
            }
        },

        // POST /todos
        'insert': async (req, res) => {

            // req.body = request body

            const title = req.body.title;
            const is_checked = req.body.is_checked;

        const todo = await ColaboradoresApiController.create({ 
            title: title,
            is_checked: is_checked
         });

            return res.status(201).json(todo);

            try {

            } catch (error) {
                return res.status(500).json({ error: 'Error de servidor.' })
            }
        }

    };
})();
