import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [q, setQ] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQ(params.get("q") ?? "");
  }, [location.pathname, location.search]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = q.trim();
    if (v) navigate(`/product?q=${encodeURIComponent(v)}`);
    else navigate("/product");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">Trang chủ</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="nav" className="collapse navbar-collapse show">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><Link className="nav-link" to="/product">Sản phẩm</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/news">Tin tức</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            </ul>
            <form className="d-flex" onSubmit={submit}>
              <input className="form-control me-2" placeholder="Tìm sản phẩm..." value={q} onChange={e => setQ(e.target.value)} />
              <button className="btn btn-light" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
      <div className="container my-4">
        <Outlet />
      </div>
    </>
  );
}
