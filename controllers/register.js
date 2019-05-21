const handleRegister = (req, res, db, bcrypt, saltRounds) => {
  let {email, name, password} = req.body;
  if (!email|!name|!password) {
    return res.status(400).json('not found!');
  }
  bcrypt.hash(password, saltRounds, function(err, hash) {
    db.tx(
      t => {
        return t.batch([
          t.one('INSERT INTO user_login (email, hash) VALUES ($1, $2) RETURNING *', [email, hash]),
          t.one('INSERT INTO user_brain (name, email, entryDate) VALUES ($1, $2, $3) RETURNING *', [name, email, new Date()])
        ])
        .then(data => {
          console.log(data[0]);
          console.log(data[1]); // print new user id;
          return res.status(200).json(data[1]);
        })
        .catch(error => {
            return res.status(404).json('not found');
        });
      }
    )
  });
}

module.exports = {
  handleRegister: handleRegister
}
