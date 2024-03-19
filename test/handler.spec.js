const { handlerCreateSignedUrl } = require('../src')
const { createPresignedUrlWithClient } = require('../src/lib/signer')

jest.mock('../src/lib/signer', () => ({
  createPresignedUrlWithClient: jest.fn()
}))

describe('handlerCreateSignedUrl', () => {
  const mockCallback = jest.fn()
  const mockEvent = { body: JSON.stringify({ files: [{ filename: 'test.txt' }] }) }
  const mockContext = {}

  beforeEach(() => {
    createPresignedUrlWithClient.mockClear()
    mockCallback.mockClear()
  })

  it('should call createPresignedUrlWithClient with correct arguments', async () => {
    await handlerCreateSignedUrl(mockEvent, mockContext, mockCallback)

    expect(createPresignedUrlWithClient).toHaveBeenCalledTimes(2)
    expect(createPresignedUrlWithClient).toHaveBeenNthCalledWith(1, {
      region: 'us-east-1',
      bucket: process.env.BUCKET_NAME,
      key: 'test.txt'
    })
    expect(createPresignedUrlWithClient).toHaveBeenNthCalledWith(2, {
      region: 'us-east-1',
      bucket: process.env.BUCKET_NAME,
      key: 'test.txt'
    }, { method: 'GET' })
  })

  it('should return a 400 status code if no filename is provided', async () => {
    const mockEventNoFilename = { body: JSON.stringify({ files: [] }) }

    await handlerCreateSignedUrl(mockEventNoFilename, mockContext, mockCallback)

    expect(mockCallback).toHaveBeenCalledTimes(1)
    expect(mockCallback).toHaveBeenCalledWith(null, {
      statusCode: 400,
      body: JSON.stringify({ message: 'The filename is required' })
    })
  })
})
