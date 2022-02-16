
// const LISTIDmailchimp="bd6aca85bc";
// const APIKEYmailchimp="fc7980d7d9a7a0c314c6a2b1850104a3-us14";
// const APIKEYcoinmarket="23dc9522-f0c6-4c41-806b-c86e2e66359c"
// const URLcoin="https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=23dc9522-f0c6-4c41-806b-c86e2e66359c"
const URLmailchimp="https://us14.api.mailchimp.com/3.0/lists/bd6aca85bc";
const options={method:"POST", auth:"user:fc7980d7d9a7a0c314c6a2b1850104a3-us14"};

const express=require("express");
const https=require("https");
const path=require("path");
const bodyParser=require("body-parser");
const app=express();
const PORT=2403;

app.set('view engine', 'ejs')


app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({ extended:true }));

app.listen(2403);

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/html/index.html"))
})

app.post("/",(req,res)=>{

    let data={
        members:[
            {
                email_address:req.body.email,
        merge_fields:{FNAME:req.body.firstname,LNAME:req.body.lastname},
        status:"subscribed"
            }
        ]
    }
    data=JSON.stringify(data);
    const request=https.request(URLmailchimp,options,function(response){
        if(response.statusCode===200)
        res.render('confirmed')
        else
        res.render('failed',{error:response.statusMessage,code:response.statusCode});
    })
  
    request.write(data);
    request.end();
})

app.post("/failed",(req, res)=>{
    res.redirect("/");
})