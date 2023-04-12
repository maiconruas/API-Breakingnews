import express, { json } from 'express';
import userRoute from './src/routes/user.route.js';
import connectDatabase from './src/database/db.js';

const app = express();
const port = 3000;

connectDatabase()
app.use(json());
app.use('/user', userRoute);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));