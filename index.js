// Import moduels

const server=express();

const express=require('express');

const bcrypt=require('bcryptjs')

const cors=require('cors');

const dbConfig=require('./knexfile.js');

const session=require('express-session')

const dbr=require('./db/modelUser.js');

const knex=require('knex');

const PORT=process.env.PORT || 8000;

const db=knex(dbConfig.development);



server.use(express.json());

server.use(cors());

server.use(session({
    
    name: 'name_here', //  
    
    secret: 'open the box',
    
    cookie: {
    
        maxAge: 1 * 24 * 60 * 60 * 1000,  //expire duration
    }, 
    
    httpOnly: true,  //Cant Read Part
  

  
    resave: false,
  
    saveUninitialized: false,
  }));


  server.post('/api/register', (req, res) => {
   
    const creds=req.body;

    const hash=bcrypt.hashSync(creds.hashedPassword, 14);

    creds.hashedPassword=hash;

    dbr.registerUser(creds).then(id=>res.status(201).json(id)).catch(err=>res.status(500).json(err))


});

server.post('/api/login', (req, res) => {



    const creds=req.body;
    
    dbr.getUser(creds.userName).then(user=>{

        if(user && bcrypt.compareSync(creds.hashedPassword, user.hashedPassword)){

            req.session.userName=user.userName;


    res.status(200).json({message:'Hello'})

}else{

    res.status(401).json({message:'Do Not Enter'})

}}).
catch(err=>res.json(err))
});

server.get('/api/users', (req,res) =>{
    
    if(req.session && req.session.userName){
        
        dbr.getUsers().then(users=>res.json(users).status(201))
        .catch(err=>res.json(err))
   
   
    }else{
        
        
        res.status(400).json({message:'Cant Enter'})}
})

server.post('/api/logout',(req,res)=>{
    req.session.destroy(err=>{});
    
    if(err){res.status(500).json({message:"Error Cant Log Out"})

}else{ 
    
    
    res.send('logout successful!')}
})







server.listen(PORT, () => (`API running on port ${PORT}`));