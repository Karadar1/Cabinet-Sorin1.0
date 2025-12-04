export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  fullContent: string; // HTML string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: string | any;
  icon?: string; // Lucide icon name

  // New Fields
  benefits: { title: string; description: string }[];
  process: { step: number; title: string; description: string }[];
  faq: { question: string; answer: string }[];
  pricing?: { startingPrice: number; currency: string; note?: string };
};

export const services: Service[] = [
  {
    slug: "consultatii",
    title: "Consultații generale și tratamente",
    shortDescription: "Evaluare completă a sănătății, diagnosticare precisă și planuri terapeutice personalizate.",
    image: "/hero2.png", // Replace with your actual image path
    icon: "Stethoscope",
    fullContent: `
      <h3>Sănătatea animalului tău începe aici</h3>
      <p>Oferim servicii medicale complete pentru a asigura o viață lungă și sănătoasă prietenului tău necuvântător.</p>
      <ul class="list-disc pl-5 space-y-2 mt-4">
        <li><strong>Consultații generale:</strong> Evaluăm complet starea de sănătate a animalului, stabilim diagnosticul și oferim cele mai bune soluții terapeutice.</li>
        <li><strong>Consultații de specialitate:</strong> Examinări avansate în dermatologie, nutriție, oncologie, ginecologie, stomatologie și alte domenii.</li>
        <li><strong>Tratamente de specialitate:</strong> Terapie adaptată fiecărei afecțiuni, bazată pe protocoale moderne și monitorizare atentă.</li>
        <li><strong>Tratamente profilactice:</strong> Vaccinări, deparazitări interne și externe, planuri personalizate de prevenție și reamintiri automate pentru rapeluri.</li>
      </ul>
    `,
    benefits: [
      { title: "Prevenție", description: "Identificăm problemele înainte să devină grave." },
      { title: "Personalizare", description: "Tratamente adaptate vârstei și istoricului medical." },
      { title: "Monitorizare", description: "Urmărim evoluția pacientului pe termen lung." }
    ],
    process: [
      { step: 1, title: "Programare", description: "Contactați-ne telefonic sau online." },
      { step: 2, title: "Evaluare", description: "Examen clinic complet efectuat de medic." },
      { step: 3, title: "Diagnostic", description: "Stabilirea cauzelor și explicarea tratamentului." },
      { step: 4, title: "Tratament", description: "Administrarea terapiei și planul de acasă." }
    ],
    faq: [
      { question: "Cât de des trebuie vaccinat câinele?", answer: "Schema de vaccinare este anuală pentru adulți, dar puii necesită rapeluri lunare la început." },
      { question: "Este necesară programarea?", answer: "Da, pentru a evita timpii de așteptare, recomandăm programarea." }
    ],
    pricing: { startingPrice: 150, currency: "RON", note: "Consultație generală." }
  },
  {
    slug: "vaccinari-profilaxie",
    title: "Vaccinări & Profilaxie",
    shortDescription: "Scheme complete de vaccinare și deparazitare pentru imunizarea animalului tău.",
    image: "/cat.png",
    icon: "Syringe",
    fullContent: `
      <h3>Prevenția este cel mai bun tratament</h3>
      <p>Vaccinarea este cea mai eficientă metodă de a proteja animalul de companie împotriva bolilor infecțioase grave, unele dintre ele fatale sau transmisibile la om.</p>
      <ul class="list-disc pl-5 space-y-2 mt-4">
        <li><strong>Vaccinări anuale:</strong> Rapeluri periodice pentru menținerea imunității (Polivalent, Antirabic).</li>
        <li><strong>Schema de vaccinare pui:</strong> Imunizarea corectă a puilor începând cu vârsta de 6 săptămâni.</li>
        <li><strong>Deparazitări:</strong> Interne și externe pentru prevenirea infestațiilor cu viermi, purici sau căpușe.</li>
        <li><strong>Consiliere:</strong> Stabilirea planului de prevenție în funcție de stilul de viață al animalului.</li>
      </ul>
    `,
    benefits: [
      { title: "Imunitate", description: "Protecție împotriva parvovirozei, jigodiei, leptospirozei etc." },
      { title: "Siguranță Publică", description: "Vaccinul antirabic este obligatoriu prin lege." },
      { title: "Sănătatea Familiei", description: "Deparazitarea regulată protejează și membrii familiei umane." }
    ],
    process: [
      { step: 1, title: "Consult sumar", description: "Verificăm starea de sănătate (animalul trebuie să fie clinic sănătos)." },
      { step: 2, title: "Administrare", description: "Inocularea vaccinului și/sau administrarea deparazitantului." },
      { step: 3, title: "Parafare", description: "Notarea procedurii în carnetul de sănătate sau pașaport." }
    ],
    faq: [
      { question: "Când se face primul vaccin la pui?", answer: "Primul vaccin se administrează de obicei la vârsta de 6 săptămâni." },
      { question: "Pot spăla câinele după vaccin?", answer: "Recomandăm evitarea băii timp de 3-5 zile după vaccinare pentru a nu scădea imunitatea." }
    ],
    pricing: { startingPrice: 70, currency: "RON", note: "Preț per doză vaccin." }
  },
  {
    slug: "servicii-administrative",
    title: "Identificare & Documente",
    shortDescription: "Servicii administrative: pașaport, microcipare, înregistrare RECS și istoric digital.",
    image: "/cat.png", // Replace with your actual image path
    icon: "FileText",
    fullContent: `
      <h3>Administrativ și Identificare</h3>
      <p>Asigurăm legalitatea și siguranța animalului tău prin servicii complete de evidență și documentare.</p>
      <ul class="list-disc pl-5 space-y-2 mt-4">
        <li><strong>Eliberare carnet de sănătate:</strong> Document esențial ce include istoricul medical și schemele de vaccinare.</li>
        <li><strong>Eliberare Pașaport EU:</strong> Permite călătoria în siguranță cu animalul tău în spațiul european.</li>
        <li><strong>Microcipare:</strong> Identificare permanentă și sigură, recomandată pentru toate animalele de companie.</li>
        <li><strong>Înregistrare RECS:</strong> Introducerea datelor în Registrul Electronic Național pentru animale identificate.</li>
        <li><strong>Istoric medical digital:</strong> Stocare și actualizare continuă a tuturor investigațiilor și tratamentelor.</li>
        <li><strong>Notificări automate:</strong> Alerte pentru rapelurile de vaccin, deparazitări sau consultațiile periodice.</li>
      </ul>
    `,
    benefits: [
      { title: "Legalitate", description: "Călătoriți fără griji în UE." },
      { title: "Siguranță", description: "Găsirea rapidă a animalului pierdut prin scanarea microcipului." },
      { title: "Organizare", description: "Nu uitați niciodată un vaccin datorită alertelor automate." }
    ],
    process: [
      { step: 1, title: "Verificare", description: "Verificăm documentele existente." },
      { step: 2, title: "Procedură", description: "Implantare microcip sau completare acte." },
      { step: 3, title: "Înregistrare", description: "Validarea datelor în sistemul național." }
    ],
    faq: [
      { question: "Este obligatorie microciparea?", answer: "Da, conform legii, câinii cu stăpân trebuie microcipați și înregistrați." }
    ],
    pricing: { startingPrice: 100, currency: "RON", note: "Microcipare + RECS." }
  },
  {
    slug: "diagnostic-analize",
    title: "Diagnostic & Analize",
    shortDescription: "Laborator complet: analize sânge, microscopie, teste rapide și examene histopatologice.",
    image: "/hero2.png",
    icon: "Microscope",
    fullContent: `
      <h3>Investigații de Laborator</h3>
      <p>Diagnostic rapid și precis utilizând echipamente moderne de laborator.</p>
      <ul class="list-disc pl-5 space-y-2 mt-4">
        <li><strong>Teste rapide:</strong> Diagnostice imediate pentru boli infecțioase, parazitare sau metabolice.</li>
        <li><strong>Analize de sânge și urină:</strong> Panouri complete de hematologie și biochimie pentru evaluarea organelor și a stării generale.</li>
        <li><strong>Examene coproparazitologice:</strong> Detectarea paraziților intestinali pentru tratamente țintite.</li>
        <li><strong>Examene microscopice:</strong> Identificare bacterii, fungi, celule inflamatorii sau alte modificări patologice.</li>
        <li><strong>Examen histopatologic și citologic:</strong> Recoltare probe, pregătire si expediere la laborator de specialitate.</li>
        <li><strong>Prelevare probe Eco ghidată / endoscopică:</strong> Prelevarea precisă a probelor biologice, cu disconfort minim pentru pacient.</li>
      </ul>
    `,
    benefits: [
      { title: "Rapiditate", description: "Rezultate pe loc pentru urgențe." },
      { title: "Precizie", description: "Echipamente de ultimă generație." },
      { title: "Confort", description: "Metode de recoltare minim invazive." }
    ],
    process: [
      { step: 1, title: "Recoltare", description: "Prelevarea probelor biologice." },
      { step: 2, title: "Procesare", description: "Analiza probelor în laborator." },
      { step: 3, title: "Rezultat", description: "Interpretarea rezultatelor de către medic." }
    ],
    faq: [],
    pricing: { startingPrice: 80, currency: "RON", note: "Preț per analiză specifică." }
  },
  {
    slug: "imagistica",
    title: "Imagistică",
    shortDescription: "Vizualizare internă non-invazivă prin ecografie și endoscopie.",
    image: "/hero2.png",
    icon: "Scan",
    fullContent: `
      <h3>Imagistică Veterinară</h3>
      <p>Vedem dincolo de simptome pentru un diagnostic corect.</p>
      <ul class="list-disc pl-5 space-y-2 mt-4">
        <li><strong>Ecografie (inclusiv gestație):</strong> Examinare non-invazivă pentru evaluarea organelor interne și monitorizarea sarcinii.</li>
        <li><strong>Endoscopie:</strong> Vizualizare internă a tractului digestiv pentru diagnostic și prelevare de probe.</li>
      </ul>
    `,
    benefits: [
      { title: "Non-invaziv", description: "Fără durere și fără riscuri majore." },
      { title: "Diagnostic Clar", description: "Imagine în timp real a organelor interne." },
      { title: "Monitorizare Gestație", description: "Urmărirea sigură a sarcinii." }
    ],
    process: [
      { step: 1, title: "Pregătire", description: "Rasul zonei (dacă e necesar) și aplicare gel." },
      { step: 2, title: "Examinare", description: "Scanarea ecografică sau intervenția endoscopică." },
      { step: 3, title: "Raport", description: "Interpretarea imaginilor și diagnostic." }
    ],
    faq: [],
    pricing: { startingPrice: 150, currency: "RON", note: "Ecografie abdominală." }
  },
  {
    slug: "consultatii-specialitate",
    title: "Consultații de specialitate",
    shortDescription: "Dermatologie, Oncologie, Stomatologie, Nutriție și Obstetrică.",
    image: "/cat.png",
    icon: "Award",
    fullContent: `
      <h3>Expertiză Avansată</h3>
      <p>Abordăm cazurile complexe cu medici specializați pe domenii specifice.</p>
      <ul class="list-disc pl-5 space-y-2 mt-4">
        <li><strong>Dermatologie:</strong> Diagnostic și tratament pentru alergii, infecții, paraziți și afecțiuni ale pielii.</li>
        <li><strong>Obstetrică și ginecologie:</strong> Monitorizare gestație, evaluare reproducție, asistență la fătare și tratamente specifice.</li>
        <li><strong>Oncologie:</strong> Depistare, evaluare și terapie pentru afecțiuni tumorale.</li>
        <li><strong>Stomatologie:</strong> Detartraj, extracții, tratamente dentare și îngrijire orală completă.</li>
        <li><strong>Nutriție și comportament:</strong> Planuri alimentare personalizate și consiliere pentru probleme comportamentale.</li>
      </ul>
    `,
    benefits: [
      { title: "Tratament Țintit", description: "Soluții specifice pentru afecțiuni complexe." },
      { title: "Tehnologie", description: "Aparatură dedicată (ex: detartraj cu ultrasunete)." },
      { title: "Consiliere", description: "Educație pentru prevenirea recidivelor." }
    ],
    process: [],
    faq: [
      { question: "Cât durează un detartraj?", answer: "Procedura se face sub anestezie și durează aprox. 45-60 min." }
    ],
    pricing: { startingPrice: 200, currency: "RON", note: "Consultație specialist." }
  },
  {
    slug: "interventii-urgente",
    title: "Intervenții & Urgențe",
    shortDescription: "Chirurgie complexă, terapie intensivă și managementul traumatismelor.",
    image: "/hero2.png",
    icon: "Siren",
    fullContent: `
      <h3>Chirurgie și Terapie Intensivă</h3>
      <p>Suntem pregătiți pentru situații critice, oferind cele mai sigure condiții operatorii.</p>
      <ul class="list-disc pl-5 space-y-2 mt-4">
        <li><strong>Chirurgie:</strong> Intervenții sigure și moderne, realizate de personal experimentat.</li>
        <li><strong>Terapie intensivă:</strong> Monitorizare continuă și tratament pentru pacienți critici.</li>
        <li><strong>Anestezie inhalatorie:</strong> Tehnică avansată ce asigură recuperare rapidă și siguranță sporită.</li>
        <li><strong>Traumatologie:</strong> Managementul leziunilor, fracturilor și accidentelor.</li>
        <li><strong>Monitorizare intraoperatorie:</strong> Supraveghere completă a parametrilor vitali pe durata intervenției.</li>
      </ul>
    `,
    benefits: [
      { title: "Siguranță Maximă", description: "Anestezie inhalatorie și monitorizare funcții vitale." },
      { title: "Experiență", description: "Echipă chirurgicală pregătită pentru cazuri dificile." },
      { title: "Recuperare Rapidă", description: "Protocoale moderne de gestionare a durerii." }
    ],
    process: [
      { step: 1, title: "Pre-operator", description: "Analize de sânge și evaluare cardiologică." },
      { step: 2, title: "Intervenție", description: "Operația propriu-zisă sub anestezie." },
      { step: 3, title: "Trezire", description: "Supraveghere în spațiul de terapie intensivă." }
    ],
    faq: [],
    pricing: { startingPrice: 500, currency: "RON", note: "Variază în funcție de complexitate." }
  },
  {
    slug: "spitalizare",
    title: "Spitalizare & Recuperare",
    shortDescription: "Îngrijire și monitorizare post-operatorie în condiții optime.",
    image: "/hero2.png",
    icon: "Bed",
    fullContent: `
      <h3>Recuperare Medicală</h3>
      <p>Oferim un mediu liniștit și controlat pentru recuperarea animalului tău după intervenții sau în stări critice.</p>
      <ul class="list-disc pl-5 space-y-2 mt-4">
        <li><strong>Internare post-operatorie:</strong> Îngrijire completă, monitorizare și tratament până la recuperarea în siguranță.</li>
      </ul>
    `,
    benefits: [
      { title: "Monitorizare 24h", description: "Personal medical disponibil permanent." },
      { title: "Tratament", description: "Administrarea corectă a medicației injectabile/perfuzabile." },
      { title: "Confort", description: "Spații de cazare curate și încălzite." }
    ],
    process: [],
    faq: [],
    pricing: { startingPrice: 100, currency: "RON", note: "Per zi (fără tratamente incluse)." }
  },
  {
    slug: "cosmetica",
    title: "Salon Cosmetic",
    shortDescription: "Servicii de toaletare (Momentan Indisponibil).",
    image: "/cat.png",
    icon: "Scissors",
    fullContent: `
      <h3>Salon de Cosmetică Veterinară</h3>
      <p class="text-red-500 font-bold mb-2">⚠ Momentan Indisponibil</p>
      <p>Ne cerem scuze, acest serviciu este momentan în pauză.</p>
      <ul class="list-disc pl-5 space-y-2 mt-4">
        <li><strong>Frizerie canină și felină:</strong> Servicii profesionale de toaletare și îngrijire — momentan în pauză până la revenirea personalului specializat.</li>
      </ul>
    `,
    benefits: [],
    process: [],
    faq: [],
    pricing: { startingPrice: 0, currency: "RON", note: "Indisponibil." }
  }
];