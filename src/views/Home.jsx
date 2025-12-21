import Hero from "../components/Hero";
import HomeLayout from "./HomeLayout";
import data from "../data/home.json";

export default function Home() {
  return (
      <main className="space-y-6 w-full min-[1400px]:w-[80%] min-[1400px]:mx-auto">
          <Hero data={data.hero}/>
          <HomeLayout data={data}/>
      </main>
  );
}
