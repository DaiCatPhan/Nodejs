
const siteRouter = require('./site');
const coursesRouter = require('./courses'); 
const meRouter = require('./me');
const authenticationRouter = require('./authentication');
const userRouter = require('./user');
const uploadRouter = require('./upload');



function route(app) {
    app.use('/courses', coursesRouter);
    app.use('/me', meRouter);
    app.use('/user', userRouter);
    app.use('/authentication', authenticationRouter);  
    app.use('/uploads', uploadRouter);
    app.use('/', siteRouter);
}

module.exports = route;
