"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Logo from "../../../public/5ftapartbw.png";

export default function Home() {
  const [mortgage, setMortgage] = useState(1000000);
  const [amortization, setAmortization] = useState(25);
  const [paymentFrequency, setPaymentFrequency] = useState(12);
  const [interestRate, setInterestRate] = useState(0.0649);
  const [interestTerm, setInterestTerm] = useState(5);
  const [monthlyPayment, setMonthlyPayment] = useState(500);

  const inputRefs = {
    mortgage: useRef<HTMLInputElement>(null),
    amortization: useRef<HTMLInputElement>(null),
    paymentFrequency: useRef<HTMLInputElement>(null),
    interestRate: useRef<HTMLInputElement>(null),
    interestTerm: useRef<HTMLInputElement>(null),
    monthlyPayment: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    calculateMonthlyPayment();
  }, [mortgage, amortization, paymentFrequency, interestRate, interestTerm]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "mortgage":
        setMortgage(parseFloat(value) || 0);
        break;
      case "amortization":
        setAmortization(parseInt(value) || 0);
        break;
      case "paymentFrequency":
        setPaymentFrequency(parseInt(value) || 0);
        break;
      case "interestRate":
        setInterestRate(parseFloat(value) || 0);
        break;
      case "interestTerm":
        setInterestTerm(parseFloat(value) || 0);
        break;
      default:
        break;
    }
  };

  const calculateMonthlyPayment = () => {
    const monthlyInterestRate = interestRate / 12;
    const n = amortization * paymentFrequency;

    const payment =
      mortgage *
      (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -n)));

    setMonthlyPayment(payment);

    if (inputRefs.monthlyPayment.current) {
      inputRefs.monthlyPayment.current.value = payment.toFixed(2);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-3 justify-center bg-w mx-auto border-r-3">
      <div>
        <Image src={Logo} alt="logo image" width={250} height={325} />

        <form className="mx-auto" action="#">
          {Object.entries(inputRefs).map(([key, ref]) => (
            <div className="mx-auto flex flex-col mt-4" key={key}>
              <div>{key.replace(/^\w/, (c) => c.toUpperCase())}</div>
              <input
                type="text"
                name={key}
                defaultValue={
                  key === "mortgage"
                    ? mortgage
                    : key === "amortization"
                    ? amortization
                    : key === "paymentFrequency"
                    ? paymentFrequency
                    : key === "interestRate"
                    ? interestRate
                    : key === "interestTerm"
                    ? interestTerm
                    : monthlyPayment
                }
                className={
                  "mx-auto mt-2 appearance-none rounded-md shadow-md px-4 py-3"
                }
                ref={ref}
                onChange={handleInputChange}
              />
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}