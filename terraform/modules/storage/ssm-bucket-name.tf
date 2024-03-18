resource "aws_ssm_parameter" "ssm-bucket-name" {
  name = "${var.environment}-${var.app_name}-bucket"
  type = "String"
  value = aws_s3_bucket.app-bucket.bucket
}

resource "aws_ssm_parameter" "ssm-bucket-arn" {
  name = "${var.environment}-${var.app_name}-arn"
  type = "String"
  value = aws_s3_bucket.app-bucket.arn
}
