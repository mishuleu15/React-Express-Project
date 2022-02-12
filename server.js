import express from 'express';
const app = express();
import 'dotenv/config';
import 'express-async-errors';
import colors from 'colors';
import morgan from 'morgan';
import authenticateUser from './middleware/auth.js';

// db and authenticateUser
import connectDB from './db/connect.js';

// routers
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello from server...');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(
        `Server is listening on port ${port}...`.brightMagenta.underline
      );
    });
  } catch (error) {
    console.log(error);
  }
};

start();
