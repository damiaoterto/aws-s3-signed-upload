resource "aws_s3_bucket" "galery-bucket" {
  bucket = "${var.environment}-smart-galery"
}
