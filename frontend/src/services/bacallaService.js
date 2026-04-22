import { API_PATHS, buildApiUrl } from "./urls";

function normalizeVarietat(item) {
  return {
    id: String(item?.id ?? item?._id ?? ""),
    nom: item?.nom ?? item?.name ?? item?.producte ?? "Sense nom",
    origen: item?.origen ?? item?.regio ?? item?.region ?? "Origen no indicat",
    tipus: item?.tipus ?? item?.presentacio ?? item?.forma ?? "Tipus no indicat",
    descripcio:
      item?.descripcio ??
      item?.descripcion ??
      item?.description ??
      "Sense descripcio disponible.",
  };
}

function extractList(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.dades)) {
    return payload.dades;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return [];
}

function extractItem(payload) {
  if (!payload || Array.isArray(payload)) {
    return payload;
  }

  // Alguns backends retornen l'element dins d'un objecte contenidor.
  return payload.dada ?? payload.data ?? payload.item ?? payload;
}

async function parseJsonSafely(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function createHttpError(response, payload) {
  const message =
    payload?.message ?? payload?.error ?? `Error HTTP ${response.status}`;
  const error = new Error(message);

  error.status = response.status;
  error.payload = payload;

  return error;
}

export async function getVarietats() {
  // Fem no-store per veure al moment les altes noves que arriben del backend.
  const response = await fetch(buildApiUrl(API_PATHS.bacalla), {
    cache: "no-store",
  });
  const payload = await parseJsonSafely(response);

  if (!response.ok) {
    throw createHttpError(response, payload);
  }

  return extractList(payload)
    .map(normalizeVarietat)
    .filter((item) => item.id.length > 0);
}

export async function getVarietatById(id) {
  const response = await fetch(buildApiUrl(`${API_PATHS.bacalla}/${id}`), {
    cache: "no-store",
  });
  const payload = await parseJsonSafely(response);

  if (!response.ok) {
    throw createHttpError(response, payload);
  }

  return normalizeVarietat(extractItem(payload));
}

export async function createVarietat(newVarietat) {
  const response = await fetch(buildApiUrl(API_PATHS.bacalla), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newVarietat),
  });
  const payload = await parseJsonSafely(response);

  if (!response.ok) {
    throw createHttpError(response, payload);
  }

  return normalizeVarietat(extractItem(payload));
}