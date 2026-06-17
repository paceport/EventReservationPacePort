variable "aws_region" {
  description = "AWS region to deploy the EC2 instance"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.small"
}

variable "key_name" {
  description = "Name of the existing AWS key pair for SSH access"
  type        = string
}

variable "ubuntu_ami" {
  description = "Ubuntu 24.04 LTS AMI ID for the region"
  type        = string
  default     = "" # we will fetch it dynamically in main.tf if empty
}

variable "security_group_name" {
  description = "Security group name for the EC2 instance"
  type        = string
  default     = "tcs-paceport-sg"
}

variable "tags" {
  description = "Tags for EC2 instance"
  type        = map(string)
  default     = {
    Project = "TCS-Paceport"
    Environment = "Dev"
  }
}