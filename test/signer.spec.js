const { createPresignedUrlWithClient } = require('../src/lib/signer')
const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

jest.mock('@aws-sdk/client-s3')
jest.mock('@aws-sdk/s3-request-presigner')

describe('createPresignedUrlWithClient', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should create a presigned URL for PUT operation', async () => {
    const mockGetSignedUrl = jest.fn().mockResolvedValue('https://example.com/presigned-url')
    getSignedUrl.mockImplementation(mockGetSignedUrl)

    const client = new S3Client({});
    const expectedUrl = 'https://example.com/presigned-url'
    const expectedOptions = {
      expiresIn: 3600,
    }

    const result = await createPresignedUrlWithClient({
      region: 'us-east-1',
      bucket: 'test-bucket',
      key: 'test-key',
    })

    expect(result).toBe(expectedUrl)
    expect(S3Client).toHaveBeenCalledWith({ region: 'us-east-1' })
    expect(PutObjectCommand).toHaveBeenCalledWith({ Bucket: 'test-bucket', Key: 'test-key' })
    expect(mockGetSignedUrl).toHaveBeenCalledWith(client, expect.any(PutObjectCommand), expectedOptions)
  })

  test('should create a presigned URL for GET operation', async () => {
    const mockGetSignedUrl = jest.fn().mockResolvedValue('https://example.com/presigned-url')
    getSignedUrl.mockImplementation(mockGetSignedUrl)

    const expectedUrl = 'https://example.com/presigned-url'

    const result = await createPresignedUrlWithClient({
      region: 'us-east-1',
      bucket: 'test-bucket',
      key: 'test-key',
      options: { method: 'GET' }
    })

    expect(result).toBe(expectedUrl)
    expect(S3Client).toHaveBeenCalledWith({ region: 'us-east-1' })
    expect(GetObjectCommand).toHaveBeenCalledWith({ Bucket: 'test-bucket', Key: 'test-key' })
  })

  test('should throw error for unsupported method', async () => {
    const expectedError = new Error(`Method 'DELETE' not implemented`)

    await expect(createPresignedUrlWithClient({
      region: 'us-east-1',
      bucket: 'test-bucket',
      key: 'test-key',
      options: { method: 'DELETE' }
    })).rejects.toThrow(expectedError)

    expect(S3Client).toHaveBeenCalledWith({ region: 'us-east-1' })
  })
})

