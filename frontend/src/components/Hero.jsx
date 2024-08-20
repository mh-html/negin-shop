import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="h-screen bg-hero bg-no-repeat bg-cover">
      <div className="text-center text-white pt-44">
        <h1 className="text-6xl font-bold">
          فروشگاه کفش نگین - هر کفشی با هر برندی
        </h1>
        <p className="mt-4 font-bold text-3xl">
          سایت ما را به دوستان خود معرفی کنید
        </p>
        <button className="p-4 bg-white text-black rounded mt-8">
          <Link to="/products">دیدن محصولات</Link>
        </button>
      </div>
    </section>
  );
}

export default Hero;
