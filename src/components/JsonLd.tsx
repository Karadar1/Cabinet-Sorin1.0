
import { headers } from 'next/headers';

export default function JsonLd() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bioveti-clinicaveterinara.ro';

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "VeterinaryCare",
        "name": "Clinica Veterinara Bioveti",
        "image": `${baseUrl}/hero4.jpg`,
        "@id": baseUrl,
        "url": baseUrl,
        "telephone": "+40722123456", // TODO: Update with real phone
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Strada Exemplu Nr. 1", // TODO: Update with real address
            "addressLocality": "Timisoara",
            "postalCode": "300000", // TODO: Update with real zip
            "addressCountry": "RO"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 45.7489, // TODO: Update with real coords
            "longitude": 21.2087
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                ],
                "opens": "08:30",
                "closes": "17:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "09:00",
                "closes": "13:00"
            }
        ],
        "sameAs": [
            "https://www.facebook.com/bioveti", // TODO: Update
            "https://www.instagram.com/bioveti" // TODO: Update
        ],
        "priceRange": "$$"
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
