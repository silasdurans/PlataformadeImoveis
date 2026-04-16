/**
 * Modal de reserva inspirado no fluxo do Airbnb.
 * Permite selecionar mais de uma data e horário comercial antes da confirmação.
 */
import { useMemo, useState } from "react";
import { Calendar as CalendarIcon, CheckCircle2, Clock3, Plus, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

import { addSchedule, getSchedules } from "../../../data/schedules";
import { Calendar } from "../ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const COMMERCIAL_HOURS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

const pad = (value: number) => String(value).padStart(2, "0");

const formatDateKey = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const dateFromKey = (dateKey: string) => new Date(`${dateKey}T12:00:00`);

const formatLongDate = (date: Date) =>
  date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const simulatedBookings: Record<string, string[]> = {
  [formatDateKey(new Date(new Date().setDate(new Date().getDate() + 2)))]: ["10:00", "15:00"],
  [formatDateKey(new Date(new Date().setDate(new Date().getDate() + 4)))]: ["08:00", "14:00", "17:00"],
  [formatDateKey(new Date(new Date().setDate(new Date().getDate() + 6)))]: ["09:00", "16:00"],
};

interface ScheduleVisitModalProps {
  propertyTitle: string;
}

interface ReservationOption {
  date: string;
  time: string;
}

export function ScheduleVisitModal({ propertyTitle }: ScheduleVisitModalProps) {
  const navigate = useNavigate();
  const today = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  }, []);

  const [month, setMonth] = useState(today);
  const [activeDate, setActiveDate] = useState<Date | undefined>(today);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<ReservationOption[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const activeDateKey = activeDate ? formatDateKey(activeDate) : "";

  const isDateDisabled = (date: Date) => {
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    const isPast = compareDate < today;
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    return isPast || isWeekend;
  };

  const bookedTimes = activeDateKey
    ? [
        ...(simulatedBookings[activeDateKey] ?? []),
        ...getSchedules()
          .filter(
            (schedule) =>
              schedule.propertyTitle === propertyTitle &&
              schedule.date === activeDateKey &&
              schedule.status !== "cancelado",
          )
          .map((schedule) => schedule.time),
        ...selectedOptions
          .filter((option) => option.date === activeDateKey)
          .map((option) => option.time),
      ]
    : [];

  const handleAddOption = () => {
    if (!activeDateKey || !selectedTime) {
      return;
    }

    const alreadyExists = selectedOptions.some(
      (option) => option.date === activeDateKey && option.time === selectedTime,
    );

    if (alreadyExists) {
      setFeedbackMessage("Essa combinação de data e horário já foi adicionada.");
      return;
    }

    setSelectedOptions((current) => [...current, { date: activeDateKey, time: selectedTime }]);
    setSelectedTime("");
    setFeedbackMessage("");
    setConfirmed(false);
  };

  const handleRemoveOption = (optionToRemove: ReservationOption) => {
    setSelectedOptions((current) =>
      current.filter(
        (option) =>
          !(option.date === optionToRemove.date && option.time === optionToRemove.time),
      ),
    );
    setConfirmed(false);
  };

  const handleConfirm = async () => {
    if (!selectedOptions.length) {
      return;
    }

    const sessionRaw = localStorage.getItem("grupo-sp-client-session");
    if (!sessionRaw) {
      setFeedbackMessage("Faça login como cliente para concluir a reserva.");
      setConfirmed(false);
      setTimeout(() => navigate("/cliente/login"), 900);
      return;
    }

    try {
      const session = JSON.parse(sessionRaw) as { id: string; name: string; email: string };

      await Promise.all(
        selectedOptions.map((option) =>
          addSchedule({
            propertyTitle,
            clientName: session.name,
            clientEmail: session.email,
            clientId: session.id,
            date: option.date,
            time: option.time,
            status: "agendado",
            notes: `Reserva criada pelo cliente ${session.name}.`,
          }),
        ),
      );

      setFeedbackMessage(
        `Os dados de ${session.name} e ${selectedOptions.length} reserva(s) foram enviados para a agenda do painel administrativo.`,
      );
      setConfirmed(true);
    } catch {
      setFeedbackMessage("Nao foi possivel validar a sessao do cliente. Faca login novamente.");
      setConfirmed(false);
    }
  };

  const selectedSummary = selectedOptions
    .map((option) => ({
      ...option,
      label: formatLongDate(dateFromKey(option.date)),
    }))
    .sort((first, second) =>
      `${first.date}-${first.time}`.localeCompare(`${second.date}-${second.time}`),
    );

  const activeDateLabel = activeDate ? formatLongDate(activeDate) : "Selecione uma data";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F172A] py-3 text-white shadow-lg shadow-[#0F172A]/20 transition-all hover:bg-[#1E293B]"
        >
          <CalendarIcon className="size-5" />
          Reserva
        </motion.button>
      </DialogTrigger>

      <DialogContent className="max-w-6xl overflow-hidden rounded-[32px] border-0 p-0">
        <DialogHeader className="border-b border-slate-200 px-6 py-5 sm:px-8">
          <DialogTitle className="text-2xl text-[#0F172A]">Reservar horarios</DialogTitle>
          <DialogDescription className="mt-2 text-slate-500">
            Escolha uma ou mais datas e combine com horarios comerciais para reservar <strong>{propertyTitle}</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-6 sm:px-8">
          <div className="mb-6 rounded-[28px] border border-slate-200 bg-white p-3 shadow-sm">
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-300 bg-white px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Data</p>
                <p className="mt-2 text-sm font-semibold text-[#0F172A]">{activeDateLabel}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Horario</p>
                <p className="mt-2 text-sm font-semibold text-[#0F172A]">
                  {selectedTime || "Selecione um horario comercial"}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Opcoes</p>
                <p className="mt-2 text-sm font-semibold text-[#0F172A]">
                  {selectedOptions.length} data(s) e horario(s) adicionados
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 text-center">
                <h3 className="text-xl font-semibold text-[#0F172A]">Escolha as datas</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Calendario com navegacao em dois meses, inspirado no visual do Airbnb.
                </p>
              </div>

              <Calendar
                mode="single"
                month={month}
                onMonthChange={setMonth}
                selected={activeDate}
                onSelect={(date) => {
                  if (!date || isDateDisabled(date)) {
                    return;
                  }
                  setActiveDate(date);
                  setSelectedTime("");
                  setConfirmed(false);
                }}
                disabled={isDateDisabled}
                numberOfMonths={2}
                pagedNavigation
                showOutsideDays={false}
                className="mx-auto w-fit p-0"
                classNames={{
                  months: "flex flex-col gap-10 lg:flex-row lg:gap-14",
                  month: "space-y-4",
                  caption: "relative flex items-center justify-center pt-1",
                  caption_label: "text-base font-semibold capitalize text-[#0F172A]",
                  nav_button:
                    "absolute top-0 inline-flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-[#0F172A]",
                  nav_button_previous: "-left-1",
                  nav_button_next: "-right-1",
                  head_row: "flex w-full",
                  head_cell: "w-12 text-[12px] font-medium text-slate-400",
                  row: "mt-2 flex w-full",
                  cell: "relative h-12 w-12 p-0 text-center text-sm",
                  day: "h-12 w-12 rounded-full p-0 font-medium text-slate-700 hover:bg-slate-100 hover:text-[#0F172A]",
                  day_selected:
                    "bg-[#0F172A] text-white hover:bg-[#0F172A] hover:text-white focus:bg-[#0F172A] focus:text-white",
                  day_today: "border border-slate-300 bg-white text-[#0F172A]",
                  day_disabled: "cursor-not-allowed text-slate-300 line-through opacity-100",
                }}
                modifiers={{
                  added: selectedOptions.map((option) => dateFromKey(option.date)),
                }}
                modifiersClassNames={{
                  added: "border border-cyan-500 bg-cyan-50 text-[#0F172A] hover:bg-cyan-100",
                }}
              />
            </div>

            <div className="space-y-6">
              <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F172A] text-white">
                    <Clock3 className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Horarios comerciais</p>
                    <h3 className="text-lg font-semibold text-[#0F172A]">Escolha um horario</h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {COMMERCIAL_HOURS.map((hour) => {
                    const isBooked = bookedTimes.includes(hour);
                    const isSelected = selectedTime === hour;

                    return (
                      <button
                        key={hour}
                        type="button"
                        disabled={!activeDate || isBooked}
                        onClick={() => setSelectedTime(hour)}
                        className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                          isBooked
                            ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                            : isSelected
                            ? "border-[#0F172A] bg-[#0F172A] text-white shadow-lg"
                            : "border-slate-200 bg-white text-slate-700 hover:border-[#0F172A] hover:text-[#0F172A]"
                        }`}
                      >
                        {hour}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleAddOption}
                  disabled={!activeDate || !selectedTime}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0F172A] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1E293B] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Plus className="size-4" />
                  Adicionar data e horario
                </button>
              </div>

              <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-[#0F172A]">Opcoes selecionadas</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Monte quantas combinacoes quiser antes de confirmar a reserva.
                </p>

                {selectedSummary.length ? (
                  <div className="mt-4 space-y-3">
                    {selectedSummary.map((option) => (
                      <div
                        key={`${option.date}-${option.time}`}
                        className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                      >
                        <div>
                          <p className="text-sm font-semibold text-[#0F172A]">{option.label}</p>
                          <p className="text-xs text-slate-500">{option.time}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveOption(option)}
                          className="rounded-full p-2 text-slate-500 transition hover:bg-white hover:text-red-600"
                          aria-label="Remover opcao"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                    Selecione uma data no calendario, escolha um horario comercial e adicione sua primeira opcao.
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6 gap-3">
            <DialogClose asChild>
              <button className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                Fechar
              </button>
            </DialogClose>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!selectedOptions.length}
              className="rounded-2xl bg-[#0F172A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1E293B] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Confirmar reserva
            </button>
          </DialogFooter>
        </div>

        {confirmed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-6 mb-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900 shadow-sm sm:mx-8"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 size-6 text-emerald-700" />
              <div>
                <p className="text-lg font-semibold">Reserva confirmada!</p>
                <p className="mt-1 text-sm text-emerald-900/90">
                  {selectedOptions.length > 1
                    ? `Suas ${selectedOptions.length} opcoes de reserva foram registradas com sucesso.`
                    : `Sua reserva foi registrada para ${selectedSummary[0]?.label} as ${selectedSummary[0]?.time}.`}
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  {feedbackMessage || "Em breve um representante entrara em contato para confirmar os detalhes."}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {!confirmed && feedbackMessage && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-6 mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 sm:mx-8"
          >
            {feedbackMessage}
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
