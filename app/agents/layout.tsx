import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent Chat | thelaunch.space",
  robots: { index: false, follow: false },
};

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-dvh w-full overflow-hidden bg-[#F5F5F0] pwa-bottom-pad">
      {children}
    </div>
  );
}
