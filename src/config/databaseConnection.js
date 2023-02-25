const mongoose = require("mongoose")
mongoose.set("strictQuery", true)

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Couldn't connect to DB" + err);
    })