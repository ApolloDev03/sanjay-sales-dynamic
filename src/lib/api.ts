// import axios from "axios";

// export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://getdemo.in/sanjay_sales/api/").replace(/\/+$/, "") + "/";

// export const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 20000,
//   headers: { "Content-Type": "application/json", Accept: "application/json" },
// });

// export interface ApiResponse<T> {
//   success: boolean;
//   message: string;
//   data: T;
//   meta?: { current_page: number; per_page: number; total: number; last_page: number; from: number | null; to: number | null };
// }
// export async function apiPost<T>(endpoint: string, body: Record<string, unknown> = {}): Promise<ApiResponse<T>> {
//   const { data } = await apiClient.post<ApiResponse<T>>(endpoint.replace(/^\/+/, ""), body);
//   if (!data.success) throw new Error(data.message || "API request failed");
//   return data;
// }
// export const api = {
//   settings: () => apiPost<SiteSettings>("settings"),
//   home: () => apiPost<HomeData>("home"),
//   categories: () => apiPost<Category[]>("categories"),
//   categoryDetail: (slug: string) => apiPost<Category>("categories/detail", { slug }),
//   subcategories: (category?: string | number) => apiPost<Subcategory[]>("subcategories", category === undefined ? {} : { category }),
//   subcategoryDetail: (category: string, slug: string) => apiPost<Subcategory>("subcategories/detail", { category, slug }),
//   products: (filters: ProductFilters = {}) => apiPost<Product[]>("products", filters),
//   productDetail: (slug: string) => apiPost<{ product: ProductDetail; related_products: Product[] }>("products/detail", { slug }),
//   blogs: (filters: { q?: string; page?: number; per_page?: number } = {}) => apiPost<Blog[]>("blogs", filters),
//   blogDetail: (slug: string) => apiPost<{ blog: BlogDetail; recent_posts: Blog[] }>("blogs/detail", { slug }),
//   gallery: () => apiPost<GalleryItem[]>("gallery"),
//   videos: () => apiPost<VideoItem[]>("videos"),
//   clients: () => apiPost<Client[]>("clients"),
//   catalogues: () => apiPost<Catalogue[]>("catalogues"),
//   inquiry: (payload: InquiryPayload) => apiPost<unknown>("inquiries", { ...payload, website: "" }),
//   seo: (page: SeoPage, extra: Record<string, unknown> = {}) => apiPost<SeoData>("seo", { page, ...extra }),
// };
// export type Category = { id: number; name: string; slug: string; description?: string | null; image_url?: string | null; products_count?: number; subcategories?: Subcategory[] };
// export type Subcategory = Category & { category_id?: number; category?: Category };
// export type Product = { id: number; name: string; slug: string; image_url?: string | null; brand?: string | null; price?: string | null; short_description?: string | null; featured?: boolean; category?: Category | null; subcategory?: Subcategory | null };
// export type ProductDetail = Product & { description?: string; images?: { id: number; url: string }[]; features?: string[]; applications?: string[]; specifications?: { group: string; items: { label: string; value: string }[] }[]; faqs?: { question: string; answer: string }[] };
// export type Blog = { id: number; title: string; slug: string; excerpt?: string; image_url?: string; author?: string; published_at?: string; published_date?: string };
// export type BlogDetail = Blog & { content?: string; meta_title?: string; meta_description?: string };
// export type GalleryItem = { id: number; title: string; image_url: string };
// export type VideoItem = { id: number; title: string; youtube_url: string; embed_url?: string; thumbnail_url?: string };
// export type Client = { id: number; name: string; image_url: string };
// export type Catalogue = { id: number; title: string; file_url: string; file_type?: string; file_size_label?: string; image_url?: string };
// export type SiteSettings = { name?: string; tagline?: string; contact?: Record<string, unknown>; social?: Record<string,string>; menu_categories?: Category[] };
// export type HomeStat = {
//   label: string;
//   value: number;
//   suffix: string;
// };
// export type HomeData = {
//   hero_slides?: Record<string, unknown>[];
//   about?: Record<string, unknown>;
//   stats?: HomeStat[];
//   categories?: Category[];
//   featured_products?: Product[];
//   clients?: Client[];
//   latest_blogs?: Blog[];
// };
// export type ProductFilters = { category?: string; subcategory?: string; featured?: boolean; q?: string; sort?: "latest" | "oldest" | "name_asc" | "name_desc"; per_page?: number; page?: number };
// export type InquiryPayload = { name: string; email: string; phone: string; message: string; subject?: string; product_id?: number; website?: string };
// export type SeoPage = "home" | "about" | "contact" | "products" | "blogs" | "gallery" | "videos" | "clients" | "download" | "category" | "subcategory" | "product" | "blog";
// export type SeoData = { page: string; site_name?: string; meta_title?: string; meta_description?: string; meta_keywords?: string; canonical_url?: string; robots?: string; og_title?: string; og_description?: string; og_image?: string; og_type?: string };



import axios from "axios";

export const API_BASE_URL =
  (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://getdemo.in/sanjay_sales/api/"
  ).replace(/\/+$/, "") + "/";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number | null;
    to: number | null;
  };
}

export async function apiPost<T>(
  endpoint: string,
  body: Record<string, unknown> = {}
): Promise<ApiResponse<T>> {
  const { data } = await apiClient.post<ApiResponse<T>>(
    endpoint.replace(/^\/+/, ""),
    body
  );

  if (!data.success) {
    throw new Error(data.message || "API request failed");
  }

  return data;
}

