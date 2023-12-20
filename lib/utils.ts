import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const diff = Math.abs(now.getTime() - createdAt.getTime());

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years >= 1) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (months >= 1) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (weeks >= 1) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (days >= 2) {
    return `${days} days ago`;
  } else if (days === 1) {
    return "1 day ago";
  } else if (hours >= 2) {
    return `${hours} hours ago`;
  } else if (hours === 1) {
    return "1 hour ago";
  } else if (minutes >= 2) {
    return `${minutes} minutes ago`;
  } else if (minutes === 1) {
    return "1 minute ago";
  } else {
    return `${seconds} seconds ago`;
  }
};

export const formatNumber = (num: number): string => {
  if (Math.abs(num) >= 1e6) {
    return (num / 1e6).toFixed(1) + "M";
  } else if (Math.abs(num) >= 1e3) {
    return (num / 1e3).toFixed(1) + "K";
  } else {
    return num.toString();
  }
};

export const getJoinedDate = (dateObj: Date): string => {
  // Get the month and year from the Date object
  const month: string = dateObj.toLocaleString("default", { month: "long" });
  const year: number = dateObj.getFullYear();

  // Join the month and year
  const joinedDate: string = `${month} ${year}`;

  return joinedDate;
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}
export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  console.log("params", params);
  console.log("key", key);
  console.log("value", value);
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;
  const newUrl = qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
  console.log("new url", newUrl);

  return newUrl;
};

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}
export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);
  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};
