export type Lineage =
  | "Ilé-Ifẹ̀"
  | "Òṣogbo"
  | "Ọ̀yọ́ Traditional"
  | "Matanzas / Abeokuta";

export type Language = "English" | "Spanish" | "Yorùbá";

export type Awo = {
  id: string;
  name: string;
  title: string;
  years: number;
  lineage: Lineage;
  languages: Language[];
  nextSlot: string;
  bio: string;
  sanctuary: string;
  odus: string;
  photo: string;
};

export type Slot = {
  id: string;
  label: string;
  period: "morning" | "afternoon";
};

export type Day = {
  iso: string;
  weekday: string;
  day: number;
  month: string;
  blocked?: string;
};

export type Booking = {
  id: string;
  consultant: string;
  natal: string;
  date: string;
  slot: string;
  status: "Confirmed" | "Preparing";
  room: string;
};
