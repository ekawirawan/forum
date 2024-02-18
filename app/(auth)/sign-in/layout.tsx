import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "User required to sign in",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
