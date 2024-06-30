"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
    layoutchildren?: React.ReactNode;
};

export default function NextAuthProvider({ layoutchildren }: Props)  {
  return <SessionProvider>{layoutchildren}</SessionProvider>;
};