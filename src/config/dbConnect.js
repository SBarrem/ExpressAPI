import mongoose from "mongoose";

async function conectaNaDataBase() {
    mongoose.connect("mongodb+srv://admin:admin123@cluster0.eco2fve.mongodb.net/livraria?appName=Cluster0");

    return mongoose.connection;
}

export default conectaNaDataBase;
