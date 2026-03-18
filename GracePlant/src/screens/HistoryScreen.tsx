import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { fetchImageHistory } from '../services/historyService';

const HistoryScreen = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImageHistory()
      .then(setHistory)
      .catch((err) => Alert.alert('Error', err.message || 'Failed to fetch history'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  if (!history.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No history found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={history}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={styles.historyItem}>
          <Image source={{ uri: item.imageUrl }} style={styles.imageThumbnail} />
          <View style={styles.predictionContainer}>
            <Text style={styles.predictionText}>Processed: {item.processed ? 'Yes' : 'No'}</Text>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: 'gray' },
  historyItem: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  imageThumbnail: { width: 50, height: 50, borderRadius: 5, marginRight: 10 },
  predictionContainer: { flex: 1, justifyContent: 'center' },
  predictionText: { fontSize: 14, color: 'black' },
});

export default HistoryScreen;
