import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {

  const baseUrl = "https://cjabendan.is-a.dev";

  
  const routes = ["", "/certifications", "/recommend", "/tech-stack"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly", 
    priority: route === "" ? 1.0 : 0.8,
  }));
}