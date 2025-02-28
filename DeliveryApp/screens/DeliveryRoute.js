import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const DeliveryRoute = ({ route }) => {
  const { depotId, depotName, adresse, codePostal, ville, localisation } = route.params;
  const [itineraire, setItineraire] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItineraire = async () => {
      const data = await getItineraireDepot(depotId);
      setItineraire(data);
    };
  
    fetchItineraire();
  }, [depotId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Itinéraire pour {depotName}</Text>
      <Text style={styles.text}>Adresse : {adresse}</Text>
      <Text style={styles.text}>Code Postal : {codePostal}</Text>
      <Text style={styles.text}>Ville : {ville}</Text>
      <Text style={styles.text}>Localisation : {localisation}</Text>

      {itineraire ? (
        <View>
          <Text style={styles.text}>Itinéraire : {itineraire.description}</Text>
        </View>
      ) : (
        <Text style={styles.text}>Aucun itinéraire disponible</Text>
      )}
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

export default DeliveryRoute;
