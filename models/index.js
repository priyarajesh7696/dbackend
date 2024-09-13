import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.uri)

export default mongoose


// import mongoose from 'mongoose'
// import dotenv from 'dotenv'
// dotenv.config()

// mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)




// const uri = "mongodb+srv://rajeshpriyait123:rithvikpriya@cluster0.wd3h89m.mongodb.net/Divine_Bharat";
// const uri = "mongodb://127.0.0.1:27017/myapp";

// mongoose.connect(process.env.uri)
  // .then(() => {
  //   console.log('Connected to MongoDB');

  //   // Insert test code or check if you can retrieve data
  //   // Example:
  //   const db = mongoose.connection;
  //   db.collection('members').findOne({}, (err, result) => {
  //     if (err) {
  //       console.error('Error querying MongoDB:', err);
  //     } else {
  //       console.log('Found document:', result);
  //     }
  //     mongoose.connection.close();
  //   });
  // })
  // .catch(error => console.error('Error connecting to MongoDB:', error));

  // export default mongoose