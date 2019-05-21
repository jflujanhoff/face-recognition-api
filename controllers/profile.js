const handleProfile = (req, res, db) => {
  const { id } = req.params;
  db.one('SELECT * FROM user_brain WHERE id = $1', [id])
    .then(user => {
      console.log(user);
      return res.status(200).json(user);
    })
    .catch(err => {
      res.status(400).json('user not found')
    })
};

module.exports = {
  handleProfile:handleProfile
}
