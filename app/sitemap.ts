export default function sitemap() {
  const baseUrl = "https://yourdomain.com";

  let sizes = Array.from({ length: 100 }, (_, i) => `${(i + 1) * 10}kb`);
  const moresizes = [
    "200kb","300kb","400kb", "500kb", "600kb","1mb"
  ];

  sizes.push(...moresizes);
  const imagePages = sizes.map((size) => ({
    url: `${baseUrl}/compress-image-to-${size}`,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const pdfPages = sizes.map((size) => ({
    url: `${baseUrl}/compress-pdf-to-${size}`,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  return [
    { url: baseUrl, priority: 1 },
    ...imagePages,
    ...pdfPages,
  ];
}