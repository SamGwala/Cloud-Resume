output "state_bucket_name" {
  description = "Name of the S3 bucket used to store Terraform state."
  value       = aws_s3_bucket.cloud_resume_terraform_state.bucket
}

