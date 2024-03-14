const handlerCreateSignedUrl = async (event, ctx, callback) => {
  return callback(null, {
    statusCode: 204,
  })
}

module.exports = { handlerCreateSignedUrl }
