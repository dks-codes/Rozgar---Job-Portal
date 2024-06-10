import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import recruiterRouter from './routes/recruiterRouter.js';
import applicantRouter from './routes/applicantRouter.js';
import applicationRouter from './routes/applicationRouter.js';
import jobRouter from './routes/jobRouter.js';
import { dbConnection } from './database/dbConnection.js';
import { errorMiddleware } from './middlewares/error.js';




export const app = express();

dotenv.config({path: './config/config.env'});

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'PUT', 'DELETE', 'POST'],
    credentials: true
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))


//routers
app.use('/api/v1/recruiter', recruiterRouter );
app.use('/api/v1/applicant', applicantRouter );
app.use('/api/v1/job', jobRouter );
app.use('/api/v1/application', applicationRouter );

dbConnection();

app.use(errorMiddleware);