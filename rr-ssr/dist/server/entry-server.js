import * as jsxRuntime from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { Link, Routes, Route } from "react-router-dom";
import axios from "axios";
const jsx = jsxRuntime.jsx;
const jsxs = jsxRuntime.jsxs;
function Home() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Welcome to React Router SSR Example" }),
    /* @__PURE__ */ jsx("p", { children: "This is a server-side rendered React application using React Router." }),
    /* @__PURE__ */ jsx("p", { children: "Navigate to other pages using the links above." }),
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Home" }),
        ": This page"
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("strong", { children: "About" }),
        ": Information about this application"
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("strong", { children: "API Data" }),
        ": Demonstrates external API fetching with server load simulation"
      ] })
    ] })
  ] });
}
function About() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "About This Application" }),
    /* @__PURE__ */ jsx("p", { children: "This is a React Router Server-Side Rendering (SSR) example application." }),
    /* @__PURE__ */ jsx("h2", { children: "Features:" }),
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: "Server-side rendering with React Router" }),
      /* @__PURE__ */ jsx("li", { children: "Express.js backend server" }),
      /* @__PURE__ */ jsx("li", { children: "External API integration for load simulation" }),
      /* @__PURE__ */ jsx("li", { children: "Docker containerization support" }),
      /* @__PURE__ */ jsx("li", { children: "Memory monitoring capabilities" })
    ] }),
    /* @__PURE__ */ jsx("h2", { children: "Technology Stack:" }),
    /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: "React 18" }),
      /* @__PURE__ */ jsx("li", { children: "React Router 6" }),
      /* @__PURE__ */ jsx("li", { children: "Express.js" }),
      /* @__PURE__ */ jsx("li", { children: "Vite (build tool)" }),
      /* @__PURE__ */ jsx("li", { children: "Axios (HTTP client)" })
    ] })
  ] });
}
function ApiData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5");
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleRefresh = () => {
    fetchData();
  };
  if (loading) {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { children: "API Data" }),
      /* @__PURE__ */ jsx("p", { children: "Loading external data..." })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { children: "API Data" }),
      /* @__PURE__ */ jsxs("p", { style: { color: "red" }, children: [
        "Error: ",
        error
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: handleRefresh, children: "Retry" })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "API Data" }),
    /* @__PURE__ */ jsx("p", { children: "Data fetched from JSONPlaceholder API (simulating server load):" }),
    /* @__PURE__ */ jsx("button", { onClick: handleRefresh, style: { marginBottom: "20px" }, children: "Refresh Data" }),
    /* @__PURE__ */ jsx("div", { children: data && data.map((post) => /* @__PURE__ */ jsxs("div", { style: {
      border: "1px solid #ddd",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "5px"
    }, children: [
      /* @__PURE__ */ jsxs("h3", { children: [
        "Post #",
        post.id,
        ": ",
        post.title
      ] }),
      /* @__PURE__ */ jsx("p", { children: post.body }),
      /* @__PURE__ */ jsxs("small", { children: [
        "User ID: ",
        post.userId
      ] })
    ] }, post.id)) })
  ] });
}
function Navigation() {
  const navStyle = {
    background: "#f0f0f0",
    padding: "10px",
    marginBottom: "20px"
  };
  const linkStyle = {
    marginRight: "20px",
    textDecoration: "none",
    color: "#007bff"
  };
  return /* @__PURE__ */ jsxs("nav", { style: navStyle, children: [
    /* @__PURE__ */ jsx(Link, { to: "/", style: linkStyle, children: "Home" }),
    /* @__PURE__ */ jsx(Link, { to: "/about", style: linkStyle, children: "About" }),
    /* @__PURE__ */ jsx(Link, { to: "/api-data", style: linkStyle, children: "API Data" })
  ] });
}
function App() {
  return /* @__PURE__ */ jsxs("div", { className: "app", children: [
    /* @__PURE__ */ jsx(Navigation, {}),
    /* @__PURE__ */ jsx("main", { style: { padding: "20px" }, children: /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/about", element: /* @__PURE__ */ jsx(About, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/api-data", element: /* @__PURE__ */ jsx(ApiData, {}) })
    ] }) })
  ] });
}
function render(url) {
  const html = renderToString(
    /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(App, {}) })
  );
  return { html };
}
export {
  render
};
