const express=require('express');
const bodyParser=require('body-parser');
const https=require('https');

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/signup.html');
});

app.post("/", function(req,res){
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const email=req.body.email;

    const data={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);

    const url="https://us21.api.mailchimp.com/3.0/lists/99f5631467"
const options={
    "method": "POST",
    auth:"sheikahamed:27f8697eeb8ee4911f1e877f2d0926cf-us21"
}

const request=https.request(url,options,function(response){
    response.on("data",function(data){
            console.log(JSON.parse(data));
        })

        if(response.statusCode === 200){
            res.sendFile(__dirname + '/success.html');
        }
        else{
            res.sendFile(__dirname + '/failure.html');
        }
})

request.write(jsonData);
request.end();
});


app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT|| 3000,()=>{
    console.log('Server is running on port 3000');
});



//api key
//27f8697eeb8ee4911f1e877f2d0926cf-us21

// list id
//99f5631467