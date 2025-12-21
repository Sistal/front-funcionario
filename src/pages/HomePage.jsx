import Hero from "../components/Hero";
import data from "../data/home.json";
import HomeLayout from "../views/HomeLayout";

export default function HomePage(){
  return (
      <main className="space-y-6 w-full min-[1400px]:w-[80%] min-[1400px]:mx-auto">
          <Hero data={data.hero}/>
          <HomeLayout data={data}/>
      </main>
  );
}

