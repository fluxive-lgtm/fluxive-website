"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { servicesData } from "@/data/servicesData";
import { ArrowRight, CheckCircle2, LineChart, Clock, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "@/context/LanguageContext";
import { notFound } from "next/navigation";

export default function ServiceContent({ slug }: { slug: string }) {
    const { language } = useLanguage();

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
                            {service.heroHeading[language]}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                            {service.subheading[language]}
                        </p>
                    </div>
                </div>
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mt-16">
                        {/* What We Do */}
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Shield className="w-6 h-6 text-blue-600" />
                                {language === 'nl' ? 'Wat We Doen' : language === 'fr' ? 'Ce Que Nous Faisons' : 'What We Do'}
                            </h3>
                            <ul className="space-y-4">
                                {service.whatWeDo[language].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                                        <span className="text-gray-600 dark:text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Perfect For */}
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Users className="w-6 h-6 text-purple-600" />
                                {language === 'nl' ? 'Perfect Voor' : language === 'fr' ? 'Parfait Pour' : 'Perfect For'}
                            </h3>
                            <ul className="space-y-4">
                                {service.perfectFor[language].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <ArrowRight className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                                        <span className="text-gray-600 dark:text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Full Description */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
                        <ReactMarkdown>{service.fullDescription[language]}</ReactMarkdown>
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                        {language === 'nl' ? 'Onze Werkwijze' : language === 'fr' ? 'Notre Processus' : 'Our Process'}
                    </h2>
                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {service.ourProcess.map((step, index) => (
                            <div key={index} className="relative p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-4xl font-bold text-gray-100 dark:text-gray-800 absolute top-4 right-4">
                                    {index + 1}
                                </div>
                                <h3 className="text-xl font-bold mb-3 relative z-10">{step.title[language]}</h3>
                                <p className="text-gray-600 dark:text-gray-400 relative z-10">
                                    {step.description[language]}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Results & Investment */}
            <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
                <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${service.color}`} />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
                        <div>
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                <LineChart className="w-6 h-6 text-green-400" />
                                {language === 'nl' ? 'Verwachte Resultaten' : language === 'fr' ? 'Résultats Attendus' : 'Expected Results'}
                            </h3>
                            <ul className="space-y-4">
                                {service.results[language].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                                        <span className="text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {service.caseStudy && (
                                <div className="mt-8 p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                                    <p className="text-sm font-semibold text-green-400 mb-2 uppercase tracking-wider">
                                        {language === 'nl' ? 'Case Study' : language === 'fr' ? 'Étude de Cas' : 'Case Study'}
                                    </p>
                                    <p className="italic text-gray-200">"{service.caseStudy[language]}"</p>
                                </div>
                            )}

                            {service.realWorldExample && (
                                <div className="mt-8 p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                                    <p className="text-sm font-semibold text-green-400 mb-2 uppercase tracking-wider">
                                        {language === 'nl' ? 'Praktijkvoorbeeld' : language === 'fr' ? 'Exemple Concret' : 'Real World Example'}
                                    </p>
                                    <p className="italic text-gray-200">"{service.realWorldExample[language]}"</p>
                                </div>
                            )}

                            {service.whyThisMatters && (
                                <div className="mt-8 p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                                    <p className="text-sm font-semibold text-green-400 mb-2 uppercase tracking-wider">
                                        {language === 'nl' ? 'Waarom Dit Belangrijk Is' : language === 'fr' ? 'Pourquoi C\'est Important' : 'Why This Matters'}
                                    </p>
                                    <p className="italic text-gray-200">"{service.whyThisMatters[language]}"</p>
                                </div>
                            )}
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                <Clock className="w-6 h-6 text-blue-400" />
                                {language === 'nl' ? 'Investering' : language === 'fr' ? 'Investissement' : 'Investment'}
                            </h3>
                            <div className="prose prose-invert">
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    {service.investment[language]}
                                </p>
                            </div>

                            <div className="mt-12">
                                <a
                                    href="mailto:info@fluxive.be"
                                    className={`inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-lg font-bold rounded-xl bg-gradient-to-r ${service.color} text-white hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/25`}
                                >
                                    {service.cta[language]}
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </a>
                            </div>

                            {service.featuredWork && (
                                <div className="mt-8 pt-8 border-t border-white/10">
                                    <p className="text-sm text-gray-400 mb-2">
                                        {language === 'nl' ? 'Uitgelicht Werk' : language === 'fr' ? 'Projet en Vedette' : 'Featured Work'}
                                    </p>
                                    <p className="text-gray-300">{service.featuredWork[language]}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
