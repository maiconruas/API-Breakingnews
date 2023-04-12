import express, { json } from 'express';
import userRoute from './src/routes/user.route.js';
import connectDatabase from './src/database/db.js';
import dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
connectDatabase()

app.use(json());
app.use('/user', userRoute);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));