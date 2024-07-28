import React, { useState, useEffect } from "react";
import { authenticator, totp } from "otplib";
function OTPGenerator() {
  const [otp, setOTP] = useState("");
  const [userOTP, setUserOTP] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [otpTimestamp, setOTPTimestamp] = useState(null);
  const [otpVerified, setOTPVerified] = useState(false);

  const generateOTP = () => {
    const secret = "Meta@1234"; // Replace with your secret key
    const generatedOTP = totp.generate(secret);
    setOTP(generatedOTP);
    setOTPTimestamp(Date.now()); // Record the OTP creation timestamp

    // Send OTP via email
    sendEmail(generatedOTP);
  };

  const sendEmail = async (otp) => {
    let config = {
      // Host: "smtp.elasticemail.com",
      // Username: "jobs@metapercept.com",
      // Password: "0F563091426DC166D1601E5583DDC627B290",
      // To: "omkar.s@metapercept.com",
      // From: `jobs@metapercept.com`,
      Host: "smtp.elasticemail.com",
      Username: "ram.gk@metapercept.com",
      Password: "7E5A1F5255064ED8921CE7F994F0EE89CC52",
      To: "omkar.s@metapercept.com",
      From: `ram.gk@metapercept.com`,
      Subject: `OTP for login  `,
      Body: `your otp  ${otp}`,
    };
    if (window.Email) {
      await window.Email.send(config)
        .then(() => {
          // console.log("Email sent");
          return "email sent succesfully";
        })
        .catch(() => {
          // console.log("Email unsent");
          return "email failed";
        });
    }
  };

  const handleVerifyOTP = () => {
    if (otp === userOTP) {
      setOTPVerified(true);
      setMessage("OTP is correct!");
    } else {
      setOTPVerified(false);
      setMessage("OTP is incorrect. Please try again.");
    }
  };

  // Check OTP validity every second
  useEffect(() => {
    const checkValidity = () => {
      if (otpTimestamp) {
        const currentTime = Date.now();
        const timeDifference = (currentTime - otpTimestamp) / 1000; // Convert to seconds
        if (timeDifference >= 60) {
          // OTP is valid for 10 minutes (600 seconds)
          setOTP("");
          setOTPTimestamp(null);
          setOTPVerified(false);
          setMessage("");
        }
      }
    };

    const intervalId = setInterval(checkValidity, 1000); // Check every second

    return () => clearInterval(intervalId);
  }, [otpTimestamp]);

  return (
    <div>
      <h2>OTP Generator</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={generateOTP}>Generate OTP</button>
      <input
        type="text"
        placeholder="Enter OTP"
        value="123456"
        // onChange={(e) => setUserOTP(e.target.value)}
      />
      <button onClick={handleVerifyOTP}>Verify OTP</button>
      <p>{message}</p>
      {otpVerified && <p>OTP is correct!</p>}
    </div>
  );
}

export default OTPGenerator;
