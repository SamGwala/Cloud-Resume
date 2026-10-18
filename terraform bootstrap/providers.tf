# Configure the AWS Provider
provider "aws" {
  region  = "us-east-1"
  profile = "cloudresume"

  assume_role {
    role_arn = "arn:aws:iam::411706530529:role/CloudResumeTerraformRole"
  }
}
