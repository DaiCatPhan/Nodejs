const mongoose = require('mongoose');

mongoose.set('strictQuery',true);


// connect to DB
async function connect(){
    try {
        // await mongoose.connect('mongodb://localhost:27017/f8_education-dev');
        await mongoose.connect('mongodb://localhost:27017/f8_education-dev',{ 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        });
        console.log("connect successfully!!!");
    } catch (error) {
        console.log("connect failure !!!");
    }
}

module.exports = { connect };