import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useIsFocused } from '@react-navigation/native';

// Renamed to avoid conflict
const defaultLeads = [
  { name: 'Kari Legros', contact: '+91 98765 43210', status: 'Follow-Up', qualification: 'Masters', interest: 'Mobile Development', source: 'Email Campaign', assignedTo: 'John Doe', updatedAt: 'May 22, 2025 11:02 PM' },
  { name: 'Bridget Hayes', contact: '+91 91234 56789', status: 'Qualified', qualification: 'PhD', interest: 'Digital Marketing', source: 'Website', assignedTo: 'John Doe', updatedAt: 'May 21, 2025 11:34 PM' },
  { name: 'Dr. Lawrence Cummings IV', contact: '+91 99887 76655', status: 'Qualified', qualification: 'High School', interest: 'Mobile Development', source: 'Cold Call', assignedTo: 'Jane Smith', updatedAt: 'May 20, 2025 3:06 PM' },
  { name: 'Amos D’Amore', contact: '+91 78900 11223', status: 'Converted', qualification: 'Bachelors', interest: 'Data Science', source: 'Social Media', assignedTo: 'Jane Smith', updatedAt: 'May 19, 2025 3:03 PM' },
  { name: 'Miss Norma Predovic', contact: '+91 80045 66778', status: 'Converted', qualification: 'High School', interest: 'Data Science', source: 'Website', assignedTo: 'Emily Davis', updatedAt: 'May 19, 2025 1:12 AM' },
  { name: 'Raul Kub', contact: '+91 98765 11100', status: 'Qualified', qualification: 'Other', interest: 'Web Development', source: 'Social Media', assignedTo: 'Jane Smith', updatedAt: 'May 18, 2025 8:54 PM' },
  { name: 'Rickey Swift', contact: '+91 90909 00011', status: 'New', qualification: 'Masters', interest: 'Mobile Development', source: 'Social Media', assignedTo: 'Robert Johnson', updatedAt: 'May 18, 2025 5:19 PM' },
  { name: 'Ernestine Leannon', contact: '+91 98012 34567', status: 'New', qualification: 'High School', interest: 'Web Development', source: 'Website', assignedTo: 'Emily Davis', updatedAt: 'May 17, 2025 7:23 PM' },
  { name: 'Ashley Ebert', contact: '+91 88888 99999', status: 'Follow-Up', qualification: 'PhD', interest: 'UI/UX Design', source: 'Social Media', assignedTo: 'Jane Smith', updatedAt: 'May 17, 2025 3:02 PM' },
  { name: 'Kevin Miles', contact: '+91 91111 22222', status: 'Qualified', qualification: 'Bachelors', interest: 'AI', source: 'Cold Call', assignedTo: 'John Doe', updatedAt: 'May 16, 2025 11:11 AM' },
];

const columns = [
  { key: 'name', label: 'Name', width: 150 },
  { key: 'contact', label: 'Contact', width: 160 },
  { key: 'status', label: 'Status', width: 100 },
  { key: 'qualification', label: 'Qualification', width: 120 },
  { key: 'interest', label: 'Interest', width: 140 },
  { key: 'source', label: 'Source', width: 120 },
  { key: 'assignedTo', label: 'Assigned To', width: 120 },
  { key: 'updatedAt', label: 'Updated At', width: 160 },
];

const Leads = () => {
  const [search, setSearch] = useState('');
  const [leadsList, setLeadsList] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadLeads = async () => {
      try {
        const stored = await AsyncStorage.getItem('leads');
        const parsed = stored ? JSON.parse(stored) : [];
        setLeadsList([...parsed, ...defaultLeads]);
      } catch (error) {
        console.error('Failed to load leads:', error);
      }
    };
    if (isFocused) {
      loadLeads();
    }
  }, [isFocused]);

  const filteredLeads = leadsList.filter(lead =>
    lead.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.pageTitle}>Leads</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddLeadPage')}
        >
          <Text style={styles.addButtonText}>+ Add Lead</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search leads..."
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity onPress={() => navigation.navigate('FilterPage')}>
          <Icon name="filter-outline" size={26} style={styles.filterIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal>
        <View>
          <View style={styles.tableHeader}>
            {columns.map(col => (
              <Text key={col.key} style={[styles.headerText, { width: col.width }]}>
                {col.label}
              </Text>
            ))}
          </View>

          <FlatList
            data={filteredLeads}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.row}>
                {columns.map(col => (
                  <Text
                    key={col.key}
                    style={[
                      styles.cell,
                      { width: col.width },
                      col.key === 'status' && styles.statusCell,
                    ]}
                  >
                    {col.key === 'status' ? (
                      <Text style={[styles.badge, getStatusStyle(item.status)]}>
                        {item.status}
                      </Text>
                    ) : (
                      item[col.key]
                    )}
                  </Text>
                ))}
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const getStatusStyle = (status) => {
  switch (status) {
    case 'Follow-Up': return { backgroundColor: '#facc15', color: '#000' };
    case 'Qualified': return { backgroundColor: '#4ade80', color: '#000' };
    case 'Converted': return { backgroundColor: '#c084fc', color: '#000' };
    case 'New': return { backgroundColor: '#93c5fd', color: '#000' };
    default: return { backgroundColor: '#d1d5db', color: '#000' };
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pageTitle: { fontSize: 22, fontWeight: 'bold' },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  filterIcon: {
    marginLeft: 10,
    color: '#555',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  headerText: {
    fontWeight: 'bold',
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#f1f5f9',
  },
  cell: { paddingHorizontal: 8 },
  statusCell: { justifyContent: 'center' },
  badge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    overflow: 'hidden',
    fontSize: 12,
  },
});

export default Leads;
