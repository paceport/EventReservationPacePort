// utils/sesService.js
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const sesClient = new SESClient({
  region: process.env.AWS_REGION || "us-east-1",
  // No credentials required: EC2 IAM Role automatically used
});

const sendOtpEmail = async ({ to, otp, purpose }) => {
  const subject =
    purpose === "registration"
      ? "Verify your registration OTP"
      : "Your password reset OTP";

  const message =
    purpose === "registration"
      ? `Your registration OTP is ${otp}. It will expire in 10 minutes.`
      : `Your password reset OTP is ${otp}. It will expire in 10 minutes.`;

  const command = new SendEmailCommand({
    Source: process.env.SES_FROM_EMAIL,
    Destination: { ToAddresses: [to] },
    Message: {
      Subject: { Data: subject },
      Body: { Text: { Data: message } },
    },
  });

  await sesClient.send(command);
};

module.exports = { sendOtpEmail };