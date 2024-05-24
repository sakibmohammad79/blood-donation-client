"use server";

import { FieldValues } from "react-hook-form";

export const registerDonor = async (formData: FieldValues) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/create-donor`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      cache: "no-store",
    }
  );
  const userInfo = await res.json();
  return userInfo;
};
