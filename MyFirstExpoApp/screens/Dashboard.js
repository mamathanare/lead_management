import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function Dashboard({ navigation }) {
  const taskData = [
    {
      name: 'Completed',
      population: 1,
      color: '#2c3e50',
      legendFontColor: '#2c3e50',
      legendFontSize: 12,
    },
    {
      name: 'Remaining',
      population: 2,
      color: '#ecf0f1',
      legendFontColor: '#7f8c8d',
      legendFontSize: 12,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.drawerIcon} onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={28} color="black" />
      </TouchableOpacity>

      <View style={styles.rowContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>Today's Tasks</Text>
          <PieChart
            data={taskData}
            width={screenWidth / 2.5}
            height={120}
            chartConfig={{
              backgroundColor: '#fff',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="10"
            center={[10, 0]}
            hasLegend={false}
          />
          <Text style={styles.subtitle}>1 out of 3</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Overdue Tasks</Text>
          <PieChart
            data={[
              {
                name: 'Overdue',
                population: 0,
                color: 'red',
                legendFontColor: '#7f8c8d',
                legendFontSize: 12,
              },
            ]}
            width={screenWidth / 2.5}
            height={120}
            chartConfig={{
              backgroundColor: '#fff',
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="10"
            center={[10, 0]}
            hasLegend={false}
          />
          <Text style={styles.subtitle}>0</Text>
        </View>
      </View>

      <Text style={styles.fuelText}>1/3 Fuelbar</Text>
      <ProgressBar progress={1 / 3} color="#34495e" style={styles.progressBar} />

      <View style={styles.iconGrid}>
        {[
          { label: 'Near me', icon: 'location-outline' },
          { label: 'Tasks', icon: 'checkmark-done-outline' },
          { label: 'LSQ Help', icon: 'help-circle-outline' },
          { label: 'Reports', icon: 'stats-chart-outline' },
          { label: 'Leads', icon: 'people-outline' },
          { label: 'Quick Ref', icon: 'book-outline' },
        ].map(({ label, icon }, index) => (
          <View key={index} style={styles.iconWrapper}>
            <Ionicons name={icon} size={24} color="#2c3e50" />
            <Text>{label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>My Tasks</Text>
      <View style={styles.taskCard}>
        <Text style={styles.taskTitle}>Test Product Sanity</Text>
        <Text style={styles.taskTime}>18 Oct 08:00 AM</Text>
        <Text style={styles.taskDuration}>45 min</Text>
      </View>

      <View style={styles.taskCard}>
        <Text style={styles.taskTitle}>Meeting</Text>
        <Text style={styles.taskTime}>18 Oct 04:30 PM</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  drawerIcon: { marginBottom: 10 },
  rowContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  card: { alignItems: 'center', padding: 10 },
  title: { fontSize: 16, fontWeight: 'bold' },
  subtitle: { fontSize: 12, color: '#7f8c8d' },
  fuelText: { marginTop: 20, fontSize: 14, marginBottom: 5 },
  progressBar: { height: 10, borderRadius: 5 },
  iconGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: 20 },
  iconWrapper: { alignItems: 'center', margin: 10 },
  sectionTitle: { marginTop: 20, fontSize: 18, fontWeight: 'bold' },
  taskCard: { backgroundColor: '#ecf0f1', padding: 10, marginVertical: 5, borderRadius: 5 },
  taskTitle: { fontWeight: 'bold' },
  taskTime: { fontSize: 12, color: '#7f8c8d' },
  taskDuration: { fontSize: 12, color: '#7f8c8d' },
});
