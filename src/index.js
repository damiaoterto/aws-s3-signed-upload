const { createPresignedUrlWithClient } = require('./lib/signer')

const handlerCreateSignedUrl = async (event, ctx, callback) => {
  const body = JSON.parse(event.body)

  if (!body.files || !Array.isArray(body.files) || !body.files.length) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({ message: 'The filename is required' })
    })
  }

  const urls = Array.from(body.files).map(async (file) => {
    const uploadUrl = await createPresignedUrlWithClient({
      region: 'us-east-1',
      bucket: process.env.BUCKET_NAME,
      key: file.filename,
    })

    const downloadUrl = await createPresignedUrlWithClient({
      region: 'us-east-1',
      bucket: process.env.BUCKET_NAME,
      key: file.filename,
    }, { method: 'GET' })

    return { uploadUrl, downloadUrl }
  })

  const data = await Promise.all(urls)

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({ data })
  })
}

module.exports = { handlerCreateSignedUrl }
