import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "User required to sign up",
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
