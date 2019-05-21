
const handleImageApi = (req, res, appClarifai) => {
  appClarifai.models
    .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data => {
      return res.json(data);
    })
    .catch(err => {
      return res.status(400).json('unable to work with API');
    })
}

const handleImageCount = (req, res, db) => {
  const { id } = req.body;
  console.log(id);
  db.one('UPDATE user_brain SET entries = entries + 1 WHERE id = $1 RETURNING entries', [id])
  .then(entries => {
    console.log(entries);
    return res.status(200).json(entries);
  })
  .catch(error => {
    console.log(error);
    return res.status(404).json('not found');
  })
};

module.exports = {
  handleImageApi:handleImageApi,
  handleImageCount:handleImageCount
}
