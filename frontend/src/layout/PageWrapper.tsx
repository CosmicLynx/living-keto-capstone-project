import type { ReactNode } from "react";
import { Header } from "./Header.tsx";
import { Footer } from "./Footer.tsx";

export function PageWrapper(props: { children: ReactNode }) {
  const { children } = props;
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 pt-5 px-5 pb-10 mx-auto w-full max-w-[1040px] bg-white">
        {children}
      </div>
      <Footer />
    </div>
  );
}
