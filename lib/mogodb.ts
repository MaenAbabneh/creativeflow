import mongoose from 'mongoose';

export const connectDB = async () => {
    if(mongoose.connection.readyState) return;
    try{
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log('MongoDB connected 🚀');
    }catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process with failure
    }
}