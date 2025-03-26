const { PrismaClient } = require("@prisma/client");
const express = require("express");
const prisma = new PrismaClient();

const app = express();
app.use(express.json())

//GET-->http://localhost:3000/students/101      

app.get("/", (req, res) => {
    res.send("backend workingsss")
})
app.get("/students", async (req, res) => {
    //1.Data from frontend ❌

    //2.Db logic
    const studentsdata = await prisma.student.findMany();

    //3.data to frontend
    res.send(studentsdata)

})
app.get("/students/:roll_no", async (req, res) => {
    //1.data from frontend
    const data = req.params;

    //2.DB logic
    const studentsData = await prisma.student.findUnique({
        where: {
            roll_no: data.roll_no,
        }
    })
    //3.data to frontend
    res.send(studentsData);
})

//POST-->http://localhost:3000/students
app.post("/students",(req,res)=>{
    //1.Data from frontend
    const data=req.body;
    console.log(data);
    
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
