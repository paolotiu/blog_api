/* eslint-disable @typescript-eslint/no-unsafe-call */
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import helmet from 'helmet';

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';
import logger from './shared/Logger';
import cors from 'cors';
const app = express();
const { BAD_REQUEST } = StatusCodes;

import mongoose from 'mongoose';

/************************************************************************************
 *                              Set mongoose settings
 ***********************************************************************************/
mongoose.connect(process.env.MONGODB_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});
/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: 'https://blog-pt.netlify.app' }));

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/test', (req, res, next) => {
    res.send('cors');
});

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/', BaseRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});

app.use('*', (req, res) => {
    res.status(404).json("{error: Endpoint doesn't exists}");
});

// Export express instance
export default app;
