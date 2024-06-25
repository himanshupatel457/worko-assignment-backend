const app = require("./app.js");


app.listen(process.env.PORT,()=>{
    console.log(`server is running at port : ${process.env.PORT}`);
})
