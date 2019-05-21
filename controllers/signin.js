const handleSignIn = (req, res, db, bcrypt, saltRounds) => {
  let { email, password } = req.body;
  if (!email|!password) {
    return res.status(400).json('user not found!')
  }
  db.tx(
    t => {
      return t.batch([
        t.one('SELECT * FROM user_login WHERE email = $1', [email]),
        t.one('SELECT * FROM user_brain WHERE email = $1', [email])
      ])
      .then(data => {
        console.log(data[0].hash);
        bcrypt.compare(password, data[0].hash, function(err, response) {
          console.log(response);
          if (response) {
            console.log(data[1]);
            res.status(200).json(data[1]);
          } else {
            console.log('user not found '+err);
            res.status(400).json('user not found!')
          }
        });
      })
      .catch(error => {
        console.log(error);
        return res.status(400).json('error in the database')
      })
    }
  )
}

module.exports = {
  handleSignIn:handleSignIn
}
