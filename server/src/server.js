import express from 'express'
import expressGraphQL from 'express-graphql'
import mongo from 'mongodb'
import monk from 'monk'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import schema from './schema.js'

import auth from './routes/auth'

const app = express()

mongoose.connect('mongodb://localhost:27017/TeamUp')
mongoose.Promise = global.Promise;

// add db to all routes
app.use((req,res,next)=> {
    req.db = app.db
    next()
})

app.use(bodyParser.json())

app.use('/auth', cors(), auth )

app.use('/user',cors(), expressGraphQL(req => {
    return {
        schema: schema,
        context: {
            db : req.db
        }
    }
}))

app.use('/graphiql', expressGraphQL(req =>{
    return {
        schema: schema,
        graphiql: true,        
        context: {
            db: req.db
        }
    }
}))



app.listen(4000, () => {
    console.log('TeamUp server is running on port 4000...')
})