import type { Metadata } from "next";
import CompressorPage from "../../components/CompressorPage";
import { Lock } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Free Image Compressor Online (No Quality Loss) | LoCiFile",
    description:
        "Compress images online without losing quality. Reduce image size instantly. Supports JPG, PNG, WebP.",
    keywords: [
        "image compressor",
        "compress image online",
        "reduce image size",
        "free image compressor",
        "compress image online free",
        "wasm image compressor",
        "compress images online",
        "client side image compression",
        "no upload image compressor",
        "browser image compression",
    ],
    alternates: {
        canonical: "https://locifile.in/image-compressor",
    },
    openGraph: {
        title: `Free Image Compressor Online (No Quality Loss) | LoCiFile`,
        description: `Compress images online without losing quality. Reduce image size instantly. Supports JPG, PNG, WebP.`,
        url: "https://locifile.in/image-compressor",
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

export default async function Page() {
    const faq = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: `How to compress image to a specific size?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `Upload your image and set your target size then compress it instantly using our free tool.`,
                },
            },
            {
                "@type": "Question",
                name: `Does compressing image reduce quality?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: `No, we use smart compression to maintain quality when compressing images.`,
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
        ],
    };
    const howTo = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: `How to compress image`,
        description: `Step by step guide to compress image`,
        step: [
            {
                "@type": "HowToStep",
                name: "Upload your image file",
                text: "Upload your image file from your device.",
            },
            {
                "@type": "HowToStep",
                name: "Set target compressed size",
                text: "Set your target compressed size",
            },
            {
                "@type": "HowToStep",
                name: "Start Compression for target size",
                text: `Click compress to reduce image size.`,
            },
            {
                "@type": "HowToStep",
                name: "Download Image",
                text: "Download the compressed image instantly.",
            },
        ],
    };
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Image Compressor Tool",
        url: "https://locifile.in/compress-image-to-${size}",
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
            <CompressorPage targetSize={100} />

            {/* SEO content */}
            <section>
                <div className="glass lg:px-20 px-5 md:py-5  pb-4 rounded-3xl border-primary/20">
                    <h1 className=" text-2xl underline">Compress Image to any size instantly Online Free tool</h1>

                    <p>Looking to compress an image to a specific size? This free online tool helps you reduce image size to exactly that acording to your needed without noticeable quality loss.
                        Works with JPG, PNG, and WebP formats. No signup required and processing happens directly in your browser.</p>
                    <h2 className=" text-xl underline">Key Features:</h2>

                    <ul className=" list-disc pl-4 mb-1">
                        <li>Compress image to any size instantly</li>
                        <li>No quality loss with smart optimization</li>
                        <li>Supports JPG, PNG, WebP</li>
                        <li>100% secure (no server upload)</li>
                        <li>Fast processing using browser compression</li>
                    </ul>
                    <h2 className=" text-xl underline">How to Compress Image</h2>

                    <ol>
                        <li>Upload your image file</li>
                        <li>Set target compressed size</li>
                        <li>Start compression for target size</li>
                        <li>Download image</li>
                    </ol>
                    <h2 className=" text-xl mb-0.5 underline">Why Compress Image to a specific size?</h2>

                    <p>
                        Compressing images to a specific size is useful for:
                    </p>

                    <ul className=" list-decimal pl-4 mb-1">
                        <li>Uploading images to websites with size limits</li>
                        <li>Submitting forms or exam portals</li>
                        <li>Reducing storage space</li>
                        <li>Improving website loading speed</li>
                        <li>Sharing images on email or WhatsApp</li>
                    </ul>
                    <h2 className=" text-xl underline">Supported Formats</h2>

                    <p>
                        This tool supports JPG, JPEG, PNG, and WebP images.
                    </p>
                    <h2 className=" text-xl mb-2 underline">Try Other Image Sizes</h2>

                    <div className="flex flex-wrap gap-2 mb-2">
                        {["20kb", "50kb", "100kb", "200kb", "400kb", "500kb"].map(s => (
                            <Link key={s} href={`/compress-image-to-${s}`} className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">
                                Compress to {s.toUpperCase()}
                            </Link>
                        ))}
                        <Link href={`/compress-image-to-1000kb`} className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">
                            Compress to 1MB
                        </Link>
                    </div>
                    <h2 className=" text-xl mb-2 underline">Try our Other popular tools</h2>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {/* {["20kb", "50kb", "100kb", "200kb", "400kb", "500kb"].map(s => (
                            <Link key={s} href={`/compress-pdf-to-${s}`} className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">
                                Compress to {s.toUpperCase()}
                            </Link>
                        ))} */}
                        <Link href={`/pdf-compressor`} className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">
                            Compress PDF
                        </Link>
                        <Link href={`/image-resize`} className=" border p-2 border-primary/40 hover:bg-primary/40 rounded-xl">
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
                            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">How to compress image to a specific size?</h3>
                            <p className="text-slate-400 text-sm">Upload your image and set your target size then compress it instantly using our free tool.</p>
                        </div>
                        <div>
                            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">Is this image compressor private?</h3>
                            <p className="text-slate-400 text-sm">Yes. Images are processed in your browser and never uploaded.</p>
                        </div>
                        <div>
                            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">Does compressing image reduce quality?</h3>
                            <p className="text-slate-400 text-sm">No, we use smart compression to maintain quality when compressing images</p>
                        </div>
                        <div>
                            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">Why is it faster than other tools?</h3>
                            <p className="text-slate-400 text-sm">Traditional tools require you to upload your file, wait for server processing, and then download. We skip the network delay entirely.
                            </p>
                        </div>
                        <p className=" flex gap-2 p-2 bg-primary/10 rounded-2xl items-center border border-primary/50"><Lock size={18} /> Your images never leave your device</p>
                    </div>
                    <p className=" mt-1">Try it now for fast and secure compression. It is Completely free</p>
                    <p className=" mt-1">
                        Use this free image compressor to reduce image size quickly and securely.
                        Perfect for students, professionals, and developers who need optimized images instantly.
                    </p>
                </div>
            </section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
        </main>
    );
}