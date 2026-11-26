import {useState, useEffect} from 'react';
import {
  INITIAL_SERVICES,
  type PackageTier,
  type ServiceCategory,
  type ServiceItem,
} from './data/services';
import {Header} from './components/Header';
import {Hero} from './components/Hero';
import {ServicesSection} from './components/ServicesSection';
import {PackagesSection} from './components/PackagesSection';
import {WorkflowSection} from './components/WorkflowSection';
import {ContactSection} from './components/ContactSection';
import {Footer} from './components/Footer';
import {ServiceManagerModal} from './components/ServiceManagerModal';

const STORAGE_KEY = 'dit_assistants_services_v1';

export default function App() {
  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed as ServiceItem[];
        }
      }
    } catch {
      // Ignore storage read issues and fall back to starter catalog
    }
    return INITIAL_SERVICES;
  });

  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('All');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    INITIAL_SERVICES[0].id
  );
  const [selectedPackage, setSelectedPackage] =
    useState<PackageTier>('Growth Retainer');
  const [isManagerOpen, setIsManagerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
    } catch {
      // Ignore storage quota errors
    }
  }, [services]);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    }
  };

  const handleSelectServiceForBrief = (service: ServiceItem) => {
    setSelectedServiceId(service.id);
    scrollToContact();
  };

  const handleSelectPackage = (tier: PackageTier) => {
    setSelectedPackage(tier);
    scrollToContact();
  };

  const handleAddService = (newService: ServiceItem) => {
    setServices((prev) => [newService, ...prev]);
    setSelectedServiceId(newService.id);
  };

  const handleUpdateService = (updated: ServiceItem) => {
    setServices((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  };

  const handleDeleteService = (id: string) => {
    setServices((prev) => {
      const next = prev.filter((item) => item.id !== id);
      return next.length > 0 ? next : INITIAL_SERVICES;
    });
  };

  const handleResetDefaults = () => {
    setServices(INITIAL_SERVICES);
    setSelectedServiceId(INITIAL_SERVICES[0].id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />

      <main className="flex-1">
        <Hero />

        <ServicesSection
          services={services}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onSelectServiceForBrief={handleSelectServiceForBrief}
          onOpenManager={() => setIsManagerOpen(true)}
        />

        <PackagesSection
          selectedPackage={selectedPackage}
          onSelectPackage={handleSelectPackage}
        />

        <WorkflowSection />

        <ContactSection
          services={services}
          selectedServiceId={selectedServiceId}
          onChangeServiceId={setSelectedServiceId}
          selectedPackage={selectedPackage}
          onChangePackage={setSelectedPackage}
        />
      </main>

      <Footer />

      <ServiceManagerModal
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
        services={services}
        onAddService={handleAddService}
        onUpdateService={handleUpdateService}
        onDeleteService={handleDeleteService}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
