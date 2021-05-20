const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/readzaRegistration",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(()=>{
    console.log("connection successfull");
}).catch((e)=> console.log(e));