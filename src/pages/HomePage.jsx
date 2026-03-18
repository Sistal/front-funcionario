import { useState, useEffect } from "react";
import Hero from "../components/hero/Hero";
import HomeLayout from "../views/HomeLayout";
import { getDashboardStats, getMyProfile } from "../api/funcionario.api";

const defaultHeroData = {
  title: "Temporada de uniformes 2025",
  subtitle: "Revisa tus solicitudes y asegúrate de tener tus tallas actualizadas",
  primary: { label: "Solicitar uniforme" },
  secondary: { label: "Ver calendario de entregas" },
  svgPaths: {
    p1d405500: "M8 3.33333L12.6667 8L8 12.6667",
    p3ee34580: "M12.6667 2.66667H3.33333C2.59695 2.66667 2 3.26362 2 4V13.3333C2 14.0697 2.59695 14.6667 3.33333 14.6667H12.6667C13.403 14.6667 14 14.0697 14 13.3333V4C14 3.26362 13.403 2.66667 12.6667 2.66667Z"
  }
};

export default function HomePage(){
  const [dashboardData, setDashboardData] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      setLoading(true);
      const [statsData, profileData] = await Promise.all([
        getDashboardStats(),
        getMyProfile()
      ]);
      
      setDashboardData(statsData);
      setProfile(profileData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="space-y-6 w-full min-[1400px]:w-[90%] min-[1400px]:mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-4 text-sm text-gray-600">Cargando datos...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
      <main className="space-y-6 w-full min-[1400px]:w-[90%] min-[1400px]:mx-auto">
          <Hero data={defaultHeroData}/>
          <HomeLayout 
            dashboardData={dashboardData} 
            profile={profile}
          />
      </main>
  );
}
