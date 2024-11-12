import React from "react";
import Header from "./header";
import XionPay from "./xion-pay";

const Payments = () => {
  return (
    <div className="absolute bg-foreground border border-active rounded-lg w-[50%] h-96 text-white px-4 flex flex-col gap-2">
      <Header />
      <div className="size-full flex flex-wrap gap-2">
        <XionPay />
      </div>
    </div>
  );
};

export default Payments;
