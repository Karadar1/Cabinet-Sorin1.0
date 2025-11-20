
export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  fullContent: string; // HTML string for now, could be MDX later
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
    slug: "chirurgie-generala",
    title: "Chirurgie Generală",
    shortDescription: "Intervenții chirurgicale complexe realizate în condiții de maximă siguranță și sterilitate.",
    image: "/hero2.png",
    fullContent: `
      <h3>Servicii de Chirurgie Veterinară Avansată</h3>
      <p>Echipa noastră de chirurgi veterinari dispune de experiența și echipamentele necesare pentru a efectua o gamă largă de intervenții chirurgicale, de la proceduri de rutină (sterilizări) până la operații complexe de țesuturi moi.</p>
      <p>Înțelegem că orice intervenție chirurgicală este un moment stresant pentru proprietar. De aceea, punem accent pe comunicare transparentă și pe siguranța maximă a pacientului.</p>
    `,
    benefits: [
      { title: "Siguranță Maximă", description: "Monitorizare continuă a funcțiilor vitale (EKG, SpO2, CO2) pe toată durata anesteziei." },
      { title: "Recuperare Rapidă", description: "Folosim tehnici minim invazive și protocoale moderne de management al durerii." },
      { title: "Echipă Specializată", description: "Chirurgi cu experiență vastă în intervenții pe țesuturi moi și ortopedie." },
      { title: "Mediu Steril", description: "Sală de operație dedicată, cu flux de aer controlat și sterilizare riguroasă." }
    ],
    process: [
      { step: 1, title: "Consult Pre-operator", description: "Evaluăm starea de sănătate și efectuăm analize de sânge pentru a minimiza riscurile anestezice." },
      { step: 2, title: "Pregătirea Pacientului", description: "Administrarea pre-medicației și pregătirea câmpului operator în condiții sterile." },
      { step: 3, title: "Intervenția", description: "Realizarea procedurii chirurgicale sub anestezie inhalatorie monitorizată." },
      { step: 4, title: "Trezirea și Monitorizarea", description: "Supraveghere atentă în salonul de terapie intensivă până la trezirea completă." }
    ],
    faq: [
      { question: "Cât timp durează recuperarea?", answer: "Depinde de complexitatea intervenției. Pentru sterilizări, recuperarea este de 24-48 ore, iar firele se scot la 10-12 zile." },
      { question: "Trebuie să țin animalul nemâncat?", answer: "Da, este necesar un post alimentar de 12 ore înainte de operație pentru a evita complicațiile anestezice." }
    ],
    pricing: { startingPrice: 450, currency: "RON", note: "Prețul variază în funcție de tipul intervenției și greutatea animalului." }
  },
  {
    slug: "dermatologie",
    title: "Dermatologie",
    shortDescription: "Diagnostic și tratament pentru afecțiuni ale pielii, blănii și urechilor.",
    image: "/cat.png",
    fullContent: `
      <h3>Diagnostic și Tratament Dermatologic</h3>
      <p>Afecțiunile dermatologice sunt printre cele mai frecvente motive de prezentare la medicul veterinar. Mâncărimea, căderea părului sau modificările pielii pot ascunde alergii, paraziți sau boli hormonale.</p>
      <p>Abordăm fiecare caz sistematic, folosind teste specifice pentru a identifica cauza exactă, nu doar pentru a trata simptomele.</p>
    `,
    benefits: [
      { title: "Diagnostic Precis", description: "Utilizăm microscopia, culturile și testele alergologice pentru a identifica cauza." },
      { title: "Tratamente Personalizate", description: "Scheme terapeutice adaptate fiecărui pacient și stilului său de viață." },
      { title: "Management pe Termen Lung", description: "Soluții pentru controlul afecțiunilor cronice precum dermatita atopică." },
      { title: "Confortul Pacientului", description: "Eliminarea rapidă a pruritului (mâncărimii) pentru a îmbunătăți calitatea vieții." }
    ],
    process: [
      { step: 1, title: "Anamneza Detaliată", description: "Discutăm istoricul medical, dieta și mediul de viață al animalului." },
      { step: 2, title: "Examen Clinic", description: "Inspectăm leziunile și modelul de distribuție al acestora." },
      { step: 3, title: "Prelevare Probe", description: "Realizăm raclate, citologie sau culturi direct în cabinet." },
      { step: 4, title: "Plan de Tratament", description: "Stabilim diagnosticul și inițiem terapia potrivită." }
    ],
    faq: [
      { question: "De ce se scarpină câinele meu?", answer: "Cauzele pot fi multiple: paraziți externi, alergii alimentare, alergii la mediu sau infecții. Un consult este necesar pentru diferențiere." },
      { question: "Cât durează tratamentul unei micoze?", answer: "Tratamentul antifungic este de lungă durată, de obicei minim 4-6 săptămâni." }
    ],
    pricing: { startingPrice: 150, currency: "RON", note: "Include consultația și examenul microscopic direct." }
  },
  {
    slug: "medicina-interna",
    title: "Medicină Internă",
    shortDescription: "Abordare integrată pentru diagnosticul și tratamentul bolilor sistemice.",
    image: "/hero2.png",
    fullContent: `
      <h3>Medicină Internă Veterinară</h3>
      <p>Medicina internă se ocupă cu prevenirea, diagnosticul și tratamentul nechirurgical al bolilor organelor interne. Abordăm fiecare caz cu răbdare și minuțiozitate, punând cap la cap toate semnele clinice.</p>
    `,
    benefits: [
      { title: "Abordare Holistică", description: "Evaluăm întregul organism, nu doar organul afectat." },
      { title: "Laborator Propriu", description: "Rezultate rapide pentru analize de sânge biochimice și hematologice." },
      { title: "Ecografie Abdominală", description: "Vizualizarea non-invazivă a organelor interne pentru un diagnostic rapid." },
      { title: "Monitorizare Cronică", description: "Urmărirea pacienților cu boli renale, cardiace sau diabet." }
    ],
    process: [
      { step: 1, title: "Consult General", description: "Evaluare fizică completă și discuție cu proprietarul." },
      { step: 2, title: "Investigații", description: "Analize de sânge, ecografie sau radiografie, după caz." },
      { step: 3, title: "Diagnostic", description: "Coroborarea datelor pentru a stabili diagnosticul cert." },
      { step: 4, title: "Tratament", description: "Instituirea terapiei medicamentoase sau dietetice." }
    ],
    faq: [
      { question: "Ce semne indică o problemă internă?", answer: "Vărsăturile, diareea, setea excesivă, urinarea frecventă sau pierderea în greutate sunt semne comune." }
    ],
    pricing: { startingPrice: 120, currency: "RON", note: "Prețul consultației. Analizele se achită separat." }
  },
  {
    slug: "vaccinare-deparazitare",
    title: "Vaccinare și Deparazitare",
    shortDescription: "Prevenția este cheia sănătății. Scheme complete de imunizare.",
    image: "/bird.png",
    fullContent: `
      <h3>Profilaxie: Vaccinare și Deparazitare</h3>
      <p>Cel mai bun tratament este prevenția. Vaccinarea anuală și deparazitarea periodică protejează animalul tău de boli grave, unele dintre ele transmisibile și la om (zoonoze).</p>
    `,
    benefits: [
      { title: "Protecție Garantată", description: "Folosim vaccinuri de ultimă generație, păstrate în condiții optime." },
      { title: "Siguranța Familiei", description: "Deparazitarea regulată protejează și membrii familiei de paraziți." },
      { title: "Pașaport Internațional", description: "Eliberăm și completăm pașapoarte pentru călătorii în străinătate." },
      { title: "Reminder Automat", description: "Vă anunțăm când urmează revaccinarea." }
    ],
    process: [
      { step: 1, title: "Control Clinic", description: "Verificăm starea de sănătate înainte de vaccinare (obligatoriu)." },
      { step: 2, title: "Deparazitare", description: "Administrarea comprimatului sau pipetei antiparazitare." },
      { step: 3, title: "Vaccinare", description: "Inocularea vaccinului subcutanat, rapid și cu minim disconfort." },
      { step: 4, title: "Înregistrare", description: "Notarea în carnetul de sănătate și în RECS (Registrul de Evidență)." }
    ],
    faq: [
      { question: "Când se face primul vaccin la pui?", answer: "Prima vaccinare se face de obicei la vârsta de 6 săptămâni." },
      { question: "Pot vaccina animalul dacă este bolnav?", answer: "Nu, vaccinarea se face doar pe animale clinic sănătoase." }
    ],
    pricing: { startingPrice: 80, currency: "RON", note: "Include vaccinul polivalent și manopera." }
  },
  {
    slug: "stomatologie",
    title: "Stomatologie",
    shortDescription: "Detartraj cu ultrasunete și igienă orală pentru un zâmbet sănătos.",
    image: "/cat.png",
    fullContent: `
      <h3>Stomatologie Veterinară</h3>
      <p>Sănătatea orală influențează starea generală de bine a animalului. Tartrul și gingivita pot duce la pierderea dinților și pot afecta inima, ficatul sau rinichii prin diseminarea bacteriilor.</p>
    `,
    benefits: [
      { title: "Respirație Proaspătă", description: "Eliminarea halenei (mirosului neplăcut) cauzată de bacterii." },
      { title: "Prevenirea Durerii", description: "Tratarea dinților mobili sau a abceselor dureroase." },
      { title: "Tehnologie Modernă", description: "Detartraj cu ultrasunete care protejează smalțul dentar." },
      { title: "Anestezie Sigură", description: "Procedura se face sub anestezie pentru siguranță și eficiență." }
    ],
    process: [
      { step: 1, title: "Evaluare Orală", description: "Inspecția cavității bucale pentru a determina gradul de afectare." },
      { step: 2, title: "Anestezie", description: "Inducerea anesteziei generale." },
      { step: 3, title: "Detartraj & Polishing", description: "Curățarea tartrului și lustruirea dinților." },
      { step: 4, title: "Recuperare", description: "Trezirea sub supraveghere." }
    ],
    faq: [
      { question: "Cât de des trebuie făcut detartrajul?", answer: "Depinde de individ, dar în general o dată pe an este recomandat." }
    ],
    pricing: { startingPrice: 350, currency: "RON", note: "Prețul include anestezia și detartrajul. Extracțiile se achită separat." }
  }
];
