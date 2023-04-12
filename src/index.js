import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './database/db.js';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.routes.js';

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
connectDatabase()

app.use(express.json());

app.use('/user', userRoute);
app.use('/auth', authRoute);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));