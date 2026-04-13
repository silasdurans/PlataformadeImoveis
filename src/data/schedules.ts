import { useEffect, useState } from "react";

export type ScheduleStatus = "agendado" | "confirmado" | "cancelado";

export interface ScheduleItem {
  id: number;
  propertyTitle: string;
  clientName: string;
  clientEmail: string;
  clientId?: string;
  date: string;
  time: string;
  status: ScheduleStatus;
  notes?: string;
  createdAt?: string;
}

const STORAGE_KEY = "grupo-sp-schedules";
const STORAGE_EVENT = "grupo-sp-schedules:updated";

const defaultSchedules: ScheduleItem[] = [
  {
    id: 1,
    propertyTitle: "Apartamento Luxuoso no Centro",
    clientName: "Ana Clara",
    clientEmail: "ana@email.com",
    date: "2026-04-15",
    time: "10:30",
    status: "agendado",
    notes: "Verificar disponibilidade de mobília",
    createdAt: "2026-04-10T10:30:00.000Z",
  },
  {
    id: 2,
    propertyTitle: "Casa com Jardim",
    clientName: "Ricardo Silva",
    clientEmail: "ricardo@email.com",
    date: "2026-04-17",
    time: "14:00",
    status: "confirmado",
    notes: "Solicitar visita com corretor",
    createdAt: "2026-04-10T14:00:00.000Z",
  },
  {
    id: 3,
    propertyTitle: "Terreno para Construção",
    clientName: "Mariana Souza",
    clientEmail: "mariana@email.com",
    date: "2026-04-19",
    time: "09:00",
    status: "cancelado",
    notes: "Reagendar após envio de documentação",
    createdAt: "2026-04-11T09:00:00.000Z",
  },
];

const isBrowser = () => typeof window !== "undefined";

const dispatchSchedulesEvent = () => {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event(STORAGE_EVENT));
};

const saveSchedules = (schedules: ScheduleItem[]) => {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
  dispatchSchedulesEvent();
};

export const getSchedules = (): ScheduleItem[] => {
  if (!isBrowser()) {
    return defaultSchedules;
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    saveSchedules(defaultSchedules);
    return defaultSchedules;
  }

  try {
    return JSON.parse(raw) as ScheduleItem[];
  } catch {
    saveSchedules(defaultSchedules);
    return defaultSchedules;
  }
};

export const addSchedule = (schedule: Omit<ScheduleItem, "id" | "createdAt">): ScheduleItem => {
  const schedules = getSchedules();
  const newSchedule: ScheduleItem = {
    ...schedule,
    id: schedules.length > 0 ? Math.max(...schedules.map((item) => item.id)) + 1 : 1,
    createdAt: new Date().toISOString(),
  };

  saveSchedules([newSchedule, ...schedules]);
  return newSchedule;
};

export const updateSchedule = (id: number, updates: Partial<ScheduleItem>) => {
  const schedules = getSchedules().map((schedule) =>
    schedule.id === id ? { ...schedule, ...updates } : schedule,
  );

  saveSchedules(schedules);
};

export const deleteSchedule = (id: number) => {
  saveSchedules(getSchedules().filter((schedule) => schedule.id !== id));
};

export const useSchedules = () => {
  const [schedules, setSchedules] = useState<ScheduleItem[]>(() => getSchedules());

  useEffect(() => {
    const sync = () => setSchedules(getSchedules());

    window.addEventListener(STORAGE_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(STORAGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return schedules;
};
