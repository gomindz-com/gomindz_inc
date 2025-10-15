const projects = [
  { id: "p4", title: "HR Management System ", desc: "A comprehensive HR management solution to automate core functions such as employee attendance, payroll, and performance tracking, helping organizations improve efficiency and reduce errors.", category: "sw", img: "/images/projects/hr system.png", link: "https://hr.gomindz.gm/", tags: ["Next Js", "Express", "Postgress SQL"] },

  { id: "p8", title: "Gomindz Academy Website", desc: "Designed and developed a responsive and modern website to enhance the Academy's online presence, improve customer engagement, and showcase services with an accessible digital platform allowing students to be able to register and pay both registration and tuition fee online.", category: "sw", img: "/images/projects/academy-site.png", link: "https://academy.gomindz.gm/", tags: ["React", "JavaScript",] },

  { id: "p3", title: "Ministry of Fishries and Water Resources", desc: "Developed an interactive dashboard that provides real-time monitoring of fisheries and water resource data. This solution enables the ministry to track usage, manage resources efficiently, and support policy implementation.", category: "data", img: "/images/projects/ministry of fishries.jpg", link: "#", tags: ["Tableau", "Power Query", "Excel"] },


  { id: "p1", title: "Data Warehouse for Gomindz Academy", desc: "Designed and deployed a unified data warehouse that integrates fragmented data sources such as enrollment, finance, and grading into a single platform. A real-time dashboard was also developed, giving management and faculty on-demand visibility into key metrics for faster decision-making.", category: "data", img: "/images/projects/ga 360 dashboard.png", link: "https://public.tableau.com/app/profile/salieu.jallow/viz/GA_360_Dashboard1/GA360Dashboard?publish=yes", tags: ["Tableau", "SQL", "Python"] },
  
    { id: "p2", title: "Data Portal and Analytics System for NCCRM", desc: "Delivered a secure and user-friendly data portal integrated with an analytics system, enabling the organization to efficiently collect, manage, and analyze critical data for improved reporting and transparency.", category: "sw", img: "/images/projects/nccrm.png", link: "#", tags: ["Next Js", "TypeScript", "Mongo DB"] },

  { id: "p5", title: "AI-Powered Diagnostic Support System for Breast Cancer", desc: "Developed an intelligent diagnostic support tool that leverages AI to assist radiologists and healthcare specialists in identifying potential signs of breast cancer. The system enhances early detection accuracy, reduces workload, and supports better patient outcomes.", category: "ai", img: "/images/projects/brest cancer.png", link: "#", tags: ["Next Js", "Python", "TypeScript"] },

  { id: "p6", title: "National Road Authority Dashboard", desc: "Created a comprehensive dashboard that consolidates data on road networks, maintenance schedules, and infrastructure projects. The tool enhances operational efficiency and provides leadership with clear insights for planning and resource allocation.", category: "data", img: "/images/projects/nra dashboard.jpg", link: "#", tags: ["Tableau", "Excel", "SQL"] },

  { id: "p7", title: "Website for Tendaba", desc: "Designed and developed a responsive and modern website to enhance Tendaba’s online presence, improve customer engagement, and showcase services with an accessible digital platform.", category: "sw", img: "/images/projects/tendaba.png", link: "https://bailodev.github.io/tendaba-site/", tags: ["HTML", "CSS", "JavaScript"] }
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
