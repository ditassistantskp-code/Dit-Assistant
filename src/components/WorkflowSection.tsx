import {COMPANY_INFO} from '../data/services';

export function WorkflowSection() {
  const steps = [
    {
      index: '01',
      title: 'Share Your Brief',
      detail:
        'Send your task requirements, files, or target website link via WhatsApp (0324-8708581) or start an order directly on our Fiverr profile.',
    },
    {
      index: '02',
      title: 'Confirm Scope & Timeline',
      detail:
        'Within two hours during business coverage, we review your inputs and send back a clear deliverable list, fixed price, and delivery deadline.',
    },
    {
      index: '03',
      title: 'Execution & Clean Handoff',
      detail:
        'We complete the work with structured checkpoints, deliver editable source files or live updates, and handle revisions promptly until sign-off.',
    },
  ];

  return (
    <section id="workflow" className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <p className="text-xs font-medium text-emerald-700 mb-2">
              How We Work
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance mb-3">
              Predictable delivery from first message to final file.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-5">
              Whether you hire {COMPANY_INFO.name} for a single spreadsheet cleanup or a weekly operations retainer, communication stays direct and documented.
            </p>
            <div className="text-xs text-slate-500 space-y-1 pt-4 border-t border-slate-200">
              <div>
                Fiverr:{' '}
                <a
                  href={COMPANY_INFO.fiverrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-800 font-medium hover:underline"
                >
                  fiverr.com/ditassistantskp
                </a>
              </div>
              <div>
                WhatsApp:{' '}
                <span className="font-mono tabular-nums text-slate-800 font-medium">
                  {COMPANY_INFO.whatsappIntl}
                </span>
              </div>
              <div>
                Email:{' '}
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-slate-800 font-medium hover:underline"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 divide-y divide-slate-200 bg-white border border-slate-200 rounded-xl">
            {steps.map((step) => (
              <div
                key={step.index}
                className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8"
              >
                <span className="text-sm font-mono tabular-nums font-semibold text-emerald-700 shrink-0 pt-0.5">
                  {step.index}.
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
