import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PanierDetails = ({ route }) => {
    const { panier } = route.params;
    if (!panier) {
        return <Text style={styles.text}>Chargement du panier...</Text>;
    }

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Détails des Paniers</Text>
        <View>
            <Text style={styles.text}>Simples</Text>
            <Text style={styles.text}>  - Fruits : {panier.simples.fruits}</Text>
            <Text style={styles.text}>  - Légumes : {panier.simples.legumes}</Text>

            <Text style={styles.text}>Familiaux</Text>
            <Text style={styles.text}>  - Fruits : {panier.familiaux.fruits}</Text>
            <Text style={styles.text}>  - Légumes : {panier.familiaux.legumes}</Text>

            <Text style={styles.text}>Fruits : {panier.fruits}</Text>
            <Text style={styles.text}>Légumes : {panier.legumes}</Text>
            <Text style={styles.text}>Œufs : {panier.oeufs}</Text>
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
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default PanierDetails;
