import { Router } from 'express';
import express from 'express';
import path, { join } from 'path';
import { readdir } from 'fs';

import constants from '../bootstrap/constants.js';
import todoApi from "./api.js";

const router = Router();

/** Usado para servir json */
router.use(express.json());

/** Servir o public estaticamente, tanto para arquivos como para os assets de frontend */
router.use(express.static(path.join(constants.DIR, 'public')));

// Rota para listar arquivos na pasta 'public'
// NÃO É NECESSÁRIO CASO TENHA A CAMADA DE NGINX
router.get('/', (req, res) => {
    const dirPath = join(constants.DIR, 'public');

    readdir(dirPath, (err, files) => {
        if (err) {
            return res.status(500).send('Erro ao ler o diretório');
        }

        const fileList = files.map(file => {
            return `<li><a href="/${file}">${file}</a></li>`;
        }).join('');

        res.send(`
            <html>
                <head><title>Lista de Arquivos</title></head>
                <body>
                    <h2>Lista de Arquivos</h2>
                    <ul>${fileList}</ul>
                </body>
            </html>
        `);
    });
});


// aula-10-todolist routes
router.use('/api', todoApi);


export default router;
