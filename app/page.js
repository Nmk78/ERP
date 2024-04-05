import Image from "next/image";
import SideBar from "./__components/SideBar";
import DashBoard from "./__components/DashBoard";

export default function Home() {
  return (
    <section id="dashboard" className="flex min-w-[80%] h-full">
      <DashBoard />
    </section>
  )
}
