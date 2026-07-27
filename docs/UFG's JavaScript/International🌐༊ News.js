const articles = [
 {
    category: "Crypto",
    title: "Bitcoin Market Shows Strong Institutional Interest",
    summary: "Analysts report continued adoption by institutions across global markets.",
    source: "CoinDesk",
    date: "Today",
    image: "../UFG Image Asset Warehouse/Breaking News.png",
    link: "#"
  },

  {
    category: "Blockchain",
    title: "Ethereum Network Receives Major Upgrade",
    summary: "Developers announce improvements focused on scalability and network efficiency.",
    source: "Ethereum.org",
    date: "Today",
    image: "../UFG Image Asset Warehouse/Breaking News.png",
    link: "#"
  },
  
  {
    category: "AI",
    title: "OpenAI Introduces New AI Model",
    summary: "A brief summary of the latest development in artificial intelligence.",
    source: "OpenAI",
    date: "Today",
    image: "../UFG Image Asset Warehouse/Breaking News.png",
    link: "#"
  }
];

const News_Query = [
  "Technology",
  "Science",
  "Innovation"
].join(" OR ");

const News_Keywords = [
  "Artificial Intelligence",
  "Machine Learning",
  "OpenAI",
  "Blockchain",
  "Bitcoin",
  "Ethereum",
  "Crypto Regulation",
  "Web3",
  "Cybersecurity",
  "Quantum Computing",
  "Semiconductor",
  "Cloud Computing"
];

// API Key🔑
const News_Api_Url = `https://***/api/v4/search?q=${encodeURIComponent(News_Query)}&lang=en&max=10&apikey=***`;
// 🔒

window.addEventListener("DOMContentLoaded", () => {
  const developmentsGrid = document.querySelector(".developments-grid");
  
  if (!developmentsGrid) {
    console.error("Please find container .developments-grid which is not found.");
    return;
  }
  
  const Mobile_Limit = 1;
  const Desktop_Limit = 3;
  const articleLimit = window.innerWidth <= 768 ? Mobile_Limit : Desktop_Limit;
  
  function renderArticles(data) {
    developmentsGrid.innerHTML = "";
    data.forEach(article => {
      const card = document.createElement("article");
      card.className = "card-page";
      
      card.innerHTML = `
        <div class="article-thumbnail">
          <img
            src="${article.image}"
            alt="${article.title}"
            loading="lazy"
            decoding="async">
        </div>
         
        <span class="network-category">
          ${article.category}
        </span>
         
        <h3>${article.title}</h3>
        <p>${article.summary}</p>
         
        <div class="article-meta">
          <span>Source: ${article.source}</span>
          <span>${article.date}</span>
        </div>
         
        <a href="${article.link}" target="_blank" rel="noopener noreferrer">
          Read Full Article
        </a>
        `;
        
      developmentsGrid.appendChild(card);
    });
  }
  
  async function loadNews() {
    try {
      
      const response = await fetch(News_Api_Url);
      if (!response.ok) {
        throw new Error("Failed to fetch news.");
      }
      const result = await response.json();
      const apiArticles = result.articles ?? [];
      
      console.log("API:", apiArticles.length);
      
      const filteredArticles = apiArticles.filter(article => {
        const text = `${article.title ?? ""} ${article.description ?? ""}`;
        return News_Keywords.some(keyword => text.toLowerCase().includes(keyword.toLowerCase()));
      });
      console.log("Filtered:", filteredArticles.length);
      
      const normalizedArticles = filteredArticles.map(article => ({
        category: article.source?.name ?? "News", title: article.title ?? "Untitled",
        summary: article.description ?? "No description available.", source: article.source?.name ?? "Unknown",
        date: article.publishedAt ?? "Today", image: article.urlToImage ?? "../UFG Image Asset Warehouse/Breaking News.png",
        link: article.url ?? "#"
      }));
      console.log(normalizedArticles);
      
      if (normalizedArticles.length > 0) {
        renderArticles(normalizedArticles.slice(0, articleLimit));
      } else {
        renderArticles(articles.slice(0, articleLimit));
      }
      
    } catch (error) {
      console.error("Failed to load online news:", error);
      renderArticles(articles.slice(0, articleLimit));
    }
  }
  loadNews();
});