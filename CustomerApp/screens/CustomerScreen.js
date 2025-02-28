import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import de useNavigation
import { getPanierRecap } from '../api';

const CustomerScreen = () => {
  const navigation = useNavigation();
  const [panier, setPanier] = useState(null);
  const [tourneeId, setTourneeId] = useState('1');
  const [clientId, setClientId] = useState('1');
  const [historique, setHistorique] = useState([]);


  useEffect(() => {
    const fetchPanier = async () => {
      const recap = await getPanierRecap(tourneeId);
      setPanier(recap);
    };

    fetchPanier();
  }, [tourneeId, clientId]);

  return (
<View style={styles.container} className="customer-screen">
    <View style={styles.buttonContainer}>
        <Button
            title="Voir le contenu des paniers"
            onPress={() => navigation.navigate('PanierDetails', { panier })}
        />
    </View>

    <View style={styles.buttonContainer}>
        <Button
            title="Voir l'historique des commandes"
            onPress={() => navigation.navigate('HistoriqueScreen', { historique })}
        />
    </View>
</View>

  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    buttonContainer: {
        margin: 20,  // Ajout d'un espace entre les boutons
    },
    button: {
        marginTop: 20,  // Espace entre les boutons directement sur le style du bouton
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CustomerScreen;
