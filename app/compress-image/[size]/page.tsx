import CompressorPage from "@/components/CompressorPage";
import { Lock } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = {
    params: Promise<{
        size: string;
    }>;
};

export async function generateStaticParams() {
    const sizes = [
        "10kb", "20kb", "30kb", "40kb", "50kb",
        "60kb", "70kb", "80kb", "90kb", "100kb",
        "120kb", "150kb", "200kb", "250kb", "300kb",
        "400kb", "500kb", "600kb", "800kb", "1mb", "2mb", "3mb"
    ];
    return sizes.map((size) => ({ size }));
}

export async function generateMetadata({ params }: any) {
    let { size } = await params;
    size = (size ?? "").toLowerCase();

    return {
        title: `Compress Image to ${size} Online Free (No Quality Loss)`,
        description: `Reduce image size to ${size}. Fast, free and secure image compressor.`,
        keywords: [
            `compress image to ${size}`,
            `reduce image size to ${size}`,
            `image compressor ${size}`,
            "compress image online free",
            `compress jpg to ${size} online free`,
            `compress png to ${size} online free`,
            `reduce image size under ${size}`,
            `compress image to ${size} for passport`,
            `compress photo to ${size} for aadhaar`,
            `compress jpg to ${size} for ssc form`,
            `reduce image size for upsc form`,
            `compress image for online form upload`,
            `reduce photo size for job application`,
            `compress image for exam form`,
            `best image compressor for ${size}`
        ],
        alternates: {
            canonical: `https://locifile.in/compress-image-to-${size}`,
        },
        openGraph: {
            title: `Compress image to ${size} instantly online.`,
            description: `Compress image to ${size} instantly online.`,
            url: `https://locifile.in/compress-image-to-${size}`,
            siteName: "LoCiFile",
            type: "website",
            images: [
                {
                    url: "https://locifile.in/logo.png",
                    width: 1200,
                    height: 630,
                },
            ],
        }
    };
}

