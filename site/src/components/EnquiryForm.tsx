"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Mail, WhatsAppIcon } from "./icons";

const DESTINATIONS = [
  "Goa", "Kerala", "Rajasthan", "Delhi", "Sikkim", "Kashmir", "France",
  "Switzerland", "UAE", "Thailand", "Azerbaijan", "Singapore", "Maldives",
  "Dubai", "Somewhere else",
];
const BUDGETS = ["Under ₹50K", "₹50K – ₹1L", "₹1L – ₹2L", "Above ₹2L", "Not sure yet"];
const HOTELS = ["3★", "4★", "5★"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December",
];

const field =
  "h-12 w-full rounded-lg border border-paper-200 bg-paper-0 px-4 text-ink-900 focus:border-primary-600";
const label = "mb-1.5 block font-semibold text-ink-900";

function Pills({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          role="radio"
          aria-checked={value === o}
          onClick={() => onChange(o)}
          className={`min-h-11 rounded-full border px-4 font-semibold transition-colors duration-150 ${
            value === o
              ? "border-primary-600 bg-primary-600 text-paper-0"
              : "border-paper-200 bg-paper-0 text-ink-600 hover:border-primary-600"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function EnquiryForm({
  variant,
  whatsappNumber,
  email,
}: {
  variant: "contact" | "customize";
  whatsappNumber: string;
  email: string;
}) {
  const [values, setValues] = useState<Record<string, string>>({
    adults: "2",
    children: "0",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const set = (k: string) => (v: string) => setValues((s) => ({ ...s, [k]: v }));

  // Move focus to the first invalid field after the error state commits.
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      document.querySelector<HTMLElement>("[data-error='true']")?.focus();
    }
  }, [errors]);

  function compose(): string {
    if (variant === "contact") {
      return [
        "Hello, I have an enquiry.",
        "",
        `Name: ${values.name ?? ""}`,
        values.phone ? `Phone: ${values.phone}` : null,
        `Email: ${values.email ?? ""}`,
        "",
        values.message ?? "",
      ]
        .filter((l) => l !== null)
        .join("\n");
    }
    return [
      "Hello, I would like to customize a trip.",
      "",
      `Destination: ${values.destination ?? ""}`,
      `Travel Dates: ${values.month ?? ""} ${values.year ?? ""}`.trim(),
      `Number of Adults: ${values.adults}`,
      `Number of Children: ${values.children}`,
      `Budget Range: ${values.budget ?? ""}`,
      `Departure City: ${values.departure ?? ""}`,
      `Hotel Preference (3★ / 4★ / 5★): ${values.hotel ?? ""}`,
      `Additional Requirements: ${values.requirements ?? ""}`,
    ].join("\n");
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (variant === "contact") {
      if (!values.name?.trim()) e.name = "Enter your name";
      if (!values.email?.trim() || !/^\S+@\S+\.\S+$/.test(values.email))
        e.email = "Enter a valid email address";
      if (!values.message?.trim()) e.message = "Tell us what you're planning";
    } else {
      if (!values.destination) e.destination = "Pick a destination";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(target: "whatsapp" | "email") {
    if (!validate()) return;
    const text = compose();
    if (target === "whatsapp") {
      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener",
      );
    } else {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(
        variant === "contact" ? "Website enquiry" : "Customize my trip",
      )}&body=${encodeURIComponent(text)}`;
    }
    setSent(true);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    submit("whatsapp");
  }

  const err = (k: string) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1.5 flex items-center gap-1 text-sm font-semibold text-warning-700">
        {errors[k]}
      </p>
    ) : null;

  const inputProps = (k: string) => ({
    id: k,
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
    "data-error": errors[k] ? "true" : undefined,
    value: values[k] ?? "",
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      set(k)(e.target.value),
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {variant === "contact" ? (
        <>
          <div>
            <label htmlFor="name" className={label}>Full name *</label>
            <input type="text" className={field} {...inputProps("name")} />
            {err("name")}
          </div>
          <div>
            <label htmlFor="phone" className={label}>Phone</label>
            <input type="tel" className={field} {...inputProps("phone")} />
          </div>
          <div>
            <label htmlFor="email" className={label}>Email *</label>
            <input type="email" className={field} {...inputProps("email")} />
            {err("email")}
          </div>
          <div>
            <label htmlFor="message" className={label}>Message *</label>
            <textarea rows={5} className={`${field} h-auto py-3`} {...inputProps("message")} />
            {err("message")}
          </div>
        </>
      ) : (
        <>
          <div>
            <label htmlFor="destination" className={label}>Destination *</label>
            <select className={field} {...inputProps("destination")}>
              <option value="">Choose a destination…</option>
              {DESTINATIONS.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            {err("destination")}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="month" className={label}>Travel month</label>
              <select className={field} {...inputProps("month")}>
                <option value="">Any month</option>
                {MONTHS.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="year" className={label}>Year</label>
              <select className={field} {...inputProps("year")}>
                <option value="">—</option>
                {[0, 1].map((n) => {
                  const y = new Date().getFullYear() + n;
                  return <option key={y}>{y}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="adults" className={label}>Adults</label>
              <input type="number" min={1} max={20} className={field} {...inputProps("adults")} />
            </div>
            <div>
              <label htmlFor="children" className={label}>Children</label>
              <input type="number" min={0} max={10} className={field} {...inputProps("children")} />
            </div>
          </div>
          <div>
            <span className={label}>Budget range</span>
            <Pills name="Budget range" options={BUDGETS} value={values.budget ?? ""} onChange={set("budget")} />
          </div>
          <div>
            <label htmlFor="departure" className={label}>Departure city</label>
            <input type="text" className={field} {...inputProps("departure")} />
          </div>
          <div>
            <span className={label}>Hotel preference</span>
            <Pills name="Hotel preference" options={HOTELS} value={values.hotel ?? ""} onChange={set("hotel")} />
          </div>
          <div>
            <label htmlFor="requirements" className={label}>Anything else we should know?</label>
            <textarea rows={4} className={`${field} h-auto py-3`} {...inputProps("requirements")} />
          </div>
        </>
      )}

      {sent && (
        <div className="rounded-lg bg-success-100 p-4 font-semibold text-success-600">
          Opening WhatsApp — your message is ready to send.
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent-600 px-6 font-semibold text-paper-0 transition-colors duration-150 hover:bg-accent-700"
        >
          <WhatsAppIcon size={20} /> Send on WhatsApp
        </button>
        <button
          type="button"
          onClick={() => submit("email")}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border-[1.5px] border-primary-600 px-6 font-semibold text-primary-600 transition-colors duration-150 hover:bg-primary-100"
        >
          <Mail size={20} /> Send by email
        </button>
      </div>
    </form>
  );
}
