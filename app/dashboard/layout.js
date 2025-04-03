import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
