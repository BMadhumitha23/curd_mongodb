const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to MongoDB server");

    const database = client.db('loginform'); 

    const regCollection = database.collection('register'); 
    const loginCollection = database.collection('login'); 

    const reg1 = {
      username:'madhumitha',
      email:'madhu@gmail.com',
      password:230305,
    };

    const reg2 = {
      username:'srinitha',
      email:'sri@gmail.com',
      password:211010
    };
    const reg3 = {
      username:'suba',
      email:'sub@gmail.com',
      password:250107,
    };


    await regCollection.insertMany([reg1, reg2,reg3]);
    console.log("Inserted flights into the registration collection");

    
    const login1 = {
      username:'madhumitha',
      password:'230305',
    };

    const login2 = {
      username:'srinitha',
      password:'211010',
    };
    const login3 = {
      username:'suba',
      password:'250107',
    };

  
    await loginCollection.insertOne(login1);
    console.log("Inserted reg1 into the Reservations collection");


    await loginCollection.insertOne(login2);
    console.log("Inserted reg2 into the Reservations collection");

    await loginCollection.insertOne(login3);
    console.log("Inserted reg3 into the Reservations collection");

    const allreg = await regCollection.find().toArray();
    console.log("Available register:");
    console.log(allreg);

    const re1 = await regCollection.findOne({ username:'madhumitha' });
    console.log("register madhu Details:");
    console.log(re1);


    
    const updateFilter = { username: 'bsrinitha' };
    const updateUpdate = { password:'22010' };
    const updateResult = await loginCollection.updateOne(updateFilter, updateUpdate);
    console.log(`Updated ${updateResult.modifiedCount} login document`);

    const deleteFilter = { username:'suba' };
    const deleteResult = await loginCollection.deleteOne(deleteFilter);
    console.log(`Deleted ${deleteResult.deletedCount} login`);

  } finally {
    await client.close();
    console.log("Connection to MongoDB closed");
  }
}

run().catch(console.error);