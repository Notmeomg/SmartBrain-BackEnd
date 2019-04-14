const handleSignIn = (db, bcrypt) => (req, res) => {
    /*
    grabs email and hash from db login table and checks if the req pw is equal to the hash.
    If everything checks out we grab the user from the db users table and res with the user obj.
    */
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Unable to get user'))
            } else {
                res.status(400).json('Wrong credentials')
            }
        })
        .catch(err => res.status(400).json('Please enter your login info'))
}

module.exports = {
    handleSignIn: handleSignIn
}