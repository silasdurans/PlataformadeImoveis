import { useEffect, useState } from "react";
import { properties as seedProperties } from "../app/data/properties";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001/api";
export const PROPERTIES_UPDATED_EVENT = "grupo-sp-properties:updated";
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

type ApiProperty = {
  id?: number | string;
  title?: string;
  type?: string;
  price?: number;
  location?: string;
  size?: number;
  capacity?: number;
  rating?: number;
  image?: string;
  lat?: number;
  lng?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  images?: string[] | string | null;
  description?: string;
  status?: Property["status"];
  created_at?: string;
  updated_at?: string;
};

type PropertyDraft = Partial<Property> &
  Pick<Property, "title" | "description" | "price" | "location">;

const isBrowser = () => typeof window !== "undefined";

const dispatchPropertiesEvent = () => {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event(PROPERTIES_UPDATED_EVENT));
};

const getFallbackFeatures = (property: Partial<Property>) => {
  if (property.features?.length) {
    return property.features;
  }

  const features: string[] = [];

  if (property.image || property.images?.length) {
    features.push("Galeria de imagens");
  }

  if ((property.bathrooms ?? 0) > 0) {
    features.push(`${property.bathrooms} banheiro(s)`);
  }

  if ((property.bedrooms ?? 0) > 0) {
    features.push(`${property.bedrooms} ambiente(s)`);
  }

  return features.length ? features : ["Disponivel para consulta"];
};

const normalizeImages = (images?: string[] | string | null, fallbackImage?: string) => {
  if (Array.isArray(images)) {
    const validImages = images.filter((image) => typeof image === "string" && image.trim());
    if (validImages.length) {
      return validImages;
    }
  }

  if (typeof images === "string" && images.trim()) {
    return [images];
  }

  if (fallbackImage?.trim()) {
    return [fallbackImage];
  }

  return [DEFAULT_IMAGE];
};

type NormalizableProperty = Partial<Property & ApiProperty>;

const normalizeProperty = (property: NormalizableProperty, index = 0): Property => {
  const imageList = normalizeImages(
    property.images,
    typeof property.image === "string" ? property.image : undefined,
  );
  const mainImage = imageList[0] ?? DEFAULT_IMAGE;
  const size = Number(property.size ?? property.area ?? 60);
  const bedrooms = Number(property.bedrooms ?? 0);
  const capacity = Number(property.capacity ?? bedrooms ?? 4) || Math.max(4, bedrooms * 2);
  const bathrooms = Number(property.bathrooms ?? Math.max(1, Math.round(size / 40)));
  const timestamp = property.created_at ?? new Date().toISOString();

  return {
    id: String(property.id ?? `${Date.now()}-${index}`),
    title: property.title?.trim() || "Imovel sem titulo",
    type: property.type?.trim() || "Imovel",
    price: Number(property.price ?? 0),
    location: property.location?.trim() || "Localizacao nao informada",
    size,
    capacity,
    rating: Number(property.rating ?? 4.7),
    image: mainImage,
    images: imageList,
    description: property.description?.trim() || "Descricao nao informada.",
    features: getFallbackFeatures(property as Partial<Property>),
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

const fallbackProperties: Property[] = seedProperties.map((property, index) =>
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

const sortProperties = (properties: Property[]) =>
  [...properties].sort((first, second) =>
    (second.created_at ?? "").localeCompare(first.created_at ?? ""),
  );

const requestJson = async <T>(input: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(input, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`);
  }

  return response.json() as Promise<T>;
};

const toApiPayload = (property: Partial<Property>) => {
  const validImages = (property.images ?? []).filter((image) => image.trim());
  const mainImage = property.image || validImages[0] || DEFAULT_IMAGE;
  const images = validImages.length ? validImages : [mainImage];

  return {
    title: property.title?.trim() || "",
    description: property.description?.trim() || "",
    price: Number(property.price ?? 0),
    location: property.location?.trim() || "",
    bedrooms: Number(property.bedrooms ?? Math.max(1, Math.round(Number(property.capacity ?? 4) / 2))),
    bathrooms: Number(property.bathrooms ?? Math.max(1, Math.round(Number(property.area ?? property.size ?? 60) / 40))),
    area: Number(property.area ?? property.size ?? 60),
    images,
    type: property.type?.trim() || "Imovel",
    status: property.status ?? "disponivel",
  };
};

export const getAllProperties = async (): Promise<Property[]> => {
  try {
    const data = await requestJson<ApiProperty[]>(`${API_URL}/properties`);
    return sortProperties(data.map((property, index) => normalizeProperty(property, index)));
  } catch (error) {
    console.error("Erro ao carregar propriedades da API:", error);
    return sortProperties(fallbackProperties);
  }
};

export const renderizarImoveis = async (): Promise<Property[]> => getAllProperties();

export const getPropertyById = async (id: string): Promise<Property | undefined> => {
  try {
    const data = await requestJson<ApiProperty>(`${API_URL}/properties/${id}`);
    return normalizeProperty(data);
  } catch (error) {
    console.error(`Erro ao carregar propriedade ${id}:`, error);
    return fallbackProperties.find((property) => property.id === id);
  }
};

export const addProperty = async (
  property: Omit<Property, "id" | "created_at" | "updated_at">,
): Promise<string> => {
  const data = await requestJson<{ id: number | string }>(`${API_URL}/properties`, {
    method: "POST",
    body: JSON.stringify(toApiPayload(property)),
  });

  dispatchPropertiesEvent();
  return String(data.id);
};

export const updateProperty = async (id: string, updates: Partial<Property>): Promise<void> => {
  await requestJson<{ message: string }>(`${API_URL}/properties/${id}`, {
    method: "PUT",
    body: JSON.stringify(toApiPayload(updates)),
  });

  dispatchPropertiesEvent();
};

export const deleteProperty = async (id: string): Promise<void> => {
  await requestJson<{ message: string }>(`${API_URL}/properties/${id}`, {
    method: "DELETE",
  });

  dispatchPropertiesEvent();
};

export const salvarImovel = async (property: PropertyDraft): Promise<Property> => {
  const id = await addProperty(property as Omit<Property, "id" | "created_at" | "updated_at">);
  const createdProperty = await getPropertyById(id);

  return createdProperty ?? normalizeProperty({ ...property, id });
};

export const initializeDatabase = async (): Promise<void> => {
  await getAllProperties();
};

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    let active = true;

    const syncProperties = async () => {
      const nextProperties = await getAllProperties();
      if (active) {
        setProperties(nextProperties);
      }
    };

    syncProperties();
    window.addEventListener(PROPERTIES_UPDATED_EVENT, syncProperties);

    return () => {
      active = false;
      window.removeEventListener(PROPERTIES_UPDATED_EVENT, syncProperties);
    };
  }, []);

  return properties;
};
