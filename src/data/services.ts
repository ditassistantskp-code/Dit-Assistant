import heroWorkspaceImg from '../assets/images/hero_dit_workspace_1795668401055.jpg';
import virtualOpsImg from '../assets/images/service_virtual_ops_1795668400419.jpg';
import webDesignImg from '../assets/images/service_web_design_1795668403430.jpg';
import dataSystemsImg from '../assets/images/service_data_systems_1795668402806.jpg';

export type ServiceCategory =
  | 'All'
  | 'Virtual Assistance'
  | 'Data & Documents'
  | 'Web & Tech'
  | 'Design & Branding';

export type PackageTier = 'Starter Task' | 'Growth Retainer' | 'Dedicated Studio';

export interface ServiceItem {
  id: string;
  title: string;
  category: Exclude<ServiceCategory, 'All'>;
  summary: string;
  deliverables: string[];
  startingPrice: number;
  deliveryTime: string;
  fiverrUrl: string;
  image?: string;
  featured?: boolean;
}

export const COMPANY_INFO = {
  name: 'Dit Assistants',
  fiverrUrl: 'https://www.fiverr.com/ditassistantskp',
  fiverrHandle: '@ditassistantskp',
  whatsappDisplay: '0324-8708581',
  whatsappIntl: '+92 324 8708581',
  whatsappNumberE164: '923248708581',
  email: 'ditassistantskp@gmail.com',
};

export const BRAND_LOGO_PATH = `${import.meta.env.BASE_URL}assets/aistudio/Professional_Office_Assistant_Portrait_e255c116.png`;

export const HERO_IMAGE_PATH = heroWorkspaceImg;

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  'All',
  'Virtual Assistance',
  'Data & Documents',
  'Web & Tech',
  'Design & Branding',
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'virtual-executive-assistant',
    title: 'Executive Virtual Assistance & Daily Operations',
    category: 'Virtual Assistance',
    summary:
      'Dedicated inbox triage, calendar coordination, travel logistics, vendor follow-ups, and recurring administrative workflows managed cleanly every day.',
    deliverables: [
      'Inbox & calendar management',
      'CRM updates & lead follow-up',
      'Meeting minutes & SOP documentation',
    ],
    startingPrice: 25,
    deliveryTime: '24 Hours',
    fiverrUrl: COMPANY_INFO.fiverrUrl,
    image: virtualOpsImg,
    featured: true,
  },
  {
    id: 'web-wordpress-support',
    title: 'Website Setup, Landing Pages & Technical Support',
    category: 'Web & Tech',
    summary:
      'Responsive business websites, WordPress customization, speed cleanup, landing page builds, and ongoing site maintenance with clean handoff.',
    deliverables: [
      'Responsive desktop & mobile layout',
      'Form & WhatsApp chat integration',
      'On-page SEO & speed optimization',
    ],
    startingPrice: 60,
    deliveryTime: '3 Days',
    fiverrUrl: COMPANY_INFO.fiverrUrl,
    image: webDesignImg,
    featured: true,
  },
  {
    id: 'data-entry-spreadsheets',
    title: 'Data Entry, Excel Automation & Document Conversion',
    category: 'Data & Documents',
    summary:
      'Accurate spreadsheet structuring, PDF-to-Excel/Word conversion, web research lists, and clean multi-sheet formulas built for zero manual errors.',
    deliverables: [
      'Excel / Google Sheets formatting',
      'Verified lead & contact research',
      'PDF, Word & invoice digitization',
    ],
    startingPrice: 20,
    deliveryTime: '2 Days',
    fiverrUrl: COMPANY_INFO.fiverrUrl,
    image: dataSystemsImg,
    featured: true,
  },
  {
    id: 'ecommerce-store-management',
    title: 'E-Commerce Product Listing & Store Administration',
    category: 'Virtual Assistance',
    summary:
      'Structured product uploads, SKU tagging, supplier catalog formatting, inventory tracking, and order processing across Shopify, WooCommerce, and marketplaces.',
    deliverables: [
      'SEO product titles & descriptions',
      'Variant & pricing matrix setup',
      'Order & inventory sheet sync',
    ],
    startingPrice: 30,
    deliveryTime: '2 Days',
    fiverrUrl: COMPANY_INFO.fiverrUrl,
  },
  {
    id: 'presentations-business-graphics',
    title: 'Pitch Decks, Company Profiles & Social Creatives',
    category: 'Design & Branding',
    summary:
      'Clean corporate slide decks, printable brochures, social media templates, and brand-consistent business collateral ready for client presentations.',
    deliverables: [
      'Editable PowerPoint / Canva source',
      'Consistent typography & layout grid',
      'Print-ready PDF & web exports',
    ],
    startingPrice: 35,
    deliveryTime: '2 Days',
    fiverrUrl: COMPANY_INFO.fiverrUrl,
  },
  {
    id: 'it-office-documentation',
    title: 'Technical Documentation, Forms & Back-Office Systems',
    category: 'Data & Documents',
    summary:
      'Fillable PDF forms, Notion/Trello workspace organization, client onboarding portals, and standardized reporting templates for growing teams.',
    deliverables: [
      'Fillable PDF & Google Forms setup',
      'Workspace board organization',
      'Weekly summary report templates',
    ],
    startingPrice: 25,
    deliveryTime: '24 Hours',
    fiverrUrl: COMPANY_INFO.fiverrUrl,
  },
];

export const PACKAGES: Array<{
  name: PackageTier;
  subtitle: string;
  priceLabel: string;
  turnaround: string;
  description: string;
  features: string[];
  recommended?: boolean;
}> = [
  {
    name: 'Starter Task',
    subtitle: 'Single-scope deliverable',
    priceLabel: 'From $20',
    turnaround: '24–48 Hours',
    description:
      'Ideal for well-defined tasks such as data conversion, spreadsheet cleanup, product uploads, or a focused document pack.',
    features: [
      '1 dedicated deliverable scope',
      '2 rounds of revisions included',
      'Direct WhatsApp progress updates',
      'Order via Fiverr or direct invoice',
    ],
  },
  {
    name: 'Growth Retainer',
    subtitle: 'Weekly operational support',
    priceLabel: 'From $95',
    turnaround: 'Same-Day Priority',
    description:
      'Ongoing weekly virtual assistant coverage for founders and teams needing reliable inbox, data, listing, and site maintenance.',
    features: [
      '15 hours of flexible weekly support',
      'Dedicated assistant point of contact',
      'Daily task tracker & summary log',
      'Priority WhatsApp desk access',
    ],
    recommended: true,
  },
  {
    name: 'Dedicated Studio',
    subtitle: 'Full web & operations build',
    priceLabel: 'Custom Quote',
    turnaround: '3–7 Days',
    description:
      'End-to-end website launch, multi-sheet automation, brand presentation pack, and back-office workflow setup in one milestone.',
    features: [
      'Custom website or system architecture',
      'Full documentation & team handoff',
      'Unlimited revisions during build',
      '14 days post-delivery support',
    ],
  },
];
