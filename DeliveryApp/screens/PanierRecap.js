import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getPanierRecap } from '../api';

const PanierRecap = ({ route }) => {
  const { tournee } = route.params;
  const [recap, setRecap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPanierRecap = async () => {
      try {
        const recapData = await getPanierRecap(tournee.tournee_id);
        setRecap(recapData);
      } catch (err) {
        console.error('Erreur lors de la récupération du récapitulatif des paniers', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPanierRecap();
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
      <Text style={styles.title}>Récapitulatif des paniers pour {tournee.tournee}</Text>

      <View style={styles.recapItem}>
        <Text style={styles.text}>Paniers Simples : {recap.simples}</Text>
      </View>
      <View style={styles.recapItem}>
        <Text style={styles.text}>Paniers Familiaux : {recap.familiaux}</Text>
      </View>
      <View style={styles.recapItem}>
        <Text style={styles.text}>Paniers de Fruits : {recap.fruits}</Text>
      </View>
      <View style={styles.recapItem}>
        <Text style={styles.text}>Paniers d'Œufs : {recap.oeufs}</Text>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  recapItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    elevation: 2,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PanierRecap;
