output "ec2_public_ip" {
  description = "Elastic public IP of the EC2 instance"
  value       = aws_eip.ec2_ip.public_ip
}

output "ec2_instance_id" {
  description = "ID of the Ubuntu EC2 instance"
  value       = aws_instance.ubuntu_ec2.id
}

output "ssh_command" {
  description = "SSH command to connect to the Ubuntu EC2 instance"
  value       = "ssh -i tcs-paceport-key.pem ubuntu@${aws_eip.ec2_ip.public_ip}"
}