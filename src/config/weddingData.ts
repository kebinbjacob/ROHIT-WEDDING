export interface WeddingEvent {
  id: string;
  title: string;
  badge: string;
  date: string;
  time: string;
  malayalamCalendar?: string;
  venue: string;
  landmark: string;
  city: string;
  mapUrl: string;
  isPrimaryMuhurtham?: boolean;
  startTime: string; // ISO
  endTime: string;   // ISO
  description?: string;
}

export const weddingData = {
  couple: {
    groom: {
      name: "Rohith",
      fullName: "Rohith R",
      parentsTitle: "Son of",
      parents: "Mr. Raghavan K & Mrs. Nisha K",
      residence: "Koolikkatt House, Ponmundam (P.O), Vailathur, Tirur",
      phones: ["8301 846 206", "9846 190 645"],
    },
    bride: {
      name: "Haritha",
      fullName: "Haritha R",
      parentsTitle: "D/o",
      parents: "Mr. Ramakrishnan P & Mrs. Girija M",
      residence: "Padinjarethil House, Mannanur (P.O), Kavalappara Via, Palakkad",
    },
    hashtag: "#RohithWedsHaritha",
    monogram: "R & H",
    portraitUrl: "/couple-portrait.png",
    originalCardUrl: "/invitation_original.png",
  },
  ceremony: {
    targetDateISO: "2026-11-15T09:00:00+05:30",
    displayDate: "Sunday, 15 November 2026",
    malayalamDate: "Thulam 29, 1202",
    muhurtham: "09:00 AM – 10:00 AM",
  },
  tradition: {
    invocation: "|| Om Sri Ganeshaya Namaha ||",
    greeting: "We cordially invite your esteemed presence and blessings with family on the auspicious occasion of the marriage of our son",
    compliments: "With best compliments from : Sarath & Family Members",
    blessingQuote: "“May love, harmony and blissful togetherness grace this divine bond across all journeys of life.”",
  },
  events: [
    {
      id: "thalikettu",
      title: "Marriage Solemnization (Thalikettu)",
      badge: "Divine Muhurtham",
      date: "Sunday, 15 November 2026",
      malayalamCalendar: "Thulam 29, 1202",
      time: "9:00 AM – 10:00 AM",
      venue: "Mayilvahanam Community Hall",
      landmark: "Chuduvalathur, Shoranur",
      city: "Palakkad, Kerala",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Mayilvahanam+Community+Hall+Chuduvalathur+Shoranur",
      isPrimaryMuhurtham: true,
      startTime: "2026-11-15T09:00:00+05:30",
      endTime: "2026-11-15T10:00:00+05:30",
      description: "The sacred Thalikettu solemnizing the eternal union of Rohith and Haritha amidst auspicious Vedic mantras and blessings."
    },
    {
      id: "reception",
      title: "Grand Wedding Reception",
      badge: "Celebration & Feast",
      date: "Sunday, 15 November 2026",
      time: "4:30 PM & 8:00 PM",
      venue: "Master Auditorium",
      landmark: "Areekkad Road, Ittilakkal",
      city: "Vailathur, Tirur, Malappuram, Kerala",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Master+Auditorium+Areekkad+Road+Ittilakkal+Vailathur",
      isPrimaryMuhurtham: false,
      startTime: "2026-11-15T16:30:00+05:30",
      endTime: "2026-11-15T20:00:00+05:30",
      description: "Join us with your family for an evening of warmth, photography, joyful fellowship, and celebratory traditional dinner."
    }
  ] as WeddingEvent[],
  contacts: {
    primaryPhone: "+91 98461 90645",
    secondaryPhone: "+91 83018 46206",
    whatsappNumber: "919846190645",
    sarathCompliments: "Sarath & Family Members"
  },
  googleForms: {
    enabled: true,
    // Google Form formResponse endpoint format
    formActionUrl: "https://docs.google.com/forms/d/e/1FAIpQLSc_EXAMPLE_FORM_ID/formResponse",
    entryIds: {
      name: "entry.1045781291",
      attendance: "entry.2005620554",
      guests: "entry.1166974658",
      events: "entry.839337160",
      wishes: "entry.1065046570"
    }
  },
  audio: {
    trackTitle: "Mangalya Nadaswaram & Temple Flute",
    raga: "Raga Mohanam / Kalyani",
    composer: "Traditional Auspicious Wedding Ragas",
    trackUrl: "" // Synthetic Web Audio synthesizer engine provides rich fallback
  }
};
