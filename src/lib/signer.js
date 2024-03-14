const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')

const createPresignedUrlWithClient = async ({
  region,
  bucket: Bucket,
  key: Key,
  options = {},
}) => {
  const method = options.method || 'PUT'
  const client = new S3Client({ region })

  const command = {
    'GET': new GetObjectCommand({ Bucket, Key }),
    'PUT': new PutObjectCommand({ Bucket, Key }),
  }

  if (!command[method]) {
    throw new Error(`Method '${method}' not implemented`)
  }

  return getSignedUrl(client, command[method], {
    expiresIn: options.expiresIn || 3600,
  })
}

module.exports = {
  createPresignedUrlWithClient,
}
