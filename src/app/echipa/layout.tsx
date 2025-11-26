import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Echipa Noastră",
    description: "Cunoaște echipa de medici veterinari dedicați de la Clinica Bioveti. Experiență, compasiune și profesionalism pentru animalul tău.",
};

export default function TeamLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
