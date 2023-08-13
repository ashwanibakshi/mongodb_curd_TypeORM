import * as express from "express"
import { Request, Response } from "express"
import { User } from "./entity/User"
import { AppDataSource } from "./data-source"
import {ObjectId} from "mongodb";

// establish database connection
AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })


const app  = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));


//--------------- showall user ---------------//
app.get("/showalluser",async (req,res)=>{
   try {
     const data = await AppDataSource.getRepository(User).find();
     res.json({data:data});
   } catch (error) {
       res.json({err:error.message});
   }
});

//--------------- xxxxxxx -------------------//

//--------------- add user -----------------//

app.post("/adduser",async (req,res)=>{
   try {
    const data = await AppDataSource.getMongoRepository(User).create(req.body);
    const results = await AppDataSource.getMongoRepository(User).save(data)
     res.json({data:results});
   } catch (error) {
     res.json({err:error.message});
   }
});

//---------------- xxxxxxxxxxx ---------------//

//------------- update userbyId -------------//

app.put('/updateuser/:id',async (req,res)=>{
     try {
        const data = await AppDataSource.getMongoRepository(User).updateOne(
            {_id:new ObjectId(req.params.id)},
           {$set:req.body}
        );
        res.json({data:"data updated"});
     } catch (error) {
        res.json({err:error.message});
     }
});

//-------------- xxxxxxxx ------------------//

//------------- remove userbyId -------------//

app.delete("/removeuser/:id",async (req,res)=>{
      try {
         const data = await AppDataSource.getMongoRepository(User).deleteOne({_id:new ObjectId(req.params.id)});
         res.json({data:data});
      } catch (error) {
        res.json({err:error.message});
      }
});

//------------- xxxxxxxxx ------------------//

app.listen(3000,()=>console.log('sever run at port 3000'));