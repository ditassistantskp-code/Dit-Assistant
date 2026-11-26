import {useState, useEffect, type FormEvent} from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MessageSquare,
  Phone,
} from 'lucide-react';
import {
  COMPANY_INFO,
  PACKAGES,
  type PackageTier,
  type ServiceItem,
} from '../data/services';

interface ContactSectionProps {
  services: ServiceItem[];
  selectedServiceId: string;
  onChangeServiceId: (id: string) => void;
  selectedPackage: PackageTier;
  onChangePackage: (tier: PackageTier) => void;
}

export function ContactSection({
  services,
  selectedServiceId,
  onChangeServiceId,
  selectedPackage,
  onChangePackage,
}: ContactSectionProps) {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [projectNotes, setProjectNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedBrief, setSubmittedBrief] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (
      services.length > 0 &&
      !services.some((service) => service.id === selectedServiceId)
    ) {
      onChangeServiceId(services[0].id);
    }
  }, [services, selectedServiceId, onChangeServiceId]);

  const activeService =
    services.find((s) => s.id === selectedServiceId) || services[0];

  const composedMessage = [
    `Hello ${COMPANY_INFO.name},`,
    clientName.trim() ? `Name: ${clientName.trim()}` : null,
    clientEmail.trim() ? `Email: ${clientEmail.trim()}` : null,
    activeService ? `Service: ${activeService.title}` : null,
    `Package: ${selectedPackage}`,
    projectNotes.trim()
      ? `Project Details: ${projectNotes.trim()}`
      : 'I would like to discuss requirements and timeline.',
  ]
    .filter(Boolean)
    .join('\n');

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumberE164}?text=${encodeURIComponent(
    composedMessage
  )}`;

  const handleValidateBrief = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!clientName.trim()) {
      setErrorMessage('Please enter your name so we know who to address.');
      return;
    }

    if (clientEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(clientEmail.trim())) {
        setErrorMessage('Please enter a valid email address or leave it blank.');
        return;
      }
    }

    if (projectNotes.trim().length < 10) {
      setErrorMessage(
        'Please share a short summary of your task (at least 10 characters).'
      );
      return;
    }

    setSubmittedBrief(true);
  };

  const handleCopyBrief = async () => {
    try {
      await navigator.clipboard.writeText(
        `WhatsApp: ${COMPANY_INFO.whatsappDisplay}\n\n${composedMessage}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact Channels */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium text-emerald-700 mb-2">
              Direct Inquiry &amp; Quote Desk
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance mb-4">
              Start a conversation on WhatsApp or order on Fiverr.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
              Build your brief on the right to generate a structured WhatsApp message, or reach out directly using any of the verified channels below.
            </p>

            <div className="border border-slate-200 rounded-xl divide-y divide-slate-200 bg-slate-50/50">
              <div className="p-5 flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-500 mb-1">
                    WhatsApp Business Line
                  </div>
                  <div className="text-base font-bold font-mono tabular-nums text-slate-900">
                    {COMPANY_INFO.whatsappDisplay}
                  </div>
                  <div className="text-xs text-slate-500 font-mono tabular-nums mt-0.5">
                    International: {COMPANY_INFO.whatsappIntl}
                  </div>
                </div>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumberE164}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Open Chat</span>
                </a>
              </div>

              <div className="p-5 flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-500 mb-1">
                    Fiverr Profile &amp; Gigs
                  </div>
                  <div className="text-sm font-semibold text-slate-900">
                    {COMPANY_INFO.fiverrHandle}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Protected marketplace checkout
                  </div>
                </div>
                <a
                  href={COMPANY_INFO.fiverrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:border-slate-400 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Visit Fiverr</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-5 flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Email Desk</div>
                  <div className="text-sm font-semibold text-slate-900">
                    {COMPANY_INFO.email}
                  </div>
                </div>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:border-slate-400 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive WhatsApp Brief Builder */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleValidateBrief}
              className="border border-slate-200 rounded-xl p-6 sm:p-8 bg-white space-y-5"
              noValidate
            >
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Project Brief Builder
                  </h3>
                  <p className="text-xs text-slate-500">
                    Select a service and package to pre-fill your WhatsApp message.
                  </p>
                </div>
                <span className="text-xs font-mono tabular-nums text-slate-500 whitespace-nowrap shrink-0">
                  {COMPANY_INFO.whatsappDisplay}
                </span>
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5"
                >
                  {errorMessage}
                </div>
              )}

              {submittedBrief && (
                <div
                  role="status"
                  className="text-xs text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-lg p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>
                      Your brief is validated and ready. Click{' '}
                      <strong>Send Brief on WhatsApp</strong> below to launch the chat.
                    </span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="brief-name"
                    className="block text-xs font-medium text-slate-700 mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    id="brief-name"
                    type="text"
                    value={clientName}
                    onChange={(e) => {
                      setClientName(e.target.value);
                      setSubmittedBrief(false);
                    }}
                    placeholder="e.g. Ayesha Khan"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label
                    htmlFor="brief-email"
                    className="block text-xs font-medium text-slate-700 mb-1.5"
                  >
                    Email Address (Optional)
                  </label>
                  <input
                    id="brief-email"
                    type="email"
                    value={clientEmail}
                    onChange={(e) => {
                      setClientEmail(e.target.value);
                      setSubmittedBrief(false);
                    }}
                    placeholder="you@company.com"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="brief-service"
                    className="block text-xs font-medium text-slate-700 mb-1.5"
                  >
                    Service Required
                  </label>
                  <select
                    id="brief-service"
                    value={activeService?.id || ''}
                    onChange={(e) => {
                      onChangeServiceId(e.target.value);
                      setSubmittedBrief(false);
                    }}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title} (From ${service.startingPrice})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="brief-package"
                    className="block text-xs font-medium text-slate-700 mb-1.5"
                  >
                    Engagement Package
                  </label>
                  <select
                    id="brief-package"
                    value={selectedPackage}
                    onChange={(e) => {
                      onChangePackage(e.target.value as PackageTier);
                      setSubmittedBrief(false);
                    }}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    {PACKAGES.map((pkg) => (
                      <option key={pkg.name} value={pkg.name}>
                        {pkg.name} ({pkg.priceLabel})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="brief-notes"
                  className="block text-xs font-medium text-slate-700 mb-1.5"
                >
                  Task Scope &amp; Deadline
                </label>
                <textarea
                  id="brief-notes"
                  rows={3}
                  value={projectNotes}
                  onChange={(e) => {
                    setProjectNotes(e.target.value);
                    setSubmittedBrief(false);
                  }}
                  placeholder="Describe the files, pages, data volume, or target deadline..."
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
                />
              </div>

              {/* Live Preview Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-medium text-slate-500">
                    Message Preview
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyBrief}
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-700 hover:text-slate-900"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Brief</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-xs font-mono text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {composedMessage}
                </pre>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Brief on WhatsApp</span>
                </a>

                <button
                  type="submit"
                  className="px-4 py-3 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:border-slate-400 hover:text-slate-900 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                >
                  Validate Brief
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
