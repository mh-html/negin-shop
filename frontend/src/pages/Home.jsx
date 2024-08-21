import { Hero, AboutUs, Categories } from "../components";
function Home() {
  return (
    <div className="bg-gray-300">
      <Hero />
      <AboutUs />
      <Categories />
    </div>
  );
}

export default Home;
