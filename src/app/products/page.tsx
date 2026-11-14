"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { api, type ProductFilters } from "@/lib/api";
import { useApi } from "@/lib/use-api";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import productBreadcrumb from "../../../public/assets/images/breadcrumb.webp";

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const subcategory = searchParams.get("subcategory") || "";
  const pageParam = Number(searchParams.get("page") || 1);
  const page = Number.isFinite(pageParam) && pageParam > 0 ? Math.floor(pageParam) : 1;
  const [sort, setSort] = useState<ProductFilters["sort"]>("latest");

  const { data: subcategories, loading: loadingSubcategories, error: subcategoriesError } = useApi(
    () => api.subcategories(category || undefined), [category]
  );
  const filters = useMemo<ProductFilters>(() => ({
    ...(category ? { category } : {}),
    ...(category && subcategory ? { subcategory } : {}),
    sort, page, per_page: 12,
  }), [category, subcategory, sort, page]);
  const { data: products, meta, loading: loadingProducts, error: productsError } = useApi(
    () => api.products(filters), [category, subcategory, sort, page]
  );

  // Clear any previous category's subcategory selection when navigating to another category.
  const setFilters = (nextCategory: string, nextSubcategory = "", nextPage = 1) => {
    const params = new URLSearchParams();
    if (nextCategory) params.set("category", nextCategory);
    if (nextCategory && nextSubcategory) params.set("subcategory", nextSubcategory);
    if (nextPage > 1) params.set("page", String(nextPage));
    router.push(`/products${params.size ? `?${params.toString()}` : ""}`);
  };
  // The endpoint already filters by category when a category slug is supplied.
  const filteredSubcategories = subcategories || [];
  const activeCategory = category ? filteredSubcategories[0]?.category : undefined;
  const activeSubcategory = filteredSubcategories.find(c => c.slug === subcategory);

  return (
    <>
      <Breadcrumb title="Products" image={productBreadcrumb.src} items={[{ label: "Products" }]} />
      <section className="product-listing-section">
        <div className="product-listing-container">
          <div className="product-listing-main">
            <div className="product-listing-heading">
              <div>
                <span className="product-listing-small-title">Our Products</span>
                <h2>Explore Our <strong>Products</strong></h2>
                {(activeCategory || activeSubcategory) && (
                  <p>{[activeCategory?.name, activeSubcategory?.name].filter(Boolean).join(" / ")}</p>
                )}
              </div>
            </div>
            {/* <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
              <select aria-label="Sort products" value={sort} onChange={e => { setSort(e.target.value as ProductFilters["sort"]); setFilters(category, subcategory); }} style={{padding:10,border:"1px solid #ddd"}}>
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="name_asc">Name A–Z</option>
                <option value="name_desc">Name Z–A</option>
              </select>
            </div> */}
            {loadingProducts ? <p>Loading products...</p> : productsError ? <p role="alert">{productsError}</p> : products?.length ? (
              <>
                <div className="product-listing-grid">
                  {products.map(product => (
                    <div className="product-listing-card" key={product.id}>
                      <Link href={`/productdetail?slug=${encodeURIComponent(product.slug)}`} className="product-listing-image">
                        {product.image_url && <img src={product.image_url} alt={product.name} onError={e => { e.currentTarget.style.display = "none"; }} />}
                        <span className="product-listing-corner product-listing-corner-top" />
                        <span className="product-listing-corner product-listing-corner-bottom" />
                      </Link>
                      <div className="product-listing-content">
                        <h3><Link href={`/productdetail?slug=${encodeURIComponent(product.slug)}`}>{product.name}</Link></h3>
                        <Link href={`/productdetail?slug=${encodeURIComponent(product.slug)}`} className="product-listing-btn"><span>View More</span><i className="bi bi-arrow-right" /></Link>
                      </div>
                    </div>
                  ))}
                </div>
                {(meta?.last_page || 1) > 1 && (
                  <nav aria-label="Product pagination" style={{display:"flex",gap:12,alignItems:"center",marginTop:24}}>
                    <button type="button" disabled={page <= 1} onClick={()=>setFilters(category,subcategory,page-1)}>Previous</button>
                    <span>Page {meta?.current_page} of {meta?.last_page}</span>
                    <button type="button" disabled={page >= (meta?.last_page || 1)} onClick={()=>setFilters(category,subcategory,page+1)}>Next</button>
                  </nav>
                )}
              </>
            ) : <div className="product-empty"><span>00</span><h3>No Products Found</h3><p>No products are available for this selection.</p></div>}
          </div>
          <aside className="product-category-sidebar">
            <div className="product-category-panel">
              <div className="product-category-heading"><h3>Product Subcategories</h3></div>
              <div className="product-category-list">
                <button type="button" className={`product-category-item ${!subcategory ? "active" : ""}`} onClick={() => setFilters(category)}>
                  <span>All Products</span>
                </button>
                {loadingSubcategories && <p>Loading subcategories...</p>}
                {subcategoriesError && <p role="alert">{subcategoriesError}</p>}
                {filteredSubcategories.map(item => (
                  <button type="button" key={item.id} className={`product-category-item ${subcategory === item.slug ? "active" : ""}`}
                    onClick={() => setFilters(item.category?.slug || category, item.slug)}>
                    <span>{item.name}</span>
                    {typeof item.products_count === "number" && <small>{item.products_count}</small>}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}


// A Suspense boundary is required for useSearchParams during static export.
export default function ProductsPage() {
  return <Suspense fallback={<div className="container py-5">Loading products...</div>}><ProductsContent /></Suspense>;
}
