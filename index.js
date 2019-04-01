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
server.use