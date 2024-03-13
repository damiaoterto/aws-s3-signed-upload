const handlerCreateSignedUrl = async (event, ctx, callback) => {
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({ statusCode: 200 })
  })
}

module.exports = { handlerCreateSignedUrl }
