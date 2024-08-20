import Hero from "../components/Hero";
import AboutUs from "../components/AboutUs";
import Categories from "../components/Categories";

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
