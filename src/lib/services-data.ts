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
  process?: { step: number; title: string; description: string }[];
  faq: { question: string; answer: string }[];
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
        <li><strong>Prevenție proactivă a afecțiunilor:</strong> Identificăm și intervenim în fazele incipiente ale potențialelor probleme de sănătate.</li>
        <li><strong>Monitorizare continuă și pe termen lung:</strong> Asigurăm urmărirea evolutivă a pacientului pentru optimizarea rezultatelor terapeutice.</li>
        <li><strong>Terapii personalizate și adaptate:</strong> Protocoale individualizate, elaborate pe baza vârstei, raselor și istoricului medical specific.</li>
        <li><strong>Expertiză clinică și protocoale actualizate:</strong> Intervenții bazate pe evidențe științifice și practici medicale contemporane.</li>
      </ul>
    `,
    benefits: [
      { title: "Prevenție", description: "Identificăm problemele înainte să devină grave." },
      { title: "Personalizare", description: "Tratamente adaptate vârstei și istoricului medical." },
      { title: "Monitorizare", description: "Urmărim evoluția pacientului pe termen lung." }
    ],
    process: [],
    faq: [
      { question: "Ce tipuri de consultații oferă clinica veterinară Bioveti?", answer: "Clinica oferă consultații generale pentru evaluarea completă a sănătății și stabilirea diagnosticului, precum și consultații de specialitate avansate în domenii precum dermatologie, nutriție, oncologie, ginecologie și stomatologie." },
      { question: "Ce înseamnă „tratamente profilactice” și ce servicii includ acestea?", answer: "Tratamentele profilactice sunt măsuri preventive pentru a menține sănătatea animalului. Acestea includ vaccinări, deparazitări interne și externe, planuri personalizate de prevenție și sistem de reamintiri automate pentru rapeluri." },
      {
        question: "Care sunt principalele beneficii menționate pentru serviciile medicale veterinare oferite?", answer: "Principalele beneficii sunt: Prevenția (identificarea problemelor înainte să devină grave), Monitorizarea atentă a stării de sănătate, și Personalizarea tratamentelor în funcție de vârstă și istoric medical."
      },
    ],
  },
  {
    slug: "vaccinari-profilaxie",
    title: "Vaccinări & Deparazitări",
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
      { title: "Protecție Imunitară Țintită și Controlată", description: "Vaccinări conforme cu schemele internaționale, oferind imunitate durabilă împotriva principalelor boli infecțioase (parvoviroză, jigodie, leptospiroză, rabie etc.)." },
      { title: "Sănătate Integrată: Animal – Familie – Societate", description: "Deparazitarea si vaccinarea regulată asigură o barieră sanitară atât pentru animal, cât și pentru întreaga familie, prevenind zoonozele și creând un mediu sigur." },
      {
        title: "Conformitate și Responsabilitate Legală", description: "Asistență în îndeplinirea obligațiilor legale (vaccin antirabic, pașaport european), garantând siguranța publică și libertatea de circulație."
      },
      {
        title: "Planificare Personalizată a Prevenției", description: "Consiliere și scheme adaptate vârstei, stilului de viață și riscurilor specifice ale animalului, pentru o protecție optimă pe termen lung."
      }
    ],
    process: [
      { step: 1, title: "Identificarea animalului", description: "Înregistrarea datelor (nume, specie, rasă, vârstă, sex, istoric medical)." },
      { step: 2, title: "Evaluarea stării de sănătate", description: "Consult veterinar (examen clinic general)." },
      { step: 3, title: "Stabilirea planului individual", description: "Pentru vaccinare: Se ține cont de vârsta, istoricul vaccinal, riscul epidemiologic, legislație (vaccinuri obligatorii). \n Pentru deparazitare: Se ține cont de tipul parazitului (intern/extern), produsul, frecvența (lunar, trimestrial etc.), sezonul." },
      {
        step: 4, title: "Pregătirea", description: "Asigurarea condițiilor optime (animal calm, temperatura ambient). \nPregătirea produselor(verificarea termenului de valabilitate, depozitare corectă)."
      },
      { step: 5, title: "Administrare", description: "Vaccinarea de către medicul veterinar." },
      { step: 6, title: "Documentare OBLIGATORIE", description: "Carnet de sănătate / Pașaport: Înregistrarea tipului de vaccin, numărul de serie, data aplicării, data următoarei doze si parafarea documentelor. \nÎnregistrare internă: In baza de date pentru istoricul deparazitărilor si vaccinărilor." },
      { step: 7, title: "MONITORIZAREA POST-Administrare", description: "Observarea animalului de către proprietar (24-48 de ore): Semne de reacție adversă  daca apar se anunța imediat medicul veterinar (letargie, umflături, vărsături)." },


    ],
    faq: [
      { question: "Animăluțul meu stă doar în casă. Chiar are nevoie de vaccinuri și deparazitări regulate?", answer: "Da, absolut. \n Vaccinarea: Tu, membrii familiei sau oaspeții puteți aduce agenții patogeni în casă pe încălțăminte sau haine.Unele virusuri, ca Panleucopenia la pisici sau Parvovirusul la câini, sunt extrem de rezistente în mediu.Vaccinul este singura protecție sigură. Deparazitarea internă: Paraziții interni(viermi) pot ajunge în casă prin intermediul  altor animale, insectelor, a prafului sau a solului de la ghivecele cu plante. Deparazitarea externă: Puricii și căpușele pot fi aduse de la o plimbare scurtă sau de la alte animale.O căpușă poate urca pe tine în parc și să cadă în casă.Acești paraziți pot transmite boli grave. Obligație legală: Vaccinul împotriva rabiei este obligatoriu prin lege, indiferent dacă animalul iese sau nu din casa." },
      { question: "De ce este atât de importantă deparazitarea internă la 3 luni dacă nu văd niciodată viermi în scaun?", answer: "Pentru că prezența majorității paraziților interni este 'invizibilă'. Ouăle și larvele sunt microscopice și sunt eliminate în mod regulat în excremente.Tu le vezi doar atunci când parazitul este matur(ex.: viermi lungi și albi ca spaghetele), iar acest stadiu este deja avansat. Mulți paraziți nu trăiesc doar în intestin; larvele pot migra prin ficat, plămâni sau alte organe, provocând leziuni fără simptome digestive evidente. Deparazitarea regulată la 3 luni rupe ciclul de reproducere și previne acumularea de paraziți care, pe termen lung, pot duce la malnutriție, anemie(în special la pui) și scăderea imunității." },
      { question: "De ce are nevoie de atâtea vaccinuri când este pui? Nu este de ajuns o singură doză?", answer: "Schema de vaccinare pentru pui (atât căței, cât și pisoi) este crucială din cauza imunității materne.\n· Puii primesc anticorpi de la mamă, prin laptele matern, care îi protejează în primele săptămâni de viață.\n· Acești anticorpi materni scad treptat. Dacă vaccinăm când încă sunt prezenți în cantitate mare, ei 'neutralizează' vaccinul, împiedicând animalul să-și producă proprii anticorpi.\n· Așadar, vaccinările repetate la 3-4 săptămâni (de exemplu la 8, 12 și 16 săptămâni) reprezintă o încercare de a 'prinde' momentul perfect când imunitatea maternă scade sub un nivel protector, dar animalul este încă tânăr și vulnerabil. Doar astfel garantăm o imunitate solidă și de durată." },
      { question: "Sunt periculoase vaccinurile? Am auzit povești despre reacții adverse grave.", answer: "Riscul asociat bolilor prevenite prin vaccinare este incomparabil mai mare decât riscul unor reacții adverse la vaccin.\n· Reacții comune și normale: Un animal mai apatic, somnoros sau cu o ușoară sensibilitate la locul injecției pentru 24-48 de ore este o reacție normală a sistemului imunitar care 'lucrează'.\n\n Reacții adverse rare: Reacții alergice (umflare a feței, mâncărimi) sau hipersensibilitate severă sunt foarte rare. Tocmai de aceea, se recomandă ca vaccinarea să fie făcută la cabinet veterinar și animalul să fie observat pentru scurt timp după administrare. Beneficiul >> Riscul: Boli ca Parvoviroza, Leptospiroza sau Rabia pot fi fatale și extrem de costisitoare de tratat. Vaccinarea este cea mai sigură și mai economică metodă de prevenție." },


    ],
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
      { title: "Mobilitate și Conformitate Legală Europeană", description: "Pașaport UE și înregistrare RECS pentru călătorii în siguranță și în conformitate cu legislația națională și internațională." },
      { title: "Identificare Permanentă și Recuperare în Siguranță", description: "Microciparea asigură identificarea sigură și rapidă a animalului în caz de pierdere, facilitând găsirea si revenirea acestuia acasă." },
      { title: "Gestiune Medicală Digitală Centralizată", description: "Istoric medical digital complet și actualizat automat, oferind acces rapid la datele medicale și schemele de tratament." },
      { title: "Alerte Proactive pentru Îngrijire Continuă", description: "Notificări automate pentru vaccinări, deparazitări și consultații, asigurând urmărirea fără lacune a sănătății animalului." }
    ],
    process: [],
    faq: [
      {
        question: "Care sunt serviciile administrative principale oferite pentru identificarea și documentarea animalului de companie?", answer: "Serviciile administrative oferite includ: eliberarea carnetului de sănătate, eliberarea pașaportului UE, microtipare, înregistrarea în RECS (Registrul Electronic Național), menținerea unui istoric medical digital și primirea notificărilor automate."
      },
      {
        question: "De ce este importantă microtipare și care este principalul său beneficiu menționat?", answer: "Microciparea este o metodă de identificare permanentă și sigură, recomandată pentru toate animalele de companie. Principalul său beneficiu este siguranța, permițând găsirea rapidă a animalului în caz că se pierde, prin scanarea cipului."
      },
      {
        question: "Cum asigură clinica respectarea programărilor și a tratamentelor preventive pentru animale?", answer: "Clinica asigură organizarea și respectarea programărilor prin notificări automate. Acestea sunt alerte care avertizează proprietarul cu privire la datele pentru rapeluri de vaccin, deparazitări sau consultații periodice, astfel încât acestea să nu fie uitate."
      },
    ],
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
      { title: "Rapiditate în Obținerea și Interpretarea Rezultatelor", description: "Teste rapide și analize on-site pentru un diagnostic imediat, esențial în situații de urgență și pentru inițierea promptă a tratamentului." },
      { title: "Precizie și Fiabilitate Diagnostică Avansată", description: "Echipamente de laborator de ultimă generație și panouri complete de investigație pentru o evaluare detaliată și precisă a sănătății organismului." },
      { title: "Tehnici Minim Invazive și Confort Pentru Pacient", description: "Proceduri de prelevare ghidate (ecografic/endoscopic) care asigură colectarea precisă a probelor cu disconfort redus și recuperare rapidă." },
      { title: "Expertiză și Interpretare Clinică Integrată", description: "Rezultatele sunt analizate și corelate de medici veterinari pentru a oferi un diagnostic clar și un plan de acțiune personalizat, nu doar date brute." }
    ],
    process: [],
    faq: [],
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
      { title: "Diagnostic Avansat și Non-Invaziv", description: "Tehnici de imagistică (ecografie, endoscopie) ce permit explorarea internă precisă fără intervenție chirurgicală, minimizând stresul și riscul pentru pacient." },
      { title: "Monitorizare Precisă a Sarcinii și a Sănătății Organelor", description: "Ecografie specializată pentru urmărirea dezvoltării fetale și evaluarea în timp real a structurilor interne, esențială pentru diagnostic și planificare terapeutică." },
      { title: "Vizualizare în Timp Real pentru Decizii Informate", description: "Imagini instantanee și dinamice ale organelor, oferind medicului veterinar informația necesară pentru un diagnostic rapid și o strategie de tratament clară." },
      {
        title: "Integrare Cu Investigațiile de Laborator", description: "Corelarea examenelor clinice cu rezultatele imagistice si cu analizele de laborator, pentru o imagine completă și multidimensională a stării de sănătate a animalului."
      }
    ],
    process: [],
    faq: [
      {
        question: "Ce servicii de imagistică veterinară sunt oferite pentru diagnostic?", answer: "Clinica oferă servicii de ecografie (inclusiv pentru monitorizarea gestației) și endoscopie. Acestea permit vizualizarea internă, non-invazivă, a organelor și a tractului digestiv."
      },
      {
        question: "Care este principalul avantaj al tehnicilor de imagistică menționate?", answer: "Principalul avantaj este că aceste tehnici sunt non-invazive, adică se realizează fără durere și fără riscuri majore pentru animal, oferind în același timp un diagnostic clar prin imagini în timp real."
      },

    ],
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
      { title: "Expertiză Medicală Specializată", description: "Acces direct la medici  veterinari cu competențe avansate în domenii specifice, asigurând un diagnostic precis și un plan terapeutic optim." },
      { title: "Tehnologie și Echipamente Dedicate", description: "Proceduri efectuate cu aparatură modernă (ex: Endoscop, Ecograf, Analizor Biochimie, Hematologie. Etc.), pentru intervenții sigure, precise și minim invazive." },
      { title: "Abordare Terapeutică Personalizată", description: "Tratamente adaptate nevoilor individuale ale animalului, luând în considerare vârsta, rasa, istoricul medical și stilul de viață." },
      {
        title: "Consiliere Continuă și Urmărire", description: "Suport și îndrumare oferite proprietarului în toate fazele – de la diagnostic și tratament până la prevenția recidivelor și îngrijirea pe termen lung."
      }
    ],
    process: [],
    faq: [
      {
        question: "Care sunt domeniile de specialitate pentru care se oferă consultații avansate?", answer: "Se oferă consultații de specialitate în următoarele domenii: Dermatologie, Obstetrică și ginecologie, Oncologie, Stomatologie, precum și Nutriție și comportament."
      },
      {
        question: "Ce servicii specifice sunt incluse în specialitatea de Stomatologie?", answer: "Stomatologia veterinară include servicii precum: detartraj, extracții dentare, alte tratamente dentare și îngrijire orală completă. Acestea sunt efectuate cu ajutorul tehnologiei dedicate, cum ar fi detartrajul cu ultrasunete."
      },
      {
        question: "Cum se asigură abordarea cazurilor complexe și prevenirea revenirii problemelor de sănătate?", answer: "Cazurile complexe sunt abordate prin tratament țintit, oferind soluții specifice pentru afecțiuni dificile. Prevenirea recidivelor este susținută prin consiliere și educarea proprietarilor pentru gestionarea corectă a sănătății animalului."
      },
    ],
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
      { title: "Siguranță Chirurgicală și Anestezică Avansată", description: "Intervenții desfășurate sub monitorizare intra operatorie continuă a parametrilor vitali  cu utilizarea anesteziei inhalatorii pentru un risc minimizat și o recuperare mai rapidă." },
      { title: "Experiență în Managementul Cazurilor Complexe", description: "Echipă chirurgicală specializată, pregătită pentru a aborda traumatisme, urgențe și patologii chirurgicale dificile cu tehnică avansata și cu discernământ." },
      { title: "Tehnologie și Protocoale pentru Recuperare Optimă", description: "Gestiunea modernă a durerii și protocoale terapeutice intensive postoperatorii care accelerează vindecarea și asigură confortul pacientului." },
      {
        title: "Îngrijire Critică și Monitorizare Continuă", description: "Terapie intensivă dedicată și supraveghere 24 ore din 24 pentru pacienții în stare gravă, asigurând o tranziție stabilă către recuperare."
      }
    ],
    process: [],
    faq: [
      {
        question: "Ce servicii specifice sunt oferite în departamentul de „Intervenții & Urgente”?", answer: "Serviciile oferite includ: chirurgie modernă și sigură, terapie intensivă cu monitorizare continuă, anestezie inhalatorie avansată, traumatologie pentru gestionarea leziunilor și fracturilor și monitorizare intraoperatorie a tuturor parametrilor vitali."
      },
      {
        question: "Care este beneficiul principal al utilizării anesteziei inhalatorii, așa cum este menționat?", answer: "Principalul beneficiu al anesteziei inhalatorii este că este o tehnică avansată care asigură o recuperare rapidă și o siguranță sporită pentru animal în timpul și după intervenția chirurgicală."
      },
      {
        question: "Cum se asigură „Siguranța Maximă” și „Recuperarea Rapidă” în timpul procedurilor chirurgicale?", answer: "Siguranța Maximă este asigurată prin combinarea anesteziei inhalatorii și a monitorizării continue a funcțiilor vitale pe durata intervenției. Recuperarea Rapidă este favorizată de aplicarea protocoalelor moderne de gestionare a durerii."
      }
    ],
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
      { title: "Monitorizare Medicală Continuă și Specializată", description: "Supraveghere non-stop, 24/24, asigurată de personal medical calificat, pentru intervenție imediată la orice modificare a stării pacientului." },
      { title: "Terapie Intensivă și Plan de Recuperare Personalizat", description: "Administrare precisă a medicației (injectabile, perfuzii), gestionarea durerii și un protocol terapeutic adaptat nevoilor specifice ale fiecărui animal." },
      { title: ". Mediu Controlat, Sigur și Confortabil", description: "Spații de internare dedicate, încălzite, igienizate și liniștite, concepute pentru a reduce stresul și a promova vindecarea rapidă." },
      { title: "Facilități și Tehnologie pentru Îngrijire Integrată", description: "Acces la toate resursele clinice (imagistică, laborator) direct din sala de spitalizare, asigurând o continuitate perfectă a îngrijirii." }
    ],
    process: [],
    faq: [],
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
  }
];