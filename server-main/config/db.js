import mongoose from 'mongoose';

const connectDB = () => {
  mongoose
    .connect(
      'mongodb+srv://omidmoaddab:impTq44pugOXwOnt@cluster0.omwsrnz.mongodb.net/'
    )
    .then(() => console.log(`Datebase Connected`))
    .catch((error) => console.log(error.message));
};
export default connectDB;
