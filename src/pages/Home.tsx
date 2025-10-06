import { Link } from "react-router-dom";
import db from "../../db.json";

type Product = { id: number; title: string; description: string; image: string; price: number };
type Root = { products: Product[] };

export default function Home() {
  const products: Product[] = (db as Root).products.slice(0, 8);

  return (
    <>
      <section className="hero py-5">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold mb-3">Cửa hàng công nghệ</h1>
              <p className="lead text-white-50 mb-4">Săn deal laptop, điện thoại, phụ kiện chính hãng.</p>
              <div className="d-flex gap-3">
                <Link to="/product" className="btn btn-primary btn-lg">Mua ngay</Link>
                <Link to="/news" className="btn btn-outline-light btn-lg">Xem tin mới</Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="d-flex justify-content-center">
                <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200" alt="hero" className="rounded-4 shadow-lg hero-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-body-tertiary">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h2 className="h3 fw-bold m-0">Sản phẩm nổi bật</h2>
            <Link to="/product" className="btn btn-outline-primary btn-sm">Xem tất cả</Link>
          </div>
          <div className="row g-3">
            {products.map(p => (
              <div className="col-6 col-md-3" key={p.id}>
                <div className="card h-100 rounded-4 shadow-sm">
                  <img src={p.image} className="card-img-top home-card-img" alt={p.title} />
                  <div className="card-body">
                    <h6 className="card-title text-truncate mb-2">{p.title}</h6>
                    <div className="text-danger fw-semibold mb-3">${p.price}</div>
                    <div className="d-flex gap-2">
                      <Link to={`/product/${p.id}`} className="btn btn-primary btn-sm w-100">Chi tiết</Link>
                      <button className="btn btn-outline-success btn-sm w-100">Thêm</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
