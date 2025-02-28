import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { getTourneesDuJour } from '../api';

const TourneeList = ({ navigation }) => {
  const [tournees, setTournees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTournees = async (date) => {
    try {
      const data = await getTourneesDuJour();
      setTournees(data);
    } catch (err) {
      setError('Erreur lors de la récupération des tournées');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentDate = '2025-02-28';
    fetchTournees(currentDate);
  }, []);

  const handleTourneeSelection = (tournee) => {
    navigation.navigate('Details', { tournee });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleTourneeSelection(item)}
    >
      <Text style={styles.tourneeText}>{item.tournee}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tournées du jour</Text>
      <FlatList
        data={tournees}
        keyExtractor={(item) => item.tournee_id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Aucune tournée trouvée</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
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
  itemContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    elevation: 2,
  },
  tourneeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
});

export default TourneeList;
