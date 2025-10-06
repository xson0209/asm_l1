import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import db from "../../db.json";

type Product = { id: number; title: string; description: string; image: string; price: number };
type Root = { products: Product[] };

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const data = (db as Root).products ?? [];
    const found = data.find(p => String(p.id) === String(id));
    setProduct(found ?? null);
  }, [id]);

  if (!product) return <p>Đang tải hoặc không tìm thấy sản phẩm.</p>;

  return (
    <div className="row">
      <div className="col-md-6">
        <img src={product.image} className="img-fluid rounded" alt={product.title} />
      </div>
      <div className="col-md-6">
        <h3 className="mb-3">{product.title}</h3>
        <p className="lead">{product.description}</p>
        <h4 className="text-danger mb-4">${product.price}</h4>
        <div className="d-flex gap-2">
          <button className="btn btn-primary">Mua ngay</button>
          <button className="btn btn-outline-success">Add cart</button>
          <Link to="/product" className="btn btn-secondary">Quay lại</Link>
        </div>
      </div>
    </div>
  );
}
