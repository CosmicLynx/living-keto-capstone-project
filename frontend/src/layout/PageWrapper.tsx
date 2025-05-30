import type { ReactNode } from "react";
import { Header } from "./Header.tsx";

export function PageWrapper(props: { children: ReactNode }) {
  const { children } = props;
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 my-5 m-auto px-5 w-full max-w-[1040px]">
        {children}
      </div>
    </div>
  );
}
