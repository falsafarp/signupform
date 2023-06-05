const express= require('express')
const app=express()
let port=3005
const path=require('path')
const templatePath=path.join(__dirname,'../templates/views')
const formCollection=require('./model/model')
app.set('view engine','.hbs')
app.set('views',templatePath)
app.use(express.json())
app.use(express.urlencoded({extended:false}))
require('./db/db')


app.get('/',(req,res)=>{
    res.render('login')
})
app.get("/signup2",(req,res)=>{
    res.render("signup2")
})
app.get("/home",(req,res)=>{
    res.render("home")
})

app.post("/templates/views/signup2",async(req,res)=>{
    try {
        const password=req.body.password
        const conpassword=req.body.conpassword
        if(password===conpassword){
            const userData=new formCollection({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                password:req.body.password,
                conpassword:req.body.conpassword,
                country:req.body.country
            })
            const postData=await userData.save()
            res.render('login')
        }else{
            res.send("password doesnt match")
        }
    } catch (error) {
        res.send(error)
    }   
})
app.post("/login",async(req,res)=>{
//     try{
//         const check=await formCollection.findOne({email:req.body.email})
//         if(check.password===req.body.password){
//         res.render('home')
//         }
//         else{
//             res.send("Wrong Pass")
//         }
//     }
//     catch{
//         res.send("Wrong Details")
//     }
// })
    try {
        const email=req.body.email
        const password=req.body.password
        const getEmail=await formCollection.findOne({email : email})
        if(getEmail.password===password){
            res.render('home')
        }
        else{
            res.send("Credentials doesn't match")
        }
        
    } catch (error) {
        res.send(error)
    }
})
app.listen(port,()=>{
    console.log(`listening to port ${port}`)
})