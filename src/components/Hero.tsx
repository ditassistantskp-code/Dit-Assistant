import {ArrowUpRight, MessageSquare} from 'lucide-react';
import {BRAND_LOGO_PATH, COMPANY_INFO} from '../data/services';
import {SafeImage} from './SafeImage';

export function Hero() {
  const directWhatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumberE164}?text=${encodeURIComponent(
    'Hello Dit Assistants, I would like to discuss a project.'
  )}`;

  const highlights = [
    {
      index: '01',
      label: 'Direct WhatsApp Desk',
      value: COMPANY_INFO.whatsappDisplay,
      href: directWhatsappUrl,
      external: true,
    },
    {
      index: '02',
      label: 'Fiverr Storefront',
      value: COMPANY_INFO.fiverrHandle,
      href: COMPANY_INFO.fiverrUrl,
      external: true,
    },
    {
      index: '03',
      label: 'First Response',
      value: 'Under 2 Hours',
      href: '#contact',
      external: false,
    },
    {
      index: '04',
      label: 'Standard Delivery',
      value: '24–72 Hours',
      href: '#services',
      external: false,
    },
  ];

  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-12 pb-14 lg:pt-16 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Value Proposition & Primary Action */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs font-medium text-slate-500 tracking-normal mb-4">
              {COMPANY_INFO.name} · Fiverr Seller {COMPANY_INFO.fiverrHandle} · WhatsApp {COMPANY_INFO.whatsappDisplay}
            </p>

            <h1 className="text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.08] font-bold tracking-tight text-slate-900 text-balance mb-5">
              Dedicated digital assistance, data operations, and web support.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-[60ch] mb-8">
              We handle recurring administrative workflows, clean spreadsheet systems, website builds, and business presentations so you can stay focused on growth. Order securely through Fiverr or message our WhatsApp desk directly for custom quotes.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={directWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={COMPANY_INFO.fiverrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-3 text-sm font-semibold text-slate-800 bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
              >
                <span>View Fiverr Profile</span>
                <ArrowUpRight className="w-4 h-4 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Right Column: Official Dit Assistants Brand Visual */}
          <div className="lg:col-span-6">
            <div className="aspect-video rounded-xl border border-slate-200 overflow-hidden bg-slate-900">
              <SafeImage
                src={BRAND_LOGO_PATH}
                alt="Dit Assistants — Office Assistant, Data Entry, Virtual Assistant & IT Support"
                fallbackTitle="Dit Assistants"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Operational Strip Below Hero Split */}
        <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-slate-200">
          {highlights.map((item, idx) => (
            <div
              key={item.index}
              className={`${idx > 0 ? 'lg:pl-8' : ''} ${idx < 3 ? 'lg:pr-8' : ''}`}
            >
              <div className="text-xs font-mono tabular-nums text-slate-400 mb-1">
                {item.index} · {item.label}
              </div>
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-base font-semibold text-slate-900 hover:text-emerald-700 transition-colors font-mono tabular-nums"
                >
                  <span>{item.value}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
              ) : (
                <a
                  href={item.href}
                  className="inline-block text-base font-semibold text-slate-900 hover:text-emerald-700 transition-colors font-mono tabular-nums"
                >
                  {item.value}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
