import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description: "Contactează Clinica Bioveti din Timișoara. Adresă: Str. Crișan Nr.8. Telefon: 0755 090 880. Program L-V: 08:00-18:00.",
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
