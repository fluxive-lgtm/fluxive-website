import CaseStudyClient from "./CaseStudyClient";

// This function is required for static export with dynamic routes
export async function generateStaticParams() {
    // In a real scenario, you would fetch the list of project IDs from your API
    // const posts = await fetch('https://.../posts').then((res) => res.json())

    // For now, we return a hardcoded list of IDs to allow the build to pass.
    // Since the content is currently hardcoded for the "Koffieboontje" case study,
    // we ensure at least ID '1' works. We add a few more just in case.
    return [
        { id: '1' },
        { id: '2' },
        { id: '3' },
    ];
}

export default function CaseStudyPage() {
    return <CaseStudyClient />;
}
