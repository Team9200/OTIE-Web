import mongoose from 'mongoose';

export default () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGO_DB_URL);
    mongoose.connection.on('error', console.error.bind(console, 'mongoose connection error'));
    mongoose.connection.on('open', function () {
        console.log('connected to database');
    });
    mongoose.connection.on('disconnected', () => {
        console.log('disconnected from database');
    });
};