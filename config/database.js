import mongoose from "mongoose";



const databaseHandler = async () => {
    try {
        const conn = await mongoose.connect(process.env.URI)
        console.log(`Mongodb is connected now with host ${conn.connection.host}`.bgYellow.white);
    } catch (error) {
        console.log(`error in Mongodb connection ${error}`.bgRed.white);
    }

}


export default databaseHandler;