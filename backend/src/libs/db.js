import mongoose from 'mongoose';

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Successfully connected to the database');
    return true;
  } catch (error) {
    console.error('Error while connecting to the database:', error);
    return false;
  }
};

export default connectToDb;
