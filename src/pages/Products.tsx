import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import db from "../../db.json";

type Product = { id: number; title: string; description: string; image: string; price: number };
type Root = { products: Product[] };

export default function Products() {
  const [all, setAll] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState<string>(searchParams.get("q") ?? "");
  const [search, setSearch] = useState<string>(searchParams.get("q") ?? "");
  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    const data = (db as Root).products ?? [];
    setAll(data);
  }, []);

  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    setSearchInput(q);
    setSearch(q);
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    const t = setTimeout(() => {
      const q = searchInput.trim();
      setSearch(q);
      if (q) setSearchParams({ q });
      else setSearchParams({});
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [searchInput, setSearchParams]);

  const filtered = useMemo(
    () => all.filter(p => p.title.toLowerCase().includes(search.toLowerCase())),
    [all, search]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const start = (page - 1) * perPage;
  const current = filtered.slice(start, start + perPage);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  return (
    <div>
      <h2 className="mb-3">Danh sách Products</h2>
      <div className="mb-3">
        <input className="form-control" placeholder="Tìm kiếm sản phẩm..." value={searchInput} onChange={e => setSearchInput(e.target.value)} />
      </div>
      <div className="row g-3">
        {current.map(p => (
          <div className="col-md-3" key={p.id}>
            <div className="card h-100">
              <img src={p.image} className="card-img-top" alt={p.title} />
              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text text-truncate">{p.description}</p>
                <div className="d-flex gap-2">
                  <Link to={`/product/${p.id}`} className="btn btn-primary">Mua ngay</Link>
                  <button className="btn btn-outline-success">Add cart</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {current.length === 0 && <p className="text-muted">Không có sản phẩm phù hợp.</p>}
      </div>
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <li key={n} className={`page-item ${page === n ? "active" : ""}`}>
              <button className="page-link" onClick={() => setPage(n)}>{n}</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
