const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express()
const prisma = new PrismaClient()
app.use(express.json());


//API 0 :GET-http://localhost:3000/-Test API
app.get("/", (req, res) => {
    res.send("API Working")
})



//API 1 :GET-//http://localhost:3000/products
try {
    app.get("/products", async (req, res) => {
        //1.data from frontend

        //2.DB logic
        const products = await prisma.products.findMany();

        //3.data to frontend
        res.status(200).json({ message: "data retreived successfully", data: products });
    })
}
catch (err) {
    console.log(err)
    res.status(500).json({ message: "Internal Server Error" })
}



//API 2 :GET-//http://localhost:3000/products/:product_id
app.get("/products/:product_id",async (req,res)=>{
    //1.Data from frontend
const data=req.params
    //2.DB logic 
    const productData= await prisma.products.findUnique({
        where:{
            product_id:data.product_id
        }
    })
    //3.Data to frontend
res.status(200).json({message:"data retreived Succesfully",data:productData})
})

//API 3 :POST-//http://localhost:3000/products/:product_id

app.post("/products", async(req,res)=>{
    
//1.Data from frontend
const data = req.body;

//2.DB logic 
const newProduct= await prisma.products.create({
    data:{
        product_name:data.product_name,
        product_id:data.product_id,
        product_pricing:data.product_pricing,
         product_location:data.product_location,
         product_image_url:data.product_image_url,
         product_rating:data.product_rating   
    }
})

//3.data to frontend
res.status(200).json({message:"data created successfully",data:newProduct})
})

//API 4 :PUT-//http://localhost:3000/products/:product_id

app.put("/products", async(req,res)=>{
    
    //1.Data from frontend
    const data = req.body;
    
    //2.DB logic 
    const newProduct= await prisma.products.update({
        data:{
            product_name:data.product_name,
          
            product_pricing:data.product_pricing,
             product_location:data.product_location,
             product_image_url:data.product_image_url,
             product_rating:data.product_rating   
        },
        where:{
            product_id:data.product_id
        },
    })
    
    //3.data to frontend
    res.status(200).json({message:"data Updated successfully",data:newProduct})
    })
    

//API 5 :GET-//http://localhost:3000/products/:product_id

app.listen(3000);