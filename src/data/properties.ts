import { useEffect, useState } from "react";
import { properties as seedProperties } from "../app/data/properties";

const STORAGE_KEY = "grupo-sp-properties";
const STORAGE_EVENT = "grupo-sp-properties:updated";
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80";

export interface Property {
  id: string;
  title: string;
  type: string;
  price: number;
  location: string;
  size: number;
  capacity: number;
  rating: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  lat: number;
  lng: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  status: "disponivel" | "vendido" | "alugado";
  created_at?: string;
  updated_at?: string;
}

type PropertyDraft = Partial<Property> &
  Pick<Property, "title" | "description" | "price" | "location">;

const isBrowser = () => typeof window !== "undefined";

const dispatchPropertiesEvent = () => {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event(STORAGE_EVENT));
};

const normalizeProperty = (property: Partial<Property>, index = 0): Property => {
  // Mantem compatibilidade entre os dados antigos do site e os novos cadastros do painel.
  const mainImage = property.image || property.images?.[0] || DEFAULT_IMAGE;
  const size = Number(property.size ?? property.area ?? 60);
  const capacity = Number(property.capacity ?? property.bedrooms ?? 4);
  const bedrooms = Number(property.bedrooms ?? Math.max(1, Math.round(capacity / 2)));
  const bathrooms = Number(property.bathrooms ?? Math.max(1, Math.round(size / 40)));
  const timestamp = property.created_at ?? new Date().toISOString();

  return {
    id: property.id ?? `${Date.now()}-${index}`,
    title: property.title?.trim() || "Imovel sem titulo",
    type: property.type?.trim() || "Imovel",
    price: Number(property.price ?? 0),
    location: property.location?.trim() || "Localizacao nao informada",
    size,
    capacity,
    rating: Number(property.rating ?? 4.7),
    image: mainImage,
    images:
      property.images?.filter((image) => image.trim())?.length
        ? property.images.filter((image) => image.trim())
        : [mainImage],
    description: property.description?.trim() || "Descricao nao informada.",
    features:
      property.features?.length
        ? property.features
        : ["Imagem principal cadastrada", "Disponivel para consulta"],
    lat: Number(property.lat ?? -2.5297),
    lng: Number(property.lng ?? -44.3028),
    bedrooms,
    bathrooms,
    area: Number(property.area ?? size),
    status: property.status ?? "disponivel",
    created_at: timestamp,
    updated_at: property.updated_at ?? timestamp,
  };
};

const defaultProperties: Property[] = seedProperties.map((property, index) =>
  normalizeProperty(
    {
      ...property,
      area: property.size,
      bedrooms: Math.max(1, Math.round(property.capacity / 2)),
      bathrooms: Math.max(1, Math.round(property.size / 40)),
      status: "disponivel",
    },
    index,
  ),
);

const savePropertiesToStorage = (properties: Property[]) => {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  dispatchPropertiesEvent();
};

const loadPropertiesFromStorage = (): Property[] => {
  if (!isBrowser()) {
    return defaultProperties;
  }

  const storedProperties = localStorage.getItem(STORAGE_KEY);

  if (!storedProperties) {
    savePropertiesToStorage(defaultProperties);
    return defaultProperties;
  }

  try {
    const parsedProperties = JSON.parse(storedProperties) as Partial<Property>[];
    return parsedProperties.map((property, index) => normalizeProperty(property, index));
  } catch {
    savePropertiesToStorage(defaultProperties);
    return defaultProperties;
  }
};

export const renderizarImoveis = (): Property[] =>
  loadPropertiesFromStorage().sort((first, second) =>
    (second.created_at ?? "").localeCompare(first.created_at ?? ""),
  );

export const salvarImovel = (property: PropertyDraft): Property => {
  // Centraliza a persistencia para que painel, home e busca usem a mesma base.
  const currentProperties = renderizarImoveis();
  const now = new Date().toISOString();
  const newProperty = normalizeProperty(
    {
      ...property,
      id: property.id ?? crypto.randomUUID(),
      image: property.image || property.images?.[0] || DEFAULT_IMAGE,
      images:
        property.images?.filter((image) => image.trim())?.length
          ? property.images.filter((image) => image.trim())
          : [property.image || DEFAULT_IMAGE],
      created_at: property.created_at ?? now,
      updated_at: now,
    },
    currentProperties.length,
  );

  savePropertiesToStorage([newProperty, ...currentProperties]);
  return newProperty;
};

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>(() => renderizarImoveis());

  useEffect(() => {
    const syncProperties = () => {
      setProperties(renderizarImoveis());
    };

    syncProperties();
    window.addEventListener(STORAGE_EVENT, syncProperties);
    window.addEventListener("storage", syncProperties);

    return () => {
      window.removeEventListener(STORAGE_EVENT, syncProperties);
      window.removeEventListener("storage", syncProperties);
    };
  }, []);

  return properties;
};

export const getAllProperties = async (): Promise<Property[]> => renderizarImoveis();

export const getPropertyById = async (id: string): Promise<Property | undefined> =>
  renderizarImoveis().find((property) => property.id === id);

export const addProperty = async (
  property: Omit<Property, "id" | "created_at" | "updated_at">,
): Promise<string> => salvarImovel(property).id;

export const updateProperty = async (id: string, updates: Partial<Property>): Promise<void> => {
  const updatedProperties = renderizarImoveis().map((property) =>
    property.id === id
      ? normalizeProperty({
          ...property,
          ...updates,
          id,
          updated_at: new Date().toISOString(),
        })
      : property,
  );

  savePropertiesToStorage(updatedProperties);
};

export const deleteProperty = async (id: string): Promise<void> => {
  const filteredProperties = renderizarImoveis().filter((property) => property.id !== id);
  savePropertiesToStorage(filteredProperties);
};

export const initializeDatabase = async (): Promise<void> => {
  renderizarImoveis();
};
