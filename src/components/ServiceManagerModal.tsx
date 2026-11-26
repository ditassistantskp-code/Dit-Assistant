import {useState, type FormEvent} from 'react';
import {X, Trash2, RotateCcw, Plus} from 'lucide-react';
import {
  COMPANY_INFO,
  SERVICE_CATEGORIES,
  type ServiceCategory,
  type ServiceItem,
} from '../data/services';

interface ServiceManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceItem[];
  onAddService: (service: ServiceItem) => void;
  onUpdateService: (service: ServiceItem) => void;
  onDeleteService: (id: string) => void;
  onResetDefaults: () => void;
}

const EDITABLE_CATEGORIES = SERVICE_CATEGORIES.filter(
  (c): c is Exclude<ServiceCategory, 'All'> => c !== 'All'
);

export function ServiceManagerModal({
  isOpen,
  onClose,
  services,
  onAddService,
  onUpdateService,
  onDeleteService,
  onResetDefaults,
}: ServiceManagerModalProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] =
    useState<Exclude<ServiceCategory, 'All'>>('Virtual Assistance');
  const [startingPrice, setStartingPrice] = useState('25');
  const [deliveryTime, setDeliveryTime] = useState('2 Days');
  const [summary, setSummary] = useState('');
  const [deliverablesText, setDeliverablesText] = useState('');
  const [fiverrUrl, setFiverrUrl] = useState(COMPANY_INFO.fiverrUrl);
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setCategory('Virtual Assistance');
    setStartingPrice('25');
    setDeliveryTime('2 Days');
    setSummary('');
    setDeliverablesText('');
    setFiverrUrl(COMPANY_INFO.fiverrUrl);
    setFormError('');
  };

  const startEdit = (service: ServiceItem) => {
    setEditingId(service.id);
    setTitle(service.title);
    setCategory(service.category);
    setStartingPrice(String(service.startingPrice));
    setDeliveryTime(service.deliveryTime);
    setSummary(service.summary);
    setDeliverablesText(service.deliverables.join(', '));
    setFiverrUrl(service.fiverrUrl);
    setFormError('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedSummary = summary.trim();
    const priceNum = Number(startingPrice);

    if (!trimmedTitle) {
      setFormError('Please enter a service title.');
      return;
    }
    if (!trimmedSummary) {
      setFormError('Please enter a concise service description.');
      return;
    }
    if (Number.isNaN(priceNum) || priceNum <= 0) {
      setFormError('Please enter a valid starting price in USD.');
      return;
    }

    const deliverables = deliverablesText
      .split(',')
      .map((d) => d.trim())
      .filter(Boolean);

    const existing = editingId ? services.find((s) => s.id === editingId) : undefined;

    const payload: ServiceItem = {
      id: editingId || `service-${Date.now()}`,
      title: trimmedTitle,
      category,
      summary: trimmedSummary,
      deliverables:
        deliverables.length > 0
          ? deliverables
          : ['Dedicated delivery & revision support'],
      startingPrice: Math.round(priceNum),
      deliveryTime: deliveryTime.trim() || '2 Days',
      fiverrUrl: fiverrUrl.trim() || COMPANY_INFO.fiverrUrl,
      image: existing?.image,
      featured: existing?.featured,
    };

    if (editingId) {
      onUpdateService(payload);
    } else {
      onAddService(payload);
    }
    resetForm();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-[2px] p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-manager-title"
    >
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <div>
            <h2 id="service-manager-title" className="text-lg font-bold text-slate-900">
              Manage Dit Assistants Services
            </h2>
            <p className="text-xs text-slate-500">
              Add, edit, or link your exact Fiverr gigs from {COMPANY_INFO.fiverrHandle}. Changes save automatically in your browser.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close service manager"
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Column */}
          <form onSubmit={handleSubmit} className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">
                {editingId ? 'Edit Selected Service' : 'Add New Service / Fiverr Gig'}
              </h3>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs font-medium text-slate-600 hover:text-slate-900 underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {formError && (
              <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {formError}
              </p>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Service Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. WordPress Landing Page & Speed Setup"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as Exclude<ServiceCategory, 'All'>)
                  }
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  {EDITABLE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Price (USD)
                </label>
                <input
                  type="number"
                  min="5"
                  value={startingPrice}
                  onChange={(e) => setStartingPrice(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-mono tabular-nums border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Turnaround
                </label>
                <input
                  type="text"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  placeholder="2 Days"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Summary
              </label>
              <textarea
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Describe what you deliver and who it helps..."
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Key Deliverables (comma-separated)
              </label>
              <input
                type="text"
                value={deliverablesText}
                onChange={(e) => setDeliverablesText(e.target.value)}
                placeholder="Source file included, 2 revisions, Mobile responsive"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Fiverr Gig URL
              </label>
              <input
                type="url"
                value={fiverrUrl}
                onChange={(e) => setFiverrUrl(e.target.value)}
                placeholder={COMPANY_INFO.fiverrUrl}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{editingId ? 'Save Changes' : 'Add Service to Catalog'}</span>
            </button>
          </form>

          {/* Existing Services List Column */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-900">
                Active Catalog ({services.length})
              </h3>
              <button
                type="button"
                onClick={() => {
                  onResetDefaults();
                  resetForm();
                }}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restore Starter Services</span>
              </button>
            </div>

            <div className="space-y-2.5 overflow-y-auto pr-1">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`p-3.5 border rounded-lg flex items-start justify-between gap-3 ${
                    editingId === service.id
                      ? 'border-emerald-700 bg-emerald-50/40'
                      : 'border-slate-200 bg-slate-50/60'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="text-xs text-slate-500 mb-0.5">
                      {service.category} ·{' '}
                      <span className="font-mono tabular-nums">
                        ${service.startingPrice}
                      </span>{' '}
                      · {service.deliveryTime}
                    </div>
                    <div className="text-sm font-semibold text-slate-900 truncate">
                      {service.title}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => startEdit(service)}
                      className="px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-white border border-slate-200 rounded-md transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteService(service.id)}
                      aria-label={`Remove ${service.title}`}
                      className="p-1.5 text-slate-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
