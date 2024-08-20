import { Link } from "react-router-dom";

function Categories() {
  return (
    <div className="container mx-auto">
      <section className="py-8 px-20">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold">دسته بندی</h2>
          <button className="border-b-2">
            <Link to="/products">همه محصولات</Link>
          </button>
        </div>
        <div className="flex justify-between items-center mt-8">
          <div className="w-[300px] overflow-hidden rounded">
            <img src="index/men.jpg" alt="کفش مرد" />
          </div>
          <div className="w-[300px] overflow-hidden rounded">
            <img src="index/women.jpg" alt="کفش زن" />
          </div>
          <div className="w-[300px] overflow-hidden rounded">
            <img src="index/kids.jpg" alt="کفش بچه" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Categories;
