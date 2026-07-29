import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Clock, Mail, MapPin, Phone, WhatsAppIcon } from "@/components/icons";
import { getContact, waGenericUrl } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Reach Prestige Holidays 4U in Bengaluru — phone, WhatsApp, email, or the enquiry form. Office in HBR Layout, open Monday to Sunday.",
};

export default function ContactPage() {
  const c = getContact();
  const addr = c.address;
  const mapsQuery = encodeURIComponent(
    `${addr.line1}, ${addr.line2}, ${addr.city}, ${addr.state} ${addr.pincode}`,
  );

  return (
    <>
      <section className="bg-paper-100">
        <div className="mx-auto max-w-[1200px] px-4 py-16 lg:px-12">
          <h1 className="font-display text-3xl font-semibold text-primary-700 lg:text-[2.5rem]">
            Get in touch
          </h1>
          <p className="mt-3 max-w-[68ch] text-lg text-ink-600">
            Questions, dates, half-formed plans — all welcome. WhatsApp is fastest;
            everything below works.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 py-16 lg:grid-cols-[2fr_1fr] lg:px-12">
        <section aria-label="Enquiry form">
          <h2 className="mb-6 font-display text-2xl font-semibold text-ink-900">
            Send us a message
          </h2>
          <EnquiryForm variant="contact" whatsappNumber={c.whatsapp_number} email={c.email} />
        </section>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl bg-paper-0 p-6 shadow-card">
            <h2 className="font-display text-[1.375rem] font-semibold text-ink-900">
              {c.business_name}
            </h2>
            <ul className="mt-4 space-y-4 text-ink-600">
              <li>
                <a href={c.phone_href} className="flex items-center gap-3 font-semibold text-primary-600 hover:text-primary-700">
                  <Phone size={20} className="shrink-0" /> {c.phone}
                </a>
              </li>
              <li>
                <a
                  href={waGenericUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-semibold text-primary-600 hover:text-primary-700"
                >
                  <WhatsAppIcon size={20} className="shrink-0" /> Chat on WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${c.email}`} className="flex items-center gap-3 font-semibold text-primary-600 hover:text-primary-700">
                  <Mail size={20} className="shrink-0" /> {c.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 shrink-0" />
                <span>
                  {addr.line1}, {addr.line2}, {addr.city}, {addr.state} – {addr.pincode}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block font-semibold text-primary-600 hover:text-primary-700"
                  >
                    Open in Google Maps →
                  </a>
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl bg-primary-100 p-6">
            <h3 className="flex items-center gap-2 font-display text-[1.375rem] font-semibold text-primary-700">
              <Clock size={20} /> Office hours
            </h3>
            <table className="mt-3 w-full text-primary-700">
              <tbody>
                {c.office_hours.map((h) => (
                  <tr key={h.days}>
                    <td className="py-1 pr-4 font-semibold">{h.days}</td>
                    <td className="py-1">{h.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </aside>
      </div>
    </>
  );
}
