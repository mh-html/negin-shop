import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <div className="container mx-auto">
      <section className="py-8 px-20">
        <div className="flex justify-between items-center gap-4">
          <div className="w-[300px] overflow-hidden rounded shadow-lg">
            <img src="index/about1.jpg" alt="کفش" />
          </div>
          <div className="w-[300px] overflow-hidden rounded shadow-lg">
            <img src="index/about2.jpg" alt="کفش" />
          </div>
          <div className="w-[300px] overflow-hidden rounded shadow-lg">
            <img src="index/about3.jpg" alt="کفش" />
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-3xl font-bold">درباره ما</h2>
          <p className="text-3xl my-4 font-bold">
            ما بهترین کفش هارا برای شما فراهم کرده ایم
          </p>
          <p className="text-lg text-gray-700">
            شما می توانید بهترین کفش هارا با کیفیت بالا و قیمت بسیار مناسب از
            سایت ما فراهم کنید. کافیست از سایت ما دیدن کنید.
          </p>
          <button className="p-4 bg-emerald-600 rounded text-white mt-8">
            <Link>دیدن محصولات</Link>
          </button>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
