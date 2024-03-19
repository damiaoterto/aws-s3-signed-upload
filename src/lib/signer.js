const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')

const createPresignedUrlWithClient = async ({
  region,
  bucket: Bucket,
  key: Key,
}, options = {}) => {
  const method = options.method || 'PUT'
  const client = new S3Client({ region: region })

  const command = {
    'GET': GetObjectCommand,
    'PUT': PutObjectCommand,
  }

  if (!command[method]) {
    throw new Error(`Method '${method}' not implemented`)
  }

  return getSignedUrl(client, new command[method]({ Bucket, Key }), {
    expiresIn: options.expiresIn || 3600,
  })
}

module.exports = {
  createPresignedUrlWithClient,
}