export default async function Page({ params }: Props) {
    const { size } = await params;
    // normalize input
    const raw = (size ?? "").toLowerCase().trim();

    // extract number safely
    let sizeInKB = NaN;

    if (raw.endsWith("kb")) {
        sizeInKB = parseInt(raw.replace("kb", ""), 10);
    } else if (raw.endsWith("mb")) {
        sizeInKB = parseInt(raw.replace("mb", ""), 10) * 1024;
    }
    if (Number.isNaN(sizeInKB)) {
        notFound();
    }
    const faq = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: `How to compress image to ${size} online?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `Upload your image and our tool will automatically compress it to ${size}.`,
                },
            },
            {
                "@type": "Question",
                name: `Is this image compressor private?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `Yes. Images are processed in your browser and never uploaded.`,
                },
            },
            {
                "@type": "Question",
                name: `Can I compress image to ${size} exactly?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `Yes, our tool tries to compress images as close as possible to ${size}.`,
                },
            },
            {
                "@type": "Question",
                name: `Does compressing image to ${size} reduce quality?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `No, we use smart compression to maintain quality when compressing images to ${size}.`,
                },
            },
        ],
    };
    const breadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://locifile.in",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Image Compressor",
                item: "https://locifile.in/image-compressor",
            },
            {
                "@type": "ListItem",
                position: 3,
                name: `Compress Image to ${size} KB`,
                item: `https://locifile.in/compress-image-to-${size}`,
            },
        ],
    };
    const howTo = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: `How to compress image to ${size}`,
        description: `Step by step guide to compress image to ${size}`,
        step: [
            {
                "@type": "HowToStep",
                name: "Upload your image file",
                text: "Upload your image file from your device.",
            },
            {
                "@type": "HowToStep",
                name: `Start Compression`,
                text: `Click compress to reduce image size to ${size}.`,
            },
            {
                "@type": "HowToStep",
                name: "Download compressed Image",
                text: "Download the compressed image instantly.",
            },
        ],
    };
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Image Compressor Tool",
        url: `https://locifile.in/compress-image-to-${size}`,
        applicationCategory: "Utility",
        operatingSystem: "All",
    };
    const structuredData = [
        jsonLd,
        faq,
        breadcrumb,
        howTo
    ];
    return (
        <main>
            {/* Client Tool */}
            <CompressorPage targetSize={sizeInKB} />

            {/* SEO content */}
            <section>
                <div className="lg:px-20 px-5 md:py-5 mb-3 mx-1  pb-4 pt-2 rounded-3xl border border-primary/20">
                    <h2 className=" text-xl underline">Features of Compress Image to {size}</h2>

                    <ul className=" list-disc pl-4 mb-1">
                        <li>Compress image to {size} instantly</li>
                        <li>No quality loss with smart optimization</li>
                        <li>Supports JPG, PNG, WebP</li>
                        <li>100% secure (no upload)</li>
                        <li>Fast browser-based compression</li>
                    </ul>
                    <h2 className=" text-xl underline">How to Compress Image to {size} online?</h2>

                    <ol className=" list-decimal pl-4 mb-2">
                        <li>Upload your image file</li>
                        <li>Start Compression</li>
                        <li>Download compressed  image</li>
                    </ol>
                    <h2 className=" text-xl underline">Compress image to exact {size} online</h2>
                    <p>
                        Our tool tries to compress image to exact {size} as close as possible
                        while maintaining quality. Perfect for passport, exam forms, and uploads.
                    </p>
                    <h2 className=" text-xl mb-0.5 underline">Why Compress Image to {size}?</h2>

                    <ul className=" list-decimal pl-4 mb-1">
                        <li>Upload images to websites with size limits</li>
                        <li>Submit exam and government forms</li>
                        <li>Reduce storage space</li>
                        <li>Improve website performance</li>
                        <li>Share via email or WhatsApp</li>
                    </ul>
                    <h2 className=" text-xl underline">Supported Formats</h2>

                    <p>
                        This tool supports JPG, JPEG, PNG, and WebP images.
                        You can compress any of these formats to {size} easily.
                    </p>
                    <h2 className=" text-xl mb-2 underline">Try other image sizes</h2>

                    <div className="flex flex-wrap gap-2 mb-2 text-sm md:text-base">
                        {["10kb", "20kb", "50kb", "100kb", "150kb", "200kb", "300kb", "500kb", "1mb"].map(s => (
                            <Link key={s} href={`/compress-image-to-${s}`} className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">
                                Compress to {s.toUpperCase()}
                            </Link>
                        ))}
                    </div>
                    <h2 className=" text-xl mb-2 underline">Try our Other popular tools</h2>
                    <div className="flex flex-wrap gap-2 mb-2 text-sm md:text-base">
                        {["image", "pdf"].map(tool => (
                            ["50kb", "100kb", "200kb", "400kb", "1mb"].map(s => (
                                <Link key={s} href={`/compress-${tool}-to-${s}`} className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">
                                    Compress {tool} to {s.toUpperCase()}
                                </Link>
                            ))
                        ))}
                        <Link href={`/pdf-compressor`} className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">
                            Compress PDF
                        </Link>
                        <Link href={`/passport-image-resizer`} className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">
                            Resize Image
                        </Link>
                    </div>
                    <h2 className="mt-2 text-xl font-semibold underline">
                        Common Uses in India
                    </h2>

                    <ul className="list-disc pl-4">
                        <li>UPSC / SSC / Railway exam forms</li>
                        <li>NEET / Jee Main / wbjee form fill up</li>
                        <li>Compitative examinations form fill up</li>
                        <li>Passport & visa applications</li>
                        <li>Aadhaar / PAN card upload</li>
                        <li>Government job portals</li>
                        <li>College admission forms</li>
                    </ul>
                    <h3 className="text-2xl font-bold md:mb-6 mb-3">Frequently Asked Questions</h3>
                    <div className="md:space-y-6 space-y-3">
                        <div>
                            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">How to compress image to {size} online?</h3>
                            <p className="text-slate-400 text-sm">
                                Upload your image and our tool will automatically compress it to {size}.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">Is it really secure?</h3>
                            <p className="text-slate-400 text-sm">Yes. Because we use WebAssembly (WASM), all processing
                                happens locally on your computer. Your data never leaves your browser.</p>
                        </div>
                        <div>
                            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">Can I compress image to {size} exactly?</h3>
                            <p className="text-slate-400 text-sm">
                                Yes, our tool tries to compress images as close as possible to {size}.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">Is this image compressor private?</h3>
                            <p className="text-slate-400 text-sm">Yes. Images are processed in your browser and never uploaded.</p>
                        </div>
                        <div>
                            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">Does compressing image to {size} reduce quality?</h3>
                            <p className="text-slate-400 text-sm">No, we use smart compression to maintain quality when compressing images to {size}.</p>
                        </div>
                        <div>
                            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">Why is it faster than other tools?</h3>
                            <p className="text-slate-400 text-sm">Traditional tools require you to upload your file,
                                wait for server processing, and then download. We skip the network delay entirely.
                            </p>
                        </div>
                        <p className=" flex gap-2 p-2 bg-primary/10 rounded-2xl items-center border border-primary/50"><Lock size={18} /> Your images never leave your device</p>
                    </div>
                    <p className=" mt-1">Try it now for fast and secure compression.</p>
                    <p className=" mt-1">
                        use this free tool to compress image to {size} quickly and securely.
                        Perfect for passport, exam forms, and online uploads.
                    </p>
                </div>
            </section>
            <>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </>
        </main>
    );
}