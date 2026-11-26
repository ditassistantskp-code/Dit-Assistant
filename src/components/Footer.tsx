import {BRAND_LOGO_PATH, COMPANY_INFO} from '../data/services';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-center gap-3.5">
          <img
            src={BRAND_LOGO_PATH}
            alt="Dit Assistants logo"
            className="h-10 w-16 rounded-md object-cover border border-slate-800 shrink-0"
          />
          <div>
            <div className="text-base font-bold text-white tracking-tight mb-1">
              {COMPANY_INFO.name}
            </div>
          <p className="text-xs text-slate-400">
            WhatsApp{' '}
            <span className="font-mono tabular-nums text-slate-200">
              {COMPANY_INFO.whatsappDisplay}
            </span>{' '}
            ·{' '}
            <a
              href={COMPANY_INFO.fiverrUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white underline underline-offset-2"
            >
              fiverr.com/ditassistantskp
            </a>{' '}
            ·{' '}
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="hover:text-white underline underline-offset-2"
            >
              {COMPANY_INFO.email}
            </a>
          </p>
          </div>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
          <a href="#services" className="hover:text-white transition-colors">
            Services
          </a>
          <a href="#packages" className="hover:text-white transition-colors">
            Packages
          </a>
          <a href="#workflow" className="hover:text-white transition-colors">
            Workflow
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
        </nav>

        <div className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
