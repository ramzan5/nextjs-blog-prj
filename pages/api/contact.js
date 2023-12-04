import { MongoClient } from "mongodb";

async function handler(req, res){
    if(req.method === 'POST'){
        const {email, name, message} = req.body;
        // Check for required fields
        if(!email || !email.includes('@') || !name || name.trim()==='' || !message || message.trim()===''){
            res.status(422).json({message:'Invalid Input fields'})
            return
        }
        // Create a new contact object with the provided data
        let newContact = {
            email,name,message
        }
        let client 
        const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.yjolsyd.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
        try{
             client = await MongoClient.connect(connectionString)
        }catch(error){
            res.status(500).json({message:'Could Not Connect to DB'})
            return
        }
        
        const db = client.db()
        try{
            const result = await db.collection('messages').insertOne(newContact)
            newContact.id = result.insertedId;
        }catch(error){
            client.close()
            res.status(500).json({message:'Storing Message Failed'})
            return
        }

        // console.log(newContact)
        client.close();
        res.status(201).json({message: 'Successfully stored Message! ', message:newContact})
    }
}

export default handler;