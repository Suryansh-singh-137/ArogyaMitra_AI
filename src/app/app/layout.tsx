import AppSidebar from "@/components/Appsidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex min-h-screen w-screen overflow-x-hidden"
      style={{ background: "#f0eada" }}
    >
      <AppSidebar isOnline={true} />
      <main className="flex-1 min-w-0 w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
