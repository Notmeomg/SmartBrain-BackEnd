const handleRegister = (req, res, db, bcrypt, saltRounds) => {
    /*
    starts with grabbing the password from the req and hashing the pw.
    Then grabs name, email and password from the req and checks if any of the fields are empty.
    If the fields are not empty using a knex transaction we do two things.
    First insert the pw in form of a hash and email into the login db table.
    Second insert the name, email and date user joined into the users db table.
    This db is setup as email UNIQUE, if the transaction fails commit will rollback.
    */
    const { name, email, password } = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    if (name !== '') {
        if (email !== '') {
            if (password !== '') {
                db.transaction(trx => {
                    trx.insert({
                        hash: hash,
                        email: email
                    })
                    .into('login')
                    .returning('email')
                    .then(loginEmail => {
                        return trx('users')
                        .returning('*')
                        .insert({
                            name: name,
                            email: loginEmail[0],
                            joined: new Date()
                        })
                        .then(user => {
                            res.json(user[0]);
                        })
                    })
                    .then(trx.commit)
                    .catch(trx.rollback)
                })
               
                .catch(err => {
                    res.status(400).json('unable to register');
                    console.log('Unable to register');
                })

            } else {
                res.send({ error: "Please provide a password"})
            }
        } else {
            res.send({ error: "Please provide your email"})
        }
    } else {
        res.send({ error: "Please provide your name"})
    }
}

module.exports = {
    handleRegister: handleRegister
}

// Refactoring

    // switch(true) {
    //     case (!name && !email && !password):
    //         console.log('Enter name, email, password')
    //         break
    //     case (name && !email && !password):
    //         console.log('Enter your email and password')
    //         break
    //     case (name && email && !password):
    //         console.log('Enter your password')
    //         break
    //     case (name && email && password):
    //         console.log('User created')
    //         break
    // }
