import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getHistoriqueLivraisons } from '../api';  // Assurez-vous que cette fonction existe et fonctionne correctement

const HistoriqueLivraisons = ({ clientId }) => {
    const [historiques, setHistorique] = useState([]);

    useEffect(() => {
        const fetchHistorique = async () => {
            const historiqueData = await getHistoriqueLivraisons(clientId);
            setHistorique(historiqueData);
        };

        if (clientId) {
            fetchHistorique();
        }
    }, [clientId]);  // Ajoutez clientId comme dépendance pour recharger l'historique quand il change

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Historique des Livraisons</Text>
            <View>
                {historiques.length > 0 ? (
                    historiques.map((livraison) => (
                        <View key={livraison.livraison_id} style={styles.detailItem}>
                            <Text style={styles.text}>
                                <Text style={styles.bold}>{livraison.produit}</Text> - {livraison.quantite} - {livraison.date_livraison}
                            </Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.text}>Aucune livraison trouvée</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  detailItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    elevation: 2,
  },
});

export default HistoriqueLivraisons;
