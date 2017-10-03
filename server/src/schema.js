import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLError,
    buildSchema
} from 'graphql'

import { makeExecutableSchema } from 'graphql-tools'

import merge from 'lodash/merge'

import User from './model/user'

const typeDefs = `

type UserType {
    _id: String!
    name: String
    realName: String
    city: String
    age: Int
    slogan: String
    picture: String
    fraction: String
    friends: [UserType]
    enemies: [UserType]
}

input CreateUserInputType {
    name: String!
    city: String!
    fraction: String!
}

input UpdateUserInputType {
    name: String
    realName: String
    city: String
    age: Int
    picture: String
    slogan: String    
    picture: String
}

type Query {
    users: [UserType]
    user(id:String!): UserType
    usersFraction(fraction:String!): [UserType]
}

type Mutation {
    createUser(user: CreateUserInputType): UserType
    updateUser(id:String!, user: UpdateUserInputType): UserType
    addFriend(userId:String!, friendId:String!): Boolean
}
`;

const resolvers = {
    Query: {
        user: (_, { id }) => {
            return User.findOne({ "_id": id }, {}).exec().then((user) => (user))
        },
        users: (_, args) => {
            return User.find({}).sort({ "name": 1 }).exec().then((users) => (users))
        },
        usersFraction: (_, {fraction}) => {
            return User.find({"fraction":fraction}).sort({ "name": 1 }).exec().then((users) => (users))
        },
    },
    Mutation: {
        createUser: (_, { user }) => {
            var user = new User({ name: user.name, city: user.city, fraction: user.fraction })
            return user.save((e, user) => (user))
        },
        updateUser: (_, {id,user}, { db }) => {
            return User.findOneAndUpdate({ "_id": id }, user,{new: true}).exec().then(
                    (user) => (user)
            ).catch((err) => Promise.reject(err))
        },
        addFriend: (_, args) => {
            return insertFriend(args.userId, args.friendId)
                .then(() => (insertFriend(args.friendId, args.userId)))
                .catch((err) => {
                    console.log(err.message)
                    return false
                })
        },
    },
    UserType: {
        friends: (user, args, { db }) => {
            return User.find({ "_id": { "$in": user.friends || [] } }).sort({ "name": 1 }).exec((e, users) => (users))
        },
        enemies: (user, args, { db }) => {
            return User.find({ "_id": { "$in": user.friends || [] } }).sort({ "name": 1 }).exec((e, users) => (users))
        }
    }
}

function insertFriend(userId, friendId) {
    var query = User.findOne({ "_id": userId }, {});
    var promise = query.exec()
    return promise.then(user => {
        console.log(user)
        user.friends = user.friends || []
        var foundFriend = user.friends.find(f => (f == friendId))
        if (foundFriend != undefined) {
            //already in the list
            return Promise.reject(Error("already in list"))
        }
        user.friends.push(friendId)
        return user.save()
    })
}

export default makeExecutableSchema({ typeDefs, resolvers })

