import { SignIn } from "@clerk/nextjs";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signin | Devflow",
};

const Page = () => {
  return <SignIn />;
};

export default Page;
