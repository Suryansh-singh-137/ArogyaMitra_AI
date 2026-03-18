import AppSidebar from "@/components/Appsidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col md:flex-row min-h-screen w-screen overflow-x-clip"
      style={{ background: "#f0eada" }}
    >
      <AppSidebar isOnline={true} />
      <main className="flex-1 min-w-0 w-full overflow-x-clip">
        {children}
      </main>
    </div>
  );
}
