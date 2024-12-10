import React from "react";
import Header from "./header";
import XionPay from "./xion-pay";
import SoonPay from "./soon-pay";
import ConnectButton from "../soon/connect-button";

const Payments = () => {
  return (
    <div className="absolute bg-foreground border border-active rounded-lg w-[50%] h-96 text-white px-4 flex flex-col gap-2 items-center justify-center">
      <Header />
      <div className="size-full flex flex-wrap gap-2">
        <SoonPay />
      </div>
    </div>
  );
};

export default Payments;
