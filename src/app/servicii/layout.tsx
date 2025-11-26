import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Servicii",
    description: "Servicii veterinare complete la Clinica Bioveti: consultații, chirurgie, analize, vaccinări, stomatologie și urgențe.",
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
