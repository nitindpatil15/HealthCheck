import dotenv from 'dotenv'
import { app } from './app.js'
import { connectDB } from './connectDB/db.js'

const port = 5628
dotenv.config({
    path:"./env"
})

connectDB()
.then(()=>{
    app.on("Error",error =>{
        console.log("Server Error : ", error)
    })
    app.listen(port, ()=>{
        console.log(`Server is running at port http://localhost:${port}`)
    })
})
.catch((err) => {
    console.error("MongoDB connection Failed !!!",err)
})