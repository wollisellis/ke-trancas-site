import { promises as fs } from 'fs';
import path from 'path';
import { CMSData } from '@/types/cms';

const CMS_FILE = path.join(process.cwd(), 'data', 'cms.json');

const fallbackCMS: CMSData = {
  settings: {
    brandName: 'Kê Tranças',
    heroTitle: 'Faço uma arte que transforma a sua autoestima.',
    heroSubtitle: 'Trancista sem dor, com mais de 100 clientes atendidas em Limeira, SP.',
    whatsappUrl: 'https://wa.me/5519996165314',
    instagramUrl: 'https://instagram.com/ketrancass',
    supportText: 'Atendimento via WhatsApp de segunda a sábado. Limeira, SP.',
    trustItems: ['Trança sem dor, com cuidado', 'Mais de 100 clientes atendidas', 'Limeira, SP'],
    paymentItems: ['Pix com desconto', 'Cartão em até 6x', 'Boleto'],
    reasons: [],
    categoryImages: [],
    hairTypeGuide: []
  },
  products: [],
  videos: [],
  reviews: []
};

async function ensureCMSFile() {
  const dir = path.dirname(CMS_FILE);
  await fs.mkdir(dir, { recursive: true });

  try {
    await fs.access(CMS_FILE);
  } catch {
    await fs.writeFile(CMS_FILE, JSON.stringify(fallbackCMS, null, 2), 'utf-8');
  }
}

function normalizeCMS(payload: CMSData): CMSData {
  return {
    settings: {
      ...payload.settings,
      trustItems: payload.settings.trustItems ?? [],
      paymentItems: payload.settings.paymentItems ?? [],
      reasons: payload.settings.reasons ?? [],
      categoryImages: payload.settings.categoryImages ?? [],
      hairTypeGuide: payload.settings.hairTypeGuide ?? []
    },
    products: (payload.products ?? []).map((item) => ({ ...item, tags: item.tags ?? [], howToUse: item.howToUse ?? [] })),
    videos: payload.videos ?? [],
    reviews: payload.reviews ?? []
  };
}

export function isCMSData(payload: unknown): payload is CMSData {
  if (!payload || typeof payload !== 'object') return false;
  const maybe = payload as Partial<CMSData>;
  return Boolean(maybe.settings && Array.isArray(maybe.products) && Array.isArray(maybe.videos) && Array.isArray(maybe.reviews));
}

export async function readCMS(): Promise<CMSData> {
  await ensureCMSFile();
  const raw = await fs.readFile(CMS_FILE, 'utf-8');

  try {
    return normalizeCMS(JSON.parse(raw) as CMSData);
  } catch {
    await fs.writeFile(CMS_FILE, JSON.stringify(fallbackCMS, null, 2), 'utf-8');
    return fallbackCMS;
  }
}

export async function writeCMS(nextData: CMSData): Promise<CMSData> {
  await ensureCMSFile();
  const normalized = normalizeCMS(nextData);
  await fs.writeFile(CMS_FILE, JSON.stringify(normalized, null, 2), 'utf-8');
  return normalized;
}
