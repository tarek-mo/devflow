import { SignUp } from "@clerk/nextjs";

import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup | Devflow",
};
const Page = () => {
  return <SignUp />;
};

export default Page;
