// src/index.ts
import express from 'express';
import routes from './routes/index';
import { sequelize } from '../models';

require('dotenv').config();


const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


sequelize.sync().then(() => {
  console.log('Connected to the database');
  app.use(routes);

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(error => console.log('Error connecting to the database:', error));
