resource "aws_ssm_parameter" "galery-bucket-name" {
  name = "${var.environment}-smart-gallery-bucket"
  type = "String"
  value = aws_s3_bucket.galery-bucket.name
}

resource "aws_ssm_parameter" "galery-bucket-arn" {
  name = "${var.environment}-smart-gallery-arn"
  type = "String"
  value = aws_s3_bucket.galery-bucket.arn
}
