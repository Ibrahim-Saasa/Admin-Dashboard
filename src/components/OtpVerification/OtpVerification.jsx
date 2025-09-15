import { Button } from "@mui/material";
import React, { useState } from "react";

const OTPVerification = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // auto-focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Entered OTP is: " + otp.join(""));
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-lg  !mt-4 titanium border-2 border-[#0c8563]">
      <div className=" !p-8 rounded-2xl shadow-md w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center !space-y-6"
        >
          <div className="flex !space-x-3">
            {otp.map((data, index) => {
              return (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  className="!w-12 !h-12 text-center border rounded-lg text-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              );
            })}
          </div>
          <Button
            type="submit"
            className="!w-full !py-2 !rounded-lg !text-black !font-medium glass !transition-all cursor-pointer"
          >
            Verify
          </Button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
