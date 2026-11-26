import {ArrowUpRight, Check, Plus, Pencil} from 'lucide-react';
import {
  SERVICE_CATEGORIES,
  type ServiceCategory,
  type ServiceItem,
} from '../data/services';
import {SafeImage} from './SafeImage';

interface ServicesSectionProps {
  services: ServiceItem[];
  activeCategory: ServiceCategory;
  onSelectCategory: (category: ServiceCategory) => void;
  onSelectServiceForBrief: (service: ServiceItem) => void;
  onOpenManager: () => void;
}

export function ServicesSection({
  services,
  activeCategory,
  onSelectCategory,
  onSelectServiceForBrief,
  onOpenManager,
}: ServicesSectionProps) {
  const filteredServices =
    activeCategory === 'All'
      ? services
      : services.filter((service) => service.category === activeCategory);

  return (
    <section id="services" className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium text-emerald-700 mb-2">
              Service Catalog · Order on Fiverr or WhatsApp
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
              Core Services &amp; Capabilities
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Functional Segmented Category Filter */}
            <div
              role="tablist"
              aria-label="Filter services by category"
              className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg"
            >
              {SERVICE_CATEGORIES.map((category) => {
                const active = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => onSelectCategory(category)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
                      active
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={onOpenManager}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:border-slate-400 hover:text-slate-900 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add / Edit Services</span>
            </button>
          </div>
        </div>

        {/* Empty State if a category has no items */}
        {filteredServices.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
            <p className="text-sm text-slate-600 mb-4">
              No services listed under {activeCategory} yet.
            </p>
            <button
              type="button"
              onClick={onOpenManager}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-emerald-700 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add a Service</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, idx) => {
              const numberLabel = String(idx + 1).padStart(2, '0');
              const isHeroBentoCard =
                activeCategory === 'All' && idx === 0 && Boolean(service.image);

              return (
                <article
                  key={service.id}
                  className={`bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between transition-colors duration-150 hover:border-slate-300 ${
                    isHeroBentoCard ? 'md:col-span-2 lg:col-span-2 lg:grid lg:grid-cols-12' : ''
                  }`}
                >
                  {service.image && (
                    <div
                      className={`bg-slate-100 overflow-hidden ${
                        isHeroBentoCard
                          ? 'lg:col-span-5 h-56 lg:h-full border-b lg:border-b-0 lg:border-r border-slate-200'
                          : 'aspect-[4/3] border-b border-slate-200'
                      }`}
                    >
                      <SafeImage
                        src={service.image}
                        alt={service.title}
                        fallbackTitle={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div
                    className={`p-6 flex flex-col justify-between flex-1 ${
                      isHeroBentoCard ? 'lg:col-span-7' : ''
                    }`}
                  >
                    <div>
                      {/* Clean unboxed metadata line */}
                      <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono tabular-nums font-medium text-slate-700">
                            {numberLabel}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{service.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">{service.deliveryTime}</span>
                        </div>
                        <span className="font-mono tabular-nums text-xs font-semibold text-slate-900 whitespace-nowrap shrink-0">
                          From ${service.startingPrice}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-slate-900 leading-snug mb-2.5">
                        {service.title}
                      </h3>

                      <p className="text-sm text-slate-600 leading-relaxed mb-5">
                        {service.summary}
                      </p>

                      {service.deliverables.length > 0 && (
                        <ul className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                          {service.deliverables.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-xs text-slate-700"
                            >
                              <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => onSelectServiceForBrief(service)}
                        className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-emerald-700 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                      >
                        Request via WhatsApp
                      </button>

                      <a
                        href={service.fiverrUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 hover:underline underline-offset-4 whitespace-nowrap shrink-0 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-sm"
                      >
                        <span>Fiverr Gig</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Quiet note for owner customization */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 pt-6 border-t border-slate-200">
          <p>
            Need a custom scope outside these listings? Send your task details on WhatsApp ({' '}
            <span className="font-mono tabular-nums text-slate-700">0324-8708581</span> ) or order via{' '}
            <a
              href="https://www.fiverr.com/ditassistantskp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-800 underline underline-offset-2 hover:text-emerald-700"
            >
              fiverr.com/ditassistantskp
            </a>
            .
          </p>
          <button
            type="button"
            onClick={onOpenManager}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 whitespace-nowrap shrink-0 self-start sm:self-auto"
          >
            <Pencil className="w-3 h-3" />
            <span>Customize Catalog ({services.length})</span>
          </button>
        </div>
      </div>
    </section>
  );
}
