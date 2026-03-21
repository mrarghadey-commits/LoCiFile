import type { Metadata } from "next";
import CompressorPage from "./CompressorPage";
import { Lock } from "lucide-react";
import { notFound } from "next/navigation";

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
        "400kb", "500kb"
    ];
    return sizes.map((size) => ({ size }));
}

export async function generateMetadata({ params }: any) {
    const size = params.size.toLowerCase();

    return {
        title: `Compress Image to ${size} Online Free (No Quality Loss)`,
        description: `Reduce image size to ${size}. Fast, free and secure image compressor.`,
        keywords: [
            `compress image to ${size}`,
            `reduce image size to ${size}`,
            `image compressor ${size}`,
            "compress image online free",
            "wasm image compressor",
            "compress images online",
            "client side image compression",
            "no upload image compressor",
            "browser image compression",
        ],
        alternates: {
            canonical: `https://yourdomain.com/compress-image-to-${size}`,
        },
        openGraph: {
            title: `Compress image to ${size} instantly online.`,
            description: `Compress image to ${size} instantly online.`,
            url: "https://yourdomain.com/image-compressor",
            siteName: "LoCiFile",
            type: "website",
            images: [
                {
                    url: "https://yourdomain.com/logo.png",
                    width: 1200,
                    height: 630,
                },
            ],
        }
    };
}

export const metadata: Metadata = {
    title: "Compress Images Online (No Upload) | LoCiFile",
    description:
        "Compress images instantly in your browser using WebAssembly. No uploads, private, fast image compression with high quality output.",

    alternates: {
        canonical: "https://yourdomain.com/image-compressor",
    },

};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Image Compressor Tool",
    applicationCategory: "Utility",
    operatingSystem: "All",
};

export default async function Page({ params }: Props) {
    const { size } = await params;
    console.log(size)
    const allowed = [10, 20, 30, 40, 50, 100, 200, 300, 400, 500, 1000];
    // normalize input
    const raw = (size ?? "").toLowerCase().trim();

    // extract number safely
    const sizeInKB = raw.endsWith("kb")
        ? parseInt(raw.replace("kb", ""), 10)
        : NaN;

    if (!allowed.includes(sizeInKB)) {
        notFound();
    }
    return (
        <main>
            {/* Client Tool */}
            <CompressorPage targetSize={sizeInKB} />

            {/* SEO content */}
            <section>
                <div className="glass lg:px-20 px-5 md:py-5  pb-4 rounded-3xl border-primary/20">
                    <h3 className="text-2xl font-bold md:mb-6 mb-3">Frequently Asked Questions</h3>
                    <div className="md:space-y-6 space-y-3">
                        <div>
                            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">Is it really secure?</h3>
                            <p className="text-slate-400 text-sm">Yes. Because we use WebAssembly (WASM), all processing
                                happens locally on your computer. Your data never leaves your browser.</p>
                        </div>
                        <div>
                            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">Is this image compressor private?</h3>
                            <p className="text-slate-400 text-sm">Yes. Images are processed in your browser and never uploaded.</p>
                        </div>
                        <div>
                            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">What is WASM image compression?</h3>
                            <p className="text-slate-400 text-sm">It uses WebAssembly to compress images directly in your browser for better
                                performance.</p>
                        </div>
                        <div>
                            <h3 className="font-bold dark:text-slate-200 text-slate-600 mb-2">Why is it faster than other tools?</h3>
                            <p className="text-slate-400 text-sm">Traditional tools require you to upload your file,
                                wait for server processing, and then download. We skip the network delay entirely.
                            </p>
                        </div>
                        <p className=" flex gap-2 p-2 bg-primary/10 rounded-2xl items-center border border-primary/50"><Lock size={18} /> Your images never leave your device</p>
                    </div>
                </div>
            </section>
            <>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </>
        </main>
    );
}