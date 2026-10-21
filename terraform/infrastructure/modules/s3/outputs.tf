output "cloud_resume_bucket_name"{
    description = "Name of the S3 bucket used to store website."
    value = aws_s3_bucket.cloud-resume-bucket-name.bucket
}

