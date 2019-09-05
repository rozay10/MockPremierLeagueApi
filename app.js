const express = require('express');
const morgan = require('morgan');
// const rateLimit = require('express-rate-limit');

require('./Api/models/_mongoose');


const AppError = require('./Api/utilities/appError');
const globalErrorHandler = require('./Api/middlewares/errorMiddlewares');

const userRouter = require('./Api/routes/userRoute');
const teamRouter = require('./Api/routes/teamRoute');
const fixtureRouter = require('./Api/routes/fixtureRoute');



const app = express();

// 1) GLOBAL MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));  
};

app.use(morgan('dev'));

app.use(express.json());

// Limit requests from same API
// const limiter = rateLimit({
//   max: 50,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!'
// });
// app.use('/api', limiter);

// Body parser, reading data from body into req.body
// app.use(express.json({ limit: '10kb' }));


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/teams', teamRouter);
app.use('/api/v1/fixtures', fixtureRouter);





app.all('*', (req, res, next)=>{  
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;


 








