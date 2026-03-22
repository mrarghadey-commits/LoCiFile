export default function sitemap() {
  const baseUrl = "https://locifile.in";

  let sizes = [
    "10kb", "20kb", "30kb", "40kb", "50kb",
    "60kb", "70kb", "80kb", "90kb", "100kb",
    "120kb", "150kb", "200kb", "250kb", "300kb",
    "400kb","450kb", "500kb", "600kb", "800kb", "1mb", "2mb", "3mb"
  ]
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
    { url: `${baseUrl}/image-compressor` },
    { url: `${baseUrl}/pdf-compressor` },
    { url: `${baseUrl}/image-resizer` },
    ...imagePages,
    ...pdfPages,
  ];
}