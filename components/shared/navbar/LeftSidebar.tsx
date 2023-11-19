"use client";
import Image from "next/image";
import React from "react";

import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const LeftSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="background-light900_dark200 h-[100vh] overflow-auto px-6 py-12">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;
        return (
          <div key={item.route}>
            <Link
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              } my-6 flex items-center justify-center gap-4 bg-transparent p-4 md:justify-start`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p
                className={`${
                  isActive
                    ? "base-bold hidden md:inline-block"
                    : "base-medium hidden md:inline-block"
                }`}
              >
                {item.label}
              </p>
            </Link>
          </div>
        );
      })}
      <SignedOut>
        <Link className="mb-[10px] block" href="/sign-in">
          <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
            <span className="primary-text-gradient">Log In</span>
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
            <span className="primary-text-gradient">Sign Up</span>
          </Button>
        </Link>
      </SignedOut>
      <SignedIn>
        <SignOutButton />
      </SignedIn>
    </div>
  );
};

export default LeftSidebar;
