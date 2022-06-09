const mongoose=require("mongoose");
const dotenv = require("dotenv");
const mongoURI="mongodb+srv://user:user@giramsanblog.n4bdu.mongodb.net/test"

const connectToMongo= ()=>{
    mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
}

module.exports=connectToMongo;