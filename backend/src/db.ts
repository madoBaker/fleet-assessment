import mongoose from 'mongoose';

const connectDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/fleetManagement');
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1); // Exit in case of error
    }
};

export default connectDatabase;
