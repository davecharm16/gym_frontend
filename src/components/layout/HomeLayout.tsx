import { Outlet } from "react-router-dom";
import FooterLayout from "./FooterLayout";
import Navbar from "../common/navbar/Navbar";
import Sidebar from "../common/sidebar/Sidebar";

export default function HomeLayout() {
  return (
    <div>
        <Navbar />
        <Sidebar />
        <main>
            <Outlet />
        </main>
        <FooterLayout/>
    </div>
  )
}
