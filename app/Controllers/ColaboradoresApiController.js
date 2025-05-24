// controllers/ToDoController.js
import "../../bootstrap/app.js"
import ColaboradoresModel from "../Models/ColaboradoresModel.js";

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
            
            const colaboradores = await ColaboradoresModel.findAll({
                limit: limit + 1,
                offset: offset,
                order: [["id", "ASC"]]
            });
            
            const temMais = colaboradores.length > limit;
            let rows =  colaboradores;
            
            if(temMais){
                rows = rows.slice(0, limit);
            }

            const resposta = {
                rows: (temMais)? (colaboradores.slice(0, limit)):colaboradores,
                limit: limit,
                next: (temMais)? (offset+limit):null
            }

            return res.status(200).json({resposta});

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

            ColaboradoresModel.findByPk(id)

            //return res.status(404).json({ error: 'Tarefa não encontrada.' });

            try {

            } catch (error) {
                return res.status(500).json({ error: 'Error de servidor.' })
            }
        },

        // POST /todos
        'insert': async (req, res) => {

            // req.body = request body

            const nome = req.body.nome;
            const cargo = req.body.cargo;
            const pode_desenvolver = req.body.pode_desenvolver;

            const colaboradores = await ColaboradoresModel.create({
                nome: nome,
                cargo: cargo,
                pode_desenvolver: pode_desenvolver
            });

            return res.status(201).json(colaboradores);

            try {

            } catch (error) {
                return res.status(500).json({ error: 'Error de servidor.' })
            }
        },

    };
})();
