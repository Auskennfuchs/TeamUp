import mongoose from 'mongoose'

var Schema = mongoose.Schema, ObjectId = Schema.ObjectId

var User = new Schema({
    name: String,
    age: Number,
    realName: String,
    city: String,
    age: Number,
    slogan: String,
    picture: String,
    fraction: String,
    friends: { type: Array, default: [] },
    enemies: { type: Array, default: [] }
},{
    collection: 'User'
})

export default mongoose.model('User', User)