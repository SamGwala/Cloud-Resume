# Terraform Bootstrap

This directory contains the Terraform configuration used to bootstrap the remote Terraform backend for the Cloud Resume project.

## Purpose

The Bootstrap configuration creates and secures the Amazon S3 bucket that will be used to store Terraform state for the main infrastructure configuration.

The Bootstrap is kept separate from the main infrastructure because Terraform cannot use a remote backend that does not exist yet.

### The sequence
Bootstrap
    │
    ├── Creates S3 state bucket
    ├── Enables versioning
    ├── Enables server-side encryption
    └── Blocks public access
            │
            ▼
     Remote state bucket
            │
            ▼
Main Terraform configuration
    │
    ├── Uses S3 backend
    ├── Enables native S3 state locking
    └── Provisions Cloud Resume infrastructure


## Why Bootstrap is separate

The main Terraform configuration needs a remote backend to store its state.

However, the backend cannot be created by the same Terraform configuration that needs to use it during initialization. This creates a dependency:


Terraform needs the backend
        ↓
The backend needs to exist
        ↓
Bootstrap creates the backend
        ↓
Main Terraform can use it


The Bootstrap therefore uses local Terraform state initially.

Once the S3 state bucket has been created, the main infrastructure configuration can use it as its remote backend.

## Resources created

The Bootstrap currently creates one primary AWS resource:

### S3 Terraform State Bucket

The bucket is configured with:

- **Versioning enabled**
- **Server-side encryption using SSE-S3 (AES-256)**
- **S3 public access blocked**
- **Terraform-managed tags**

## Security considerations

The state bucket is intentionally private.

Terraform state can contain sensitive infrastructure information, so the bucket is not configured for public access.

The Bootstrap applies the following security controls:

### Encryption

S3 server-side encryption using SSE-S3 is enabled to protect Terraform state at rest.

### Versioning

Bucket versioning is enabled to provide previous versions of Terraform state for recovery from accidental changes or corruption.

### Public access protection

All S3 public access settings are blocked to prevent the state bucket from becoming publicly accessible.

## Terraform variables

The Bootstrap currently uses a variable for the state bucket name.

The variable has a sensible default because this project does not require separate development, staging or production environments.

Variables are only introduced where configurability provides a practical benefit. Fixed architectural and security decisions, such as encryption and versioning, remain explicit in the resource configuration.

## Terraform outputs

The Bootstrap exposes the state bucket name as a Terraform output.

This allows the resulting resource information to be easily inspected or consumed by other tooling.

## State locking

Native S3 state locking is **not configured as a separate Bootstrap resource**.

The Bootstrap creates the S3 bucket required for the remote backend.

The main Terraform configuration will use that existing bucket as its S3 backend and enable native S3 state locking through the backend configuration.

This separation avoids the Bootstrap needing to manage its own remote backend before that backend exists.

## Files
terraform-bootstrap/
├── main.tf
├── variables.tf
├── outputs.tf
├── versions.tf
├── providers.tf
└── README.md


### `versions.tf`

Defines the required Terraform and AWS provider versions.

### `providers.tf`

Configures the AWS provider and the dedicated Terraform IAM role used to provision the Bootstrap resources.

### `variables.tf`

Defines configurable inputs for the Bootstrap.

### `main.tf`

Contains the AWS resources and their security configuration.

### `outputs.tf`

Exposes useful information produced by the Bootstrap.

## Deployment workflow

The Bootstrap should be applied before the main infrastructure configuration.

Typical workflow:
terraform init
terraform fmt
terraform validate
terraform plan
terraform apply


After successful deployment, verify that the S3 state bucket exists and that its security controls are configured correctly.

The main infrastructure can then be configured to use this bucket as its remote Terraform backend.

## Design principles

This Bootstrap follows several infrastructure-as-code principles:

- **Separation of responsibilities** — backend bootstrapping is separated from application infrastructure.
- **Least privilege** — Terraform operates through a dedicated IAM role rather than the AWS root user.
- **Secure by default** — the state bucket is encrypted and public access is blocked.
- **Recoverability** — S3 versioning protects previous state versions.
- **Explicit configuration** — important security decisions are represented directly in Terraform.
- **Avoid unnecessary abstraction** — variables are used where configuration flexibility is useful rather than turning every fixed setting into a variable.
- **Reproducibility** — Terraform and provider versions are constrained.

## Relationship to the Cloud Resume infrastructure

The Bootstrap is **not the Cloud Resume application infrastructure itself**.

Its responsibility is to establish the foundation that allows the main Terraform configuration to manage the application infrastructure safely.


Terraform Bootstrap
        │
        ▼
S3 Remote State Backend
        │
        ▼
Main Terraform Configuration
        │
        ├── CloudFront
        ├── Private S3 Website
        ├── API Gateway
        ├── Lambda
        ├── DynamoDB
        └── Monitoring
```

This separation keeps the backend foundation independent from the infrastructure it is used to manage.