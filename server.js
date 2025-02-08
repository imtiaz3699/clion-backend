import express from "express";
import routes from './src/routes/index.js'
import "dotenv/config";
import cors from 'cors'

const app = express();
const port = process.env.PORT || 5000;
app.use(cors())
app.listen(port, () => {
    console.log(`Server running on port ${port}`);    
})

app.use(express.json())
routes(app);
app.get("/", (req, res) => {
   return res.send("Hello world")    
}) 