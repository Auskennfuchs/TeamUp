import express from 'express'
import jwt from 'jsonwebtoken'

import User from '../model/user'

let router = express.Router()

router.post('/', (req, res) => {
    const { identifier } = req.body
    var user = User.findOne({ "name": identifier }).exec().then(user => {
        if (user) {
            const token = jwt.sign({
                id: user._id,
                username: user.name
            }, 'somesecretkeyforjsonwebtoken')
            res.json({ token })
        } else {
            res.status(401).json({ errors: { form: 'Invalid Credentials' } })
        }
    })
})

export default router