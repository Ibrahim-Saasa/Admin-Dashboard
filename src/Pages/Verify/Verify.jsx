import React from "react";
import insurance from "../../assets/insurance.png";
import OTPVerification from "../../components/OtpVerification/OtpVerification";
import bgImage from "../../assets/titanium.jpg";

const Verify = () => {
  return (
    <>
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
        // style={{ backgroundImage: `url(${bgImage})` }}
      >
        <section className="section !py-10">
          <div className="container">
            <div className="card shadow-[0_0_15px_rgba(0,0,0,0.3)] w-[500px] !m-auto rounded-md glass !p-5 !px-12">
              <div className="text-center flex items-center justify-center"></div>
              <h3 className="text-center text-[18px] text-[#000] font-[500] !mt-4">
                Verify OTP
              </h3>
              <p className="text-center !mt-5">
                OTP Sent to{" "}
                <span className="text-[#0c8563]">ibrahimsaasa@gmail.com</span>
              </p>
              <OTPVerification />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Verify;
