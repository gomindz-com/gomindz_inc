const projects = [
  { id: "p1", title: "Demand Forecasting Platform", desc: "Time-series forecasting for retail inventory using LSTM & Prophet.", category: "data", img: "/images/home-dsb.webp", link: "#", tags: ["LSTM", "Prophet", "Python"] },
  { id: "p2", title: "AI-Powered Chat Assistant", desc: "Conversational AI for customer support integrated with analytics.", category: "ai", img: "/images/home-dsb.webp", link: "#", tags: ["NLP", "Transformers", "TensorFlow"] },
  { id: "p3", title: "Healthcare Data Pipeline", desc: "HIPAA-compliant ETL pipeline with secure analytics for clinicians.", category: "data", img: "/images/home-dsb.webp", link: "#", tags: ["Apache Spark", "Airflow", "AWS"] },
  { id: "p4", title: "FinTech Microservices Platform", desc: "Event-driven microservices with real-time payment processing.", category: "sw", img: "/images/home-dsb.webp", link: "#", tags: ["Kubernetes", "Docker", "gRPC"] },
  { id: "p5", title: "Computer Vision Quality Control", desc: "CNN-based visual inspection achieving 98% defect detection accuracy.", category: "ai", img: "/images/home-dsb.webp", link: "#", tags: ["CNN", "OpenCV", "PyTorch"] },
  { id: "p6", title: "Customer Analytics Dashboard", desc: "Interactive BI dashboard with cohort analysis and segmentation.", category: "data", img: "/images/home-dsb.webp", link: "https://academy.gomindz.gm/index.html", tags: ["Tableau", "D3.js", "SQL"] },
  { id: "p7", title: "AI-Powered Recommendation System", desc: "Personalized recommendations for e-commerce boosting sales by 20%.", category: "ai", img: "/images/home-dsb.webp", link: "https://academy.gomindz.gm/", tags: ["Matrix Factorization", "Scikit-Learn", "Python"] }
];

const grid = document.getElementById("grid");
const filterGroup = document.querySelector(".filter-group");
const emptyEl = document.getElementById("empty");
const yearEl = document.getElementById("year");

// Small utility for element creation
function el(tag, attrs = {}, children = []) {
  const element = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") element.className = v;
    else if (k === "html") element.innerHTML = v;
    else element.setAttribute(k, v);
  });
  children.forEach(child => element.appendChild(child));
  return element;
}

// Create card DOM
function createCard(p) {
  const tags = el("div", { class: "card-tags" },
    p.tags.map(tag => el("span", { class: "tag", html: tag }))
  );

  return el("article", { class: "card", "data-category": p.category }, [
    el("img", { src: p.img, alt: p.title, class: "card-media", loading: "lazy" }),
    el("div", { class: "card-body" }, [
      el("h3", { html: p.title }),
      el("p", { class: "desc", html: p.desc }),
      tags,
      el("div", { class: "card-footer" }, [
        el("a", { href: p.link, target: "_blank", rel: "noopener", class: "btn", html: "View Project" })
      ])
    ])
  ]);
}

// Render efficiently
function render(list) {
  grid.innerHTML = "";
  if (!list.length) {
    emptyEl.style.display = "block";
    return;
  }
  emptyEl.style.display = "none";

  const frag = document.createDocumentFragment();
  list.forEach(p => frag.appendChild(createCard(p)));
  grid.appendChild(frag);
}

// Filter handler
function applyFilters(filter) {
  const filtered = filter === "all" ? projects : projects.filter(p => p.category === filter);
  render(filtered);
}

// Event delegation for filter buttons
filterGroup.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;

  // Reset aria-pressed states
  filterGroup.querySelectorAll(".filter-btn").forEach(b => b.setAttribute("aria-pressed", "false"));
  btn.setAttribute("aria-pressed", "true");

  applyFilters(btn.dataset.filter);
});

// Init
yearEl.textContent = new Date().getFullYear();
applyFilters("all");
