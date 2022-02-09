import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = (url) => {
  console.log('Connected to the DB'.brightCyan);
  return mongoose.connect(url);
};
export default connectDB;
