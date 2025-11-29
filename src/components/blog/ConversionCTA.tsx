import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ConversionCTA() {
    return (
        <section className="bg-gray-900 dark:bg-black text-white rounded-3xl p-8 md:p-16 text-center relative overflow-hidden my-12">
            <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-primary-500 to-accent-500" />

            <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                    Ready to Eliminate Wi-Fi Dead Zones in Your Hotel?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                    Get a free site survey and custom quote from Fluxive. We've helped 20+ Belgian hotels achieve 100% Wi-Fi coverage.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/#contact">
                        <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-white text-gray-900 hover:bg-gray-100 font-bold">
                            Schedule Free Assessment
                        </Button>
                    </Link>
                    <Link href="tel:+32472925741">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 border-white text-white hover:bg-white/10">
                            Call +32 472 92 57 41
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
