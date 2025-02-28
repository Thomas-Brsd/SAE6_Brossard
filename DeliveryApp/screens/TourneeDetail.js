import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { getLivraisonsTournee, getDepotsTournee } from '../api';
import { useNavigation } from '@react-navigation/native';

const TourneeDetail = ({ route }) => {
  const { tournee } = route.params;
  const navigation = useNavigation();
  const [livraisons, setLivraisons] = useState([]);
  const [depots, setDepots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const livraisonsData = await getLivraisonsTournee(tournee.tournee_id);
        const depotsData = await getDepotsTournee(tournee.tournee_id);
        
        setLivraisons(livraisonsData);
        setDepots(depotsData);
      } catch (err) {
        console.error('Erreur lors de la récupération des détails', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [tournee]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détails de la tournée de {tournee.tournee}</Text>

      <FlatList
        data={depots}
        keyExtractor={(item) => item.depot_id?.toString()}
        renderItem={({ item }) => (
          <View style={styles.detailItem}>
            <Text style={styles.text}>Dépot : {item.depot}</Text>
            <Text style={styles.text}>Adresse : {item.adresses?.adresse || 'Non disponible'}</Text>
            <Text style={styles.text}>Code Postal : {item.adresses?.codepostal || 'Non disponible'}</Text>
            <Text style={styles.text}>Ville : {item.adresses?.ville || 'Non disponible'}</Text>

            <Button
              title="Voir l'itinéraire sur la carte"
              onPress={() =>
                navigation.navigate('Route', {
                  depotId: item.depot_id,
                  depotName: item.depot,
                  adresse: item.adresses?.adresse,
                  codePostal: item.adresses?.codepostal,
                  ville: item.adresses?.ville,
                  localisation: item.adresses?.localisation,
                })
              }
            />
          </View>
        )}
      />

      <Button
        title="Voir le récapitulatif des paniers"
        onPress={() => navigation.navigate('Panier', { tournee })}
      />
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
  },
  detailItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TourneeDetail;
