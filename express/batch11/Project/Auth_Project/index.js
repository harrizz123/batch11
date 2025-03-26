const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();

app.use(express.json()); // Ensure JSON parsing middleware is added

app.post("/register", async (req, res) => {
    try {
        console.log("Received POST request to /register");
        const data = req.body;
        console.log("Request body:", data);

        const newUser = await prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                age: parseInt(data.age),
                dob: data.dob
            }
        });

        console.log("User created:", newUser);
        res.status(200).json({ message: "User Created", data: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
});
app.get("/register",async(req,res)=>{
    try{
const register=await prisma.user.findMany();
console.log("Server is running and /register route is active");

res.status(200).json({message:"msessage receiverd succesfully",data:register});
    }
    catch(error){
        console.error("Error getting users:", error.message);
        res.status(500).json({ message: "Error getting users", error: error.message });
    }
})
app.get("/register",async(req,res)=>{
    try{
const register=await prisma.user.findMany();
console.log("Server is running and /register route is active");
        
res.status(200).json({message:"msessage receiverd succesfully",data:register});
    }
    catch(error){
        console.error("Error getting users:", error.message);
        res.status(500).json({ message: "Error getting users", error: error.message });
    }
})
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
