import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="p-4">{children}</main>
    </div>
  );
}
