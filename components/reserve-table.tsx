"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Button,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/button";

type ReserveTableContextValue = {
  open: () => void;
};

const ReserveTableContext = createContext<ReserveTableContextValue | null>(
  null,
);

function useReserveTable() {
  const ctx = useContext(ReserveTableContext);
  if (!ctx) {
    throw new Error(
      "ReserveTableButton must be used inside <ReserveTableProvider>",
    );
  }
  return ctx;
}

export function ReserveTableProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <ReserveTableContext.Provider
      value={{ open: () => dialogRef.current?.showModal() }}
    >
      {children}
      <ReserveTableDialog ref={dialogRef} />
    </ReserveTableContext.Provider>
  );
}

export function ReserveTableButton({
  children = "Reserve a Table",
  variant,
  size,
  className,
}: {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  const { open } = useReserveTable();
  return (
    <Button onClick={open} variant={variant} size={size} className={className}>
      {children}
    </Button>
  );
}

function ReserveTableDialog({
  ref,
}: {
  ref: React.RefObject<HTMLDialogElement | null>;
}) {
  const [submitted, setSubmitted] = useState<{
    name: string;
    guests: string;
    date: string;
    time: string;
  } | null>(null);

  const today = new Date().toISOString().slice(0, 10);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted({
      name: String(data.get("name") ?? ""),
      guests: String(data.get("guests") ?? ""),
      date: String(data.get("date") ?? ""),
      time: String(data.get("time") ?? ""),
    });
  }

  function handleClose() {
    setSubmitted(null);
  }

  return (
    <dialog
      ref={ref}
      onClose={handleClose}
      className="w-full max-w-md rounded-2xl bg-cream p-0 text-ink backdrop:bg-scrim"
    >
      <div className="flex flex-col gap-6 p-8">
        {submitted ? (
          <>
            <h2 className="font-display-sm text-title font-bold text-ink">
              You&rsquo;re on the list
            </h2>
            <p className="font-body text-body-lg text-ink-soft">
              Thanks, {submitted.name || "friend"} — we&rsquo;ll have a table
              for {submitted.guests || "you"} on {submitted.date || "your"}{" "}
              date at {submitted.time || "the requested time"}. We&rsquo;ll
              text you if anything needs to change.
            </p>
            <Button
              variant="dark"
              onClick={() => ref.current?.close()}
              className="self-start"
            >
              Done
            </Button>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display-sm text-title font-bold text-ink">
                  Reserve a Table
                </h2>
                <p className="font-body text-caption text-ink-muted">
                  We&rsquo;ll confirm by text within the hour.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => ref.current?.close()}
                className="font-body text-xl leading-none text-ink-soft hover:text-ink"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="font-body text-caption font-medium text-ink-soft">
                  Name
                </span>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="h-12 rounded-md border border-line-strong bg-paper px-4 font-body text-base text-ink placeholder:text-ink-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-body text-caption font-medium text-ink-soft">
                  Number of people
                </span>
                <input
                  name="guests"
                  type="number"
                  min={1}
                  max={12}
                  defaultValue={2}
                  required
                  className="h-12 rounded-md border border-line-strong bg-paper px-4 font-body text-base text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="font-body text-caption font-medium text-ink-soft">
                    Date
                  </span>
                  <input
                    name="date"
                    type="date"
                    min={today}
                    required
                    className="h-12 rounded-md border border-line-strong bg-paper px-4 font-body text-base text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-body text-caption font-medium text-ink-soft">
                    Time
                  </span>
                  <input
                    name="time"
                    type="time"
                    required
                    className="h-12 rounded-md border border-line-strong bg-paper px-4 font-body text-base text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  />
                </label>
              </div>
              <Button type="submit" variant="dark" className="mt-2">
                Confirm reservation
              </Button>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
