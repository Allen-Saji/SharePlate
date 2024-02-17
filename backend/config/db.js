const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://allensaji:allensaji@allencluster.i9rjbtb.mongodb.net/SharePlate?retryWrites=true&w=majority');
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message} .red.underline.bold`);
    process.exit(1);
  }
};

module.exports = connectDB;
