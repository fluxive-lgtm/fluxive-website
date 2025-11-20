import { WifiSupportForm } from "@/components/WifiSupportForm";

export const metadata = {
  title: "Wi-Fi Support | Fluxive",
  description:
    "Submit a Wi-Fi support request. Fluxive will investigate your network problem.",
};

export default function WifiSupportPage() {
  return (
    <main className="container mx-auto py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <WifiSupportForm />
      </div>
    </main>
  );
}
