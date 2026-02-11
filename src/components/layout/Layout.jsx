import Sidebar from "../navigation/Sidebar";
import Header from "../layout/Header";
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        <main className="p-6 pt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

