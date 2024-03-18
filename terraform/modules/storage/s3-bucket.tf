resource "aws_s3_bucket" "app-bucket" {
  bucket = "${var.environment}-${var.app_name}"
}
