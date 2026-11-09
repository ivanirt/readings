import type { Awo, Booking, Day, Slot } from "./types";

export const FEE = 75;

export const AWOS: Awo[] = [
  {
    id: "faleti",
    name: "Awo Fálétí Oyèwùmí",
    title: "Babalawo",
    years: 22,
    lineage: "Ilé-Ifẹ̀",
    languages: ["English", "Yorùbá"],
    nextSlot: "Wed 25 · 09:30",
    bio: "Consecrated in the Ọ̀rúnmìlà grove of Ilé-Ifẹ̀. Master of Odù corpus, ẹbọ prescription, and quiet 1-to-1 counsel.",
    sanctuary: "Ilé-Ifẹ̀, Nigeria",
    odus: "256 Odù Ifá",
    photo: "/images/awo-faleti.jpg",
  },
  {
    id: "kayode",
    name: "Ọ̀túnwò Kayòdé Abíọ́dún",
    title: "Babalawo",
    years: 18,
    lineage: "Òṣogbo",
    languages: ["English", "Spanish"],
    nextSlot: "Thu 26 · 14:00",
    bio: "Initiated in the Òṣun-Ifá lineage of Òṣogbo. Specialized in ancestral realignment and itinerant diaspora consultations.",
    sanctuary: "Òṣogbo, Nigeria",
    odus: "256 Odù Ifá",
    photo: "/images/awo-kayode.jpg",
  },
  {
    id: "babatunde",
    name: "Awo Babátúndé Adéyẹmí",
    title: "Awo",
    years: 15,
    lineage: "Ọ̀yọ́ Traditional",
    languages: ["English", "Yorùbá"],
    nextSlot: "Fri 27 · 10:00",
    bio: "Trained in the Ọ̀yọ́ court tradition. Holds the Ọpẹ̀n Ifá with medicinal-oracular synthesis under Ọ̀rúnmìlà.",
    sanctuary: "Ọ̀yọ́, Nigeria",
    odus: "256 Odù Ifá",
    photo: "/images/awo-babatunde.jpg",
  },
  {
    id: "oluwaseun",
    name: "Awo Olúwasẹ̀un Ìyálóde",
    title: "Babalawo",
    years: 19,
    lineage: "Matanzas / Abeokuta",
    languages: ["Spanish", "English", "Yorùbá"],
    nextSlot: "Tue 24 · 16:00",
    bio: "Consecrated between Abeokuta and the Matanzas house. Bridges Lucumí rigor with mainland Yorùbá Ifá computation.",
    sanctuary: "Matanzas · Abeokuta",
    odus: "256 Odù Ifá",
    photo: "/images/awo-oluwaseun.jpg",
  },
];

export const DAYS: Day[] = [
  { iso: "2026-11-23", weekday: "Mon", day: 23, month: "Nov" },
  { iso: "2026-11-24", weekday: "Tue", day: 24, month: "Nov" },
  { iso: "2026-11-25", weekday: "Wed", day: 25, month: "Nov" },
  {
    iso: "2026-11-26",
    weekday: "Thu",
    day: 26,
    month: "Nov",
    blocked: "Ọ̀sẹ̀ Ifá — sanctuary closed to public consultation",
  },
  { iso: "2026-11-27", weekday: "Fri", day: 27, month: "Nov" },
  { iso: "2026-11-28", weekday: "Sat", day: 28, month: "Nov" },
  {
    iso: "2026-11-29",
    weekday: "Sun",
    day: 29,
    month: "Nov",
    blocked: "Temple vigil — Ìtádogún eve",
  },
];

export const SLOTS: Slot[] = [
  { id: "09:30", label: "09:30 AM", period: "morning" },
  { id: "11:00", label: "11:00 AM", period: "morning" },
  { id: "14:00", label: "02:00 PM", period: "afternoon" },
  { id: "16:00", label: "04:00 PM", period: "afternoon" },
];

export const BOOKINGS: Booking[] = [
  {
    id: "IFA-2401",
    consultant: "Olúwapẹ́lúmi Reyes Adeyemi",
    natal: "04 Jun 1992 · 06:22 · Salvador, Bahia",
    date: "Tue 24 Nov",
    slot: "16:00",
    status: "Confirmed",
    room: "sanctuary/faleti-2401",
  },
  {
    id: "IFA-2502",
    consultant: "Camila Ortega",
    natal: "12 Mar 1988 · 03:14 · Mexico City",
    date: "Wed 25 Nov",
    slot: "09:30",
    status: "Confirmed",
    room: "sanctuary/faleti-2502",
  },
  {
    id: "IFA-2703",
    consultant: "James Okonkwo",
    natal: "21 Sep 1979 · 23:47 · London",
    date: "Fri 27 Nov",
    slot: "11:00",
    status: "Preparing",
    room: "sanctuary/faleti-2703",
  },
];

export const LINEAGES = [
  "Ilé-Ifẹ̀",
  "Òṣogbo",
  "Ọ̀yọ́ Traditional",
  "Matanzas / Abeokuta",
] as const;

export const LANGUAGES = ["English", "Spanish", "Yorùbá"] as const;
