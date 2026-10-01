/*
 * Student Collection – alle Inhalte der Seite.
 * Hier Motive, Preise, Farben und Termine pflegen. Das HTML muss dafür nicht angefasst werden.
 * Bildpfade sind relativ zur index.html.
 */
window.COLLECTION = {
  school: {
    name: "BSZ Altmühlfranken",
    long: "Staatliches Berufliches Schulzentrum Altmühlfranken",
    site: "Gunzenhausen · Weißenburg",
    year: "2026/27"
  },

  // Microsoft-Forms-Umfrage: wird für alle Bestell-Buttons und den QR-Code verwendet
  orderUrl: "https://forms.cloud.microsoft/e/0tEHYFaLzT?origin=lprLink",

  // Bestellfrist im Format "JJJJ-MM-TT" – oder null, solange sie noch nicht feststeht
  deadline: "2026-11-01",

  // Artikel mit Preis und verfügbaren Farben
  products: [
    {
      id: "hoodie",
      name: "Hoodie",
      price: 42,
      sizes: "XS – XXL",
      details: "Kapuze, Kängurutasche, Motiv vorne oder auf dem Rücken",
      colors: ["weiss", "schwarz", "grau"]
    },
    {
      id: "tshirt",
      name: "T-Shirt",
      price: 22,
      sizes: "XS – XXL",
      details: "Klassischer Schnitt, Motiv vorne",
      colors: ["weiss", "schwarz", "grau"]
    }
  ],

  colors: {
    weiss:   { name: "Weiß",    hex: "#f3f2ee" },
    schwarz: { name: "Schwarz", hex: "#1b1b1d" },
    grau:    { name: "Grau",    hex: "#a9abae" }
  },

  /*
   * Motive. artist/className leer lassen, wenn (noch) keine Namensnennung gewünscht ist.
   * byStudents: false markiert Motive, die nicht von Schüler*innen stammen.
   * variants: ein Bild pro Farbe (Schlüssel aus "colors").
   */
  // Titel = Namen im Bestellformular, damit Eltern sie dort wiederfinden
  motifs: [
    {
      id: "bunny", title: "Bunny", artist: "", className: "", byStudents: true,
      placement: "Front", variants: { weiss: "img/motifs/bunny-style.webp" }
    },
    {
      id: "blitz", title: "Blitz", artist: "", className: "", byStudents: true,
      placement: "Front", variants: { schwarz: "img/motifs/lighting.webp" }
    },
    {
      id: "wolke", title: "Wolke", artist: "", className: "", byStudents: true,
      placement: "Front", variants: { schwarz: "img/motifs/knowledge-cloud.webp" }
    },
    {
      id: "the-building", title: "The Building", artist: "", className: "", byStudents: true,
      placement: "Front", variants: { weiss: "img/motifs/in-da-building.webp" }
    },
    {
      id: "the-cat", title: "The Cat?", artist: "", className: "", byStudents: true,
      placement: "Front", variants: { schwarz: "img/motifs/i-like-cats.webp" }
    },
    {
      id: "goeteh", title: "Göteh!", artist: "", className: "", byStudents: true,
      placement: "Rücken",
      variants: { weiss: "img/motifs/hier-bin-ich-schule-white.webp", schwarz: "img/motifs/hier-bin-ich-schule-black.webp" }
    },
    {
      id: "unity", title: "Unity", artist: "", className: "", byStudents: false,
      note: "Sondermotiv: vereint Wirtschaftsschule (grün), Berufsschule Gunzenhausen (rot), Weißenburg (gelb) und Meisterschule (blau).",
      placement: "Front", variants: { grau: "img/motifs/unity.webp" }
    }
  ],

  // Lookbook: Stimmungsbilder
  lookbook: [
    { src: "img/look/schulfamilie-1.webp", alt: "Zwei Schüler*innen in Hoodies der Student Collection" },
    { src: "img/look/poster-1.webp", alt: "Gruppe in Student-Collection-Hoodies, Rückenansicht" },
    { src: "img/look/duo.webp", alt: "Zwei Personen in Hoodies mit Unity- und Wirtschaftsschule-Motiv" },
    { src: "img/look/schulfamilie-2.webp", alt: "Gruppe von Schüler*innen in verschiedenen Motiven" },
    { src: "img/look/uffel.webp", alt: "Lehrkraft im grauen Unity-Hoodie" },
    { src: "img/look/poster-2.webp", alt: "Student Collection – Identity. Bildung. Haltung." }
  ],

  steps: [
    { title: "Aussuchen", text: "Motiv, Artikel, Farbe und Größe hier auf der Seite auswählen." },
    { title: "Bestellen", text: "Das kurze Formular über den Bestell-Button oder den QR-Code ausfüllen." },
    { title: "Bezahlen", text: "Die Infos zur Bezahlung kommen nach der Bestellung." },
    { title: "Tragen", text: "Die Ausgabe erfolgt in der Schule. Ihr werdet informiert, sobald die Ware da ist." }
  ],

  contact: { email: "timo.schulz@bs-af.de" }
};
