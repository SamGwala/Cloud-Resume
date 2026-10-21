#create state bucket
resource "aws_s3_bucket" "cloud_resume_terraform_state" {  
  bucket = var.state_bucket_name

  tags = {
    Name        = "terraform state"
    Environment = "Bootstrap"
  }
}

#Link versioning to our local bucket name
resource "aws_s3_bucket_versioning" "versioning_state" {
  bucket = aws_s3_bucket.cloud_resume_terraform_state.id 
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "aws_s3_bucket_server_side_encryption_configuration_state" {
  bucket = aws_s3_bucket.cloud_resume_terraform_state.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "cloud_resume_aws_s3_bucket_public_access_block" {
  bucket = aws_s3_bucket.cloud_resume_terraform_state.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}