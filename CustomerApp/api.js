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

        // Séparer les types de paniers (simples, familiaux, fruits, oeufs)
        if (produit.includes("simple")) {
          acc.simples.fruits += quantite;   // On peut ajouter ici des conditions pour fruits/légumes
          acc.simples.legumes += quantite;
        } else if (produit.includes("familial")) {
          acc.familiaux.fruits += quantite;
          acc.familiaux.legumes += quantite;
        } else if (produit.includes("fruit")) {
          acc.fruits += quantite;
        } else if (produit.includes("oeuf") || produit.includes("œuf")) {
          acc.oeufs += quantite;
        }

        return acc;
      },
      {
        simples: { fruits: 0, legumes: 0 },   // Structure pour simples
        familiaux: { fruits: 0, legumes: 0 },  // Structure pour familiaux
        fruits: 0,   // Total fruits
        legumes: 0,  // Total légumes
        oeufs: 0     // Total oeufs
      }
    );

    console.log("Récapitulatif calculé :", recap);

    return recap;
  } catch (error) {
    console.error("Erreur lors de la récupération des paniers :", error);
    return { simples: { fruits: 0, legumes: 0 }, familiaux: { fruits: 0, legumes: 0 }, fruits: 0, legumes: 0, oeufs: 0 };
  }
};

export default api;
