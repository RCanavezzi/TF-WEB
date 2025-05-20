import express from 'express';
import chalk from 'chalk';

import "./bootstrap/app.js"
import webRoutes from "./routes/web.js";


/** Iniciar roteador */
const app = express();

/** Inicializar rotas  */
app.use("/", webRoutes)

/** Se a rota não for encontrada, 404 neles! */
app.use((req, res) => {
    res.status(404).send('Not found');
});

const webPort = process.env.PORT || 3000;

const nodePort = process.env.NODE_PORT || webPort;

app.listen(nodePort, () => {
    console.log(chalk.green(`Servidor: http://localhost:${webPort}`));
});