const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'a817d514bb4e4018917cb7a66db9819b'
});
const handleApiCall = () => (req, res) => {
  app.models.predict(
    Clarifai.FACE_DETECT_MODEL,
    req.body.input
  )
  .then(data => {
    res.json(data)
  })
  .catch(err => res.status(400).json('unable to work whit API'))
}


const handleImage = db => (req, res) => {
  const { id } = req.body;
  db('users').where('id', '=' , id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    if (entries[0]){
      res.json(entries[0])
    } else {
      res.status(400).json('Not found')
    }
  })
  .catch(err => res.status(400).json('Error getting entries'))
}

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
}