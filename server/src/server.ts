import dotenv from 'dotenv';
import express from 'express';
import chalk from 'chalk';
import routes from './routes/routes';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/v1/restaurants', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(chalk.cyanBright(`Listening on Port: `), chalk.blue(`${PORT}`));
});
