const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require("./src/routes/authentication");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection

async function connectDB() {
    try {
      await mongoose.connect("mongodb+srv://stayadi007:qKB4lGWD3eXIiGfO@cluster0.hd96qsf.mongodb.net/?retryWrites=true&w=majority")

      console.log("Connection is successfull")
    } catch (e) {
      console.log(e);
    }
  }

  async function main() {
    await connectDB();
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use("/", authRoute);

    app.get("/logout", authRoute ,async(req,res)=>{
      try {
        res.clearCookie("jwtoken")
        console.log("logout successfully");
        await user.save()
        res.render("login")
      } catch (error) {
        res.status(500).send(error)
      }
    });
    app.listen(port, () => {
      console.log(`Server is running at PORT ${port}`);
    });
  }
  main();


// qKB4lGWD3eXIiGfO
