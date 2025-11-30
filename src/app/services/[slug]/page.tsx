import { servicesData } from "@/data/servicesData";
import ServiceContent from "@/components/ServiceContent";
import { notFound } from "next/navigation";

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

    return <ServiceContent slug={slug} />;
}
