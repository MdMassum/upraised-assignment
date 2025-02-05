import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import gadgetRoutes from './routes/gadgetRoutes';
import authRoutes from './routes/authRoute';

const PORT = process.env.PORT || 3000;

dotenv.config();
const app = express();

app.use(
  cors({
    credentials: true,
    origin: '*',
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', gadgetRoutes);
app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

  console.error(err);
  res.status(err.status || 500)
  .json({ error: err.message || 'Internal Server Error' });
  
});