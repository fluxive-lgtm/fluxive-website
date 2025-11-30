import ReactMarkdown from "react-markdown";
import { servicesData } from "@/data/servicesData";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { CheckCircle, Shield, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export async function generateStaticParams() {
    return servicesData.map((service) => ({
        slug: service.id,
    }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = servicesData.find((s) => s.id === slug);

    if (!service) {
        notFound();
    }

    const Icon = service.icon;

    return (
        <main className="min-h-screen bg-white dark:bg-gray-950">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${service.color}`} />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className={`inline-flex p-3 rounded-2xl mb-6 bg-gradient-to-br ${service.color} shadow-lg`}>
                            <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 text-gray-900 dark:text-white leading-tight">
                            {service.heroHeading}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                            {service.subheading}
                        </p>
                    </div>
                </div>
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* What We Do */}
                        <Card className="border-none shadow-xl bg-white dark:bg-gray-900">
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <Zap className="w-6 h-6 text-primary-500" />
                                    What We Do
                                </h3>
                                <ul className="space-y-4">
                                    {service.whatWeDo.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Perfect For */}
                        <Card className="border-none shadow-xl bg-white dark:bg-gray-900">
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <TrendingUp className="w-6 h-6 text-primary-500" />
                                    Perfect For
                                </h3>
                                <ul className="space-y-4">
                                    {service.perfectFor.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <div className="w-2 h-2 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Our Process */}
            <section className="py-16 bg-white dark:bg-gray-950">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-8">
                            {service.ourProcess.map((step, index) => (
                                <div key={index} className="flex gap-6 relative">
                                    {index !== service.ourProcess.length - 1 && (
                                        <div className="absolute left-[27px] top-12 bottom-[-32px] w-0.5 bg-gray-200 dark:bg-gray-800" />
                                    )}
                                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center border-2 border-primary-100 dark:border-primary-800">
                                        <span className="text-xl font-bold text-primary-600 dark:text-primary-400">{index + 1}</span>
                                    </div>
                                    <div className="pt-2">
                                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Results & Case Study */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">Results You Can Expect</h2>
                        <div className="grid sm:grid-cols-2 gap-6 mb-12">
                            {service.results.map((result, index) => (
                                <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                    <p className="font-medium text-gray-800 dark:text-gray-200">{result}</p>
                                </div>
                            ))}
                        </div>

                        {(service.caseStudy || service.realWorldExample || service.featuredWork || service.whyThisMatters) && (
                            <div className="bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-800 rounded-2xl p-8">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-primary-600" />
                                    Real Impact
                                </h3>
                                <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                                    "{service.caseStudy || service.realWorldExample || service.featuredWork || service.whyThisMatters}"
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Investment & CTA */}
            <section className="py-20 bg-white dark:bg-gray-950">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold mb-4">Investment</h2>
                            <p className="text-xl text-gray-600 dark:text-gray-400">{service.investment}</p>
                        </div>

                        <div className="bg-gray-900 dark:bg-gray-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                            <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${service.color}`} />
                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
                                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                                    {service.cta}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href="#contact">
                                        <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-white text-gray-900 hover:bg-gray-100">
                                            Contact Us Now
                                        </Button>
                                    </Link>
                                    <Link href="tel:+32472925741">
                                        <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 border-white text-white bg-transparent hover:bg-white/10">
                                            Call +32 472 92 57 41
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Contact />
            <Footer />
        </main>
    );
}
