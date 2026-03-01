import mongoose from 'mongoose'

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB Connected Successfully!");
        
    } catch (error) {
        console.error('Error occurred: ', error);
        process.exit(1);
    }
}

export default connectDb;