/* ==========================================
   API METHODS
========================================== */

export const api = {
  settings: () =>
    apiPost<SiteSettings>("settings"),

  home: () =>
    apiPost<HomeData>("home"),

  categories: () =>
    apiPost<Category[]>("categories"),

  categoryDetail: (slug: string) =>
    apiPost<Category>("categories/detail", { slug }),

  subcategories: (category?: string | number) =>
    apiPost<Subcategory[]>(
      "subcategories",
      category === undefined ? {} : { category }
    ),

  subcategoryDetail: (category: string, slug: string) =>
    apiPost<Subcategory>("subcategories/detail", {
      category,
      slug,
    }),

  products: (filters: ProductFilters = {}) =>
    apiPost<Product[]>("products", filters),

  productDetail: (slug: string) =>
    apiPost<ProductDetailResponse>("products/detail", {
      slug,
    }),

  blogs: (
    filters: {
      q?: string;
      page?: number;
      per_page?: number;
    } = {}
  ) =>
    apiPost<Blog[]>("blogs", filters),

  blogDetail: (slug: string) =>
    apiPost<{
      blog: BlogDetail;
      recent_posts: Blog[];
    }>("blogs/detail", { slug }),

  gallery: () =>
    apiPost<GalleryItem[]>("gallery"),

  videos: () =>
    apiPost<VideoItem[]>("videos"),

  clients: () =>
    apiPost<Client[]>("clients"),

  catalogues: () =>
    apiPost<Catalogue[]>("catalogues"),

  inquiry: (payload: InquiryPayload) =>
    apiPost<unknown>("inquiries", {
      ...payload,
      website: "",
    }),

  seo: (
    page: SeoPage,
    extra: Record<string, unknown> = {}
  ) =>
    apiPost<SeoData>("seo", {
      page,
      ...extra,
    }),
};

/* ==========================================
   CATEGORY TYPES
========================================== */

export type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  products_count?: number;
  subcategories?: Subcategory[];
};

export type Subcategory = Category & {
  category_id?: number;
  category?: Category;
};

/* ==========================================
   PRODUCT TYPES
========================================== */

export type Product = {
  id: number;
  name: string;
  slug: string;
  image_url?: string | null;
  brand?: string | null;
  price?: string | null;
  short_description?: string | null;
  short_description_text?: string | null;
  featured?: boolean;
  category?: Category | null;
  subcategory?: Subcategory | null;
};

export type ProductImage = {
  id: number;
  url: string;
};

export type ProductSpecificationItem = {
  label: string;
  value: string;
};

export type ProductSpecificationGroup = {
  group: string;
  items: ProductSpecificationItem[];
};

export type ProductFaq = {
  id: number;
  question: string;
  answer: string;
};

export type ProductDetail = Product & {
  description?: string | null;

  images?: ProductImage[];

  // API returns HTML strings, not arrays
  features?: string | null;
  applications?: string | null;

  specifications?: ProductSpecificationGroup[];

  faqs?: ProductFaq[];

  updated_at?: string | null;
};

export type ProductDetailResponse = {
  product: ProductDetail;
  related_products: Product[];
};

/* ==========================================
   BLOG TYPES
========================================== */

export type Blog = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  image_url?: string;
  author?: string;
  published_at?: string;
  published_date?: string;
};

export type BlogDetail = Blog & {
  content?: string;
  meta_title?: string;
  meta_description?: string;
};

/* ==========================================
   GALLERY / VIDEO / CLIENT
========================================== */

export type GalleryItem = {
  id: number;
  title: string;
  image_url: string;
};

export type VideoItem = {
  id: number;
  title: string;
  youtube_url: string;
  embed_url?: string;
  thumbnail_url?: string;
};

export type Client = {
  id: number;
  name: string;
  image_url: string;
};

export type Catalogue = {
    id: number;
    title: string;
    file_url: string;
    file_type: string;
    file_size: number;
    file_size_label: string;
    image_url: string | null;
};

/* ==========================================
   SETTINGS / HOME
========================================== */

export type SiteSettings = {
  name?: string;
  tagline?: string;
  contact?: Record<string, unknown>;
  social?: Record<string, string>;
  menu_categories?: Category[];
};

export type HomeStat = {
  label: string;
  value: number;
  suffix: string;
};

export type HomeData = {
  hero_slides?: Record<string, unknown>[];
  about?: Record<string, unknown>;
  stats?: HomeStat[];
  categories?: Category[];
  featured_products?: Product[];
  clients?: Client[];
  latest_blogs?: Blog[];
};

/* ==========================================
   FILTER / INQUIRY / SEO
========================================== */

export type ProductFilters = {
  category?: string;
  subcategory?: string;
  featured?: boolean;
  q?: string;
  sort?: "latest" | "oldest" | "name_asc" | "name_desc";
  per_page?: number;
  page?: number;
};

export type InquiryPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
  subject?: string;
  product_id?: number;
  website?: string;
};

export type SeoPage =
  | "home"
  | "about"
  | "contact"
  | "products"
  | "blogs"
  | "gallery"
  | "videos"
  | "clients"
  | "download"
  | "category"
  | "subcategory"
  | "product"
  | "blog";

export type SeoData = {
  page: string;
  site_name?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  canonical_url?: string;
  robots?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  og_type?: string;
};
