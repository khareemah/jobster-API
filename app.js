require('express-async-errors');
require('dotenv').config();

const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const path = require('path');

// extra security packages
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');

// app routes
const authRouter = require('./routes/authRoute');
const authenticateUser = require('./middleware/authenticateUser');
const jobsRouter = require('./routes/jobsRoute');
const notFoundMiddleware = require('./middleware/notfound');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(express.json());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, './client/build'))
);
app.use(notFoundMiddleware);

app.use(helmet());
app.use(xss());
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
