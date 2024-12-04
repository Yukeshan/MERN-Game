import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader } from "lucide-react"; // Import the Loader from lucide-react

function MathNews() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://newsapi.org/v2/everything?q=mathematics&apiKey=8cda2c4ce2274593ba1409130167a033"
        );
        setArticles(response.data.articles);
        setLoading(false);
      } catch (err) {
        setError("Error fetching news");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Mathematics News</h1>

      {/* Show loader while fetching data */}
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <Loader className="size-10 animate-spin" />
        </div>
      )}

      {/* Show error message if there is an error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display articles once the data is loaded */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div key={index} className="card bg-white shadow-md rounded-lg p-4">
              <img
                src={article.urlToImage || "https://via.placeholder.com/150"}
                alt={article.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-gray-700 text-sm">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 mt-2 block"
              >
                Read more
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MathNews;
