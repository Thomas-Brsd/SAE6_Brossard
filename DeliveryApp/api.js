import axios from 'axios';

axios.defaults.adapter = require('axios/lib/adapters/http');

const API_URL = "https://qjnieztpwnwroinqrolm.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqbmllenRwd253cm9pbnFyb2xtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4MTEwNTAsImV4cCI6MjA1MzM4NzA1MH0.orLZFmX3i_qR0H4H6WwhUilNf5a1EAfrFhbbeRvN41M";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    apikey: API_KEY,
    "Content-Type": "application/json",
  },
});

export const getDepots = async () => {
  try {
    const response = await api.get("/detail_depots");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des dépôts", error);
    return [];
  }
};

export const getLivraisonsSemaine = async (semaine) => {
  try {
    const response = await api.get(
      `/detail_livraisons?semaine=eq.10&select=qte.sum()`
    );
    return response.data[0]["qte.sum()"] || 0;
  } catch (error) {
    console.error("Erreur lors de la récupération des livraisons", error);
    return 0;
  }
};

export const getLivraisonsTournee = async (tournee_id) => {
  try {
    const response = await api.get(
      `/detail_livraisons?semaine=eq.10&tournee_id=eq.${tournee_id}&select=produit_id,produit,qte.sum()`
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des tournées", error);
    return [];
  }
};


export const getDepotsTournee = async (tournee_id) => {
  try {
    const response = await api.get(
      `/detail_livraisons?semaine=eq.10&tournee_id=eq.${tournee_id}&select=depot_id,depot,qte.sum(),adresses(adresse,codepostal,ville,localisation)`

    );
    console.log("Réponse des dépôts:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des dépôts", error);
    return [];
  }
};

export const getTourneesDuJour = async () => {
  try {
    const response = await api.get(
      `/detail_livraisons?jour=eq.2025-02-28&select=tournee_id,tournee`
    );
    const tourneesUniques = Array.from(
      new Map(response.data.map((item) => [item.tournee_id, item])).values()
    );
    return tourneesUniques;
  } catch (error) {
    console.error("Erreur lors de la récupération des tournées", error);
    return [];
  }
};

export const getDetailsLivraison = async (livraison_id) => {
  try {
    const response = await api.get(
      `/detail_livraisons?livraison_id=eq.${livraison_id}&select=livraison_id,adherent,produit,qte,adresse,codepostal,ville,localisation`
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de la livraison", error);
    return [];
  }
};

export const getPanierRecap = async (tournee_id) => {
  try {
    const response = await api.get(
      `/detail_livraisons?semaine=eq.10&tournee_id=eq.${tournee_id}&select=produit,qte.sum()`
    );

    console.log("Réponse de l'API :", response.data);

    if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
      throw new Error("Données invalides ou vides");
    }

    const recap = response.data.reduce(
      (acc, item) => {
        console.log("Item traité :", item);

        const produit = item.produit?.toLowerCase() || "";
        const quantite = Number(item.sum) || 0;

        if (produit.includes("simple")) {
          acc.simples += quantite;
        } else if (produit.includes("familial")) {
          acc.familiaux += quantite;
        } else if (produit.includes("fruit")) {
          acc.fruits += quantite;
        } else if (produit.includes("oeuf") || produit.includes("œuf")) {
          acc.oeufs += quantite;
        }
        return acc;
      },
      { simples: 0, familiaux: 0, fruits: 0, oeufs: 0 }
    );

    console.log("Récapitulatif calculé :", recap);

    return recap;
  } catch (error) {
    console.error("Erreur lors de la récupération des paniers :", error);
    return { simples: 0, familiaux: 0, fruits: 0, oeufs: 0 };
  }
};

export const getDepotDetails = async (depotId) => {
    try {
      const response = await api.get(`/detail_depots?id=eq.${depotId}&select=depot,adresses(adresse,codepostal,ville,localisation)`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération du dépôt", error);
      return null;
    }
  };

export default api;
