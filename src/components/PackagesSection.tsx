import {Check} from 'lucide-react';
import {PACKAGES, type PackageTier} from '../data/services';

interface PackagesSectionProps {
  selectedPackage: PackageTier;
  onSelectPackage: (tier: PackageTier) => void;
}

export function PackagesSection({
  selectedPackage,
  onSelectPackage,
}: PackagesSectionProps) {
  return (
    <section id="packages" className="py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-medium text-emerald-700 mb-2">
            Flexible Engagement Models
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance mb-3">
            Clear packages for one-off tasks or ongoing team support.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Every engagement can be ordered through Fiverr escrow or coordinated directly with our WhatsApp desk for custom milestone billing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {PACKAGES.map((pkg, idx) => {
            const isSelected = selectedPackage === pkg.name;
            const num = String(idx + 1).padStart(2, '0');

            return (
              <div
                key={pkg.name}
                className={`rounded-xl border p-6 sm:p-7 flex flex-col justify-between transition-colors duration-150 ${
                  pkg.recommended
                    ? 'border-slate-900 bg-slate-50/70'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-3">
                    <span>
                      <span className="font-mono tabular-nums text-slate-700 font-medium">
                        {num}
                      </span>{' '}
                      · {pkg.subtitle}
                    </span>
                    {pkg.recommended && (
                      <span className="text-xs font-semibold text-emerald-700">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {pkg.name}
                  </h3>

                  <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-slate-200">
                    <span className="text-2xl font-bold font-mono tabular-nums text-slate-900">
                      {pkg.priceLabel}
                    </span>
                    <span className="text-xs text-slate-500 font-mono tabular-nums">
                      · {pkg.turnaround}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  <ul className="space-y-2.5 mb-8">
                    {pkg.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2.5 text-sm text-slate-700"
                      >
                        <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPackage(pkg.name)}
                  className={`w-full py-2.5 px-4 text-xs font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
                    pkg.recommended || isSelected
                      ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                      : 'bg-slate-900 text-white hover:bg-emerald-700'
                  }`}
                >
                  {isSelected ? 'Selected in Project Brief' : `Select ${pkg.name}`}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
