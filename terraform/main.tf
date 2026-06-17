provider "aws" {
  region = var.aws_region
}

# Security Group for EC2
resource "aws_security_group" "tcs_paceport_sg" {
  name        = var.security_group_name
  description = "Allow SSH, HTTP, HTTPS"

  ingress {
    description = "SSH from my IP only"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["54.242.96.98/32"]
  }

  ingress {
    description = "HTTP public"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS public"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "All outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = var.tags
}

# Ubuntu EC2 Instance
resource "aws_instance" "ubuntu_ec2" {
  # Ubuntu 24.04 LTS amd64 AMI for us-east-1
  ami                         = "ami-0fc5d935ebf8bc3bc"
  instance_type               = var.instance_type
  key_name                    = var.key_name
  vpc_security_group_ids      = [aws_security_group.tcs_paceport_sg.id]
  associate_public_ip_address = true

  root_block_device {
    volume_size = 30
    volume_type = "gp3"
    encrypted   = true
  }

  tags = merge(var.tags, {
    Name = "TCS-Paceport-EC2"
  })
}

# Elastic IP
resource "aws_eip" "ec2_ip" {
  instance = aws_instance.ubuntu_ec2.id

  tags = merge(var.tags, {
    Name = "TCS-Paceport-EIP"
  })
}