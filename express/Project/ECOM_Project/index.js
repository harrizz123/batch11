const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
const { z } = require("zod");   
const productByIdSchema = z.object({
    product_id: z.string()
})

app.get("/",(req,res)=>{
    res.send("API Working")
})

//API - GET : ALL PROJECTS
app.get("/products", async (req, res) => {
    //  data from the database

    //nooooooooooooooo coooooooooooddddddddddeeeeeeeeeeeeee
    try {
        //DB LOGIC
        const productsData = await prisma.product.findMany();

        //DATA to frontend
        res.status(200).json({ message: "Product Data Sent Successfully", data: productsData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" }, error);
       // res.json({ message: error || "Internal Server error" })
    }


});
//API - GET : a Project by its Product_id
app.get("/products/:product_id", async (req, res) => {
    try {
        //data from frontend
        const data = productByIdSchema.parse(req.params)

        //db logic
        const productData = await prisma.product.findUnique({
            where: {
                product_id: data.product_id
            }
        })
        //data to frontend
        res.status(200).json({ message: "productData fetch Successfully", data: productData })
    } catch (error) {
        console.log("Internal Server error", error)
        res.json({ message: error || "Internal Server error" })
    }
})


app.listen(3000);