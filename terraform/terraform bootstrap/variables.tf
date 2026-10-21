#state bucket name 
variable "state_bucket_name"{
    type = string
    description = "Name of the S3 bucket used to store Terraform state."
    default = "cloud-resume-terraform-bootstrap-state"
}


