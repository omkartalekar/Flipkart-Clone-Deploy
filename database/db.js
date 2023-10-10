import mongoose from 'mongoose';

const Connection = async (username, password) => {
        const URL = `mongodb://${username}:${password}@ac-rgxsqod-shard-00-00.p5wcl1i.mongodb.net:27017,ac-rgxsqod-shard-00-01.p5wcl1i.mongodb.net:27017,ac-rgxsqod-shard-00-02.p5wcl1i.mongodb.net:27017/?ssl=true&replicaSet=atlas-5uwcdd-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }

};

export default Connection;