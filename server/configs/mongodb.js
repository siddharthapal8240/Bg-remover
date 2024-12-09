import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Set up event listeners
        mongoose.connection.on('connected', () => {
            console.log('Database connected');
        });

        mongoose.connection.on('error', (err) => {
            console.error(`Database connection error: ${err}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Database disconnected');
        });

        // Connect to MongoDB
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'bg-removal', // Use the `dbName` option instead of appending to the URI
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
