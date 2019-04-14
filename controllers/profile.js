const handleProfileGet = (req, res, db) => {
    // grabs the id from the req params and checks the db for the user macthing the id, if found res with user obj
    const { id } = req.params;
    db.select('*').from('users').where({id})
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('Not found')
            }
        })
        .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
    handleProfileGet
}