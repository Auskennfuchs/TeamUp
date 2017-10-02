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
    friends: [UserType]
    enemies: [UserType]
}

input UserInputType {
    name: String!
    age: Int
}

input UpdateUserInputType {
    name: String
    firstname: String
    email: String
    city: String
    age: Int
    picture: String
}

type Query {
    users: [UserType]
    user(id:String!): UserType
}

type Mutation {
    addUser(user: UserInputType): UserType
    updateUser(id:String!, user: UpdateUserInputType): UserType
    addFriend(userId:String!, friendId:String!): Boolean
}
`;

const resolvers = {
    Query: {
        user: (_, args) => {
            return User.find({ "_id": args.id }, {}, (e, user) => (user))
        },
        users: (_, args) => {
            return User.find({}).sort({ "name": 1 }).exec((e, docs) => (docs))
        },
    },
    Mutation: {
        addUser: (_, args) => {
            var user = new User({ name: args.user.name, age: args.user.age })
            return user.save((e, user) => (user))
        },
        updateUser: (_, args, { db }) => {
            var collection = db.get('User')
            return collection.findOne({ "_id": args.id }, {})
                .then(user => {
                    merge(user, args.user)
                    console.log(user)
                    return collection.update({ "_id": user._id }, user)
                        .then(() => (collection.findOne({ "_id": user._id })))
                })
                .catch((err) => Promise.reject(err))
        },
        addFriend: (_, args) => {
            console.log(args.friendId)
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

