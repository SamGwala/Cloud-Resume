resource "aws_s3_bucket" "cloud_resume_bucket" {
  bucket = var.cloud_resume_bucket_name

  tags = {
    Name        = "website bucket"
    Environment = "Dev"
  }
}

resource "aws_s3_bucket_public_access_block" "cloud_resume_website_bucket_public_access_block" {
  bucket = aws_s3_bucket.cloud_resume_website_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "versioning_website_bucket" {
  bucket = aws_s3_bucket.cloud_resume_bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "website_encryption" {
  bucket = aws_s3_bucket.cloud_resume_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "AES256"
    }
  }
}

resource "aws_s3_bucket_ownership_controls" "webiste_ownership" {
  bucket = aws_s3_bucket.cloud_resume_bucket.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}
