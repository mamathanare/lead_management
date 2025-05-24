import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const fieldOptions = ['Status', 'Source', 'Qualification', 'Interest Field', 'Assigned To'];

const filterValues = {
  Status: ['New', 'Follow-Up', 'Qualified', 'Converted'],
  Source: ['Website', 'Cold Call', 'Email Campaign', 'Social Media'],
  Qualification: ['High School', 'Bachelors', 'Masters', 'PhD', 'Other'],
  'Interest Field': ['Web Development', 'Mobile Development', 'Data Science', 'Digital Marketing', 'UI/UX Design'],
  'Assigned To': ['John Doe', 'Jane Smith', 'Emily Davis', 'Robert Johnson'],
};

const FilterPage = () => {
  const navigation = useNavigation();
  const [filters, setFilters] = useState([{ field: 'Status', value: '' }]);
  const [matchMode, setMatchMode] = useState('AND');
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadLeads = async () => {
        const stored = await AsyncStorage.getItem('leads');
        setLeads(stored ? JSON.parse(stored) : []);
      };
      loadLeads();
    }, [])
  );

  const updateFilter = (index, key, value) => {
    const newFilters = [...filters];
    newFilters[index][key] = value;
    if (key === 'field') newFilters[index]['value'] = '';
    setFilters(newFilters);
  };

  const addFilter = () => {
    setFilters([...filters, { field: 'Status', value: '' }]);
  };

  const removeFilter = (index) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
  };

  const applyFilters = () => {
    const filtered = leads.filter((lead) => {
      const conditions = filters.map(({ field, value }) => {
        if (!value) return false;

        const fieldMap = {
          'Status': lead.status,
          'Source': lead.source,
          'Qualification': lead.qualification,
          'Interest Field': lead.interestField,
          'Assigned To': lead.assignedTo,
        };

        const leadFieldValue = fieldMap[field]?.toString().toLowerCase() || '';
        return leadFieldValue === value.toLowerCase();
      });

      return matchMode === 'AND'
        ? conditions.every(Boolean)
        : conditions.some(Boolean);
    });

    setFilteredLeads(filtered);
  };

  const clearFilters = () => {
    setFilters([{ field: 'Status', value: '' }]);
    setFilteredLeads([]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Advanced Filters</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cross}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.matchMode}>
        <TouchableOpacity onPress={() => setMatchMode('AND')} style={styles.radioOption}>
          <Text style={[styles.radioText, matchMode === 'AND' && styles.selectedRadio]}>◉ ALL conditions (AND)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMatchMode('OR')} style={styles.radioOption}>
          <Text style={[styles.radioText, matchMode === 'OR' && styles.selectedRadio]}>◉ ANY condition (OR)</Text>
        </TouchableOpacity>
      </View>

      {filters.map((filter, index) => (
        <View key={index} style={styles.filterRow}>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={filter.field}
              onValueChange={(val) => updateFilter(index, 'field', val)}
            >
              {fieldOptions.map((field) => (
                <Picker.Item label={field} value={field} key={field} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={filter.value}
              onValueChange={(val) => updateFilter(index, 'value', val)}
            >
              <Picker.Item label={`Select ${filter.field.toLowerCase()}`} value="" />
              {filterValues[filter.field].map((opt) => (
                <Picker.Item label={opt} value={opt} key={opt} />
              ))}
            </Picker>
          </View>
          {filters.length > 1 && (
            <TouchableOpacity onPress={() => removeFilter(index)}>
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.addBtn} onPress={addFilter}>
        <Text style={styles.addBtnText}>Add Filter</Text>
      </TouchableOpacity>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
          <Text>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
          <Text style={{ color: '#fff' }}>Apply Filters</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.resultsContainer}>
        {filteredLeads.length > 0 ? (
          filteredLeads.map((lead, i) => (
            <View key={i} style={styles.leadCard}>
              <Text style={styles.leadName}>{lead.name}</Text>
              <Text>Contact: {lead.contact}</Text>
              <Text>Status: {lead.status}</Text>
              <Text>Source: {lead.source}</Text>
              <Text>Qualification: {lead.qualification}</Text>
              <Text>Interest Field: {lead.interestField}</Text>
              <Text>Assigned To: {lead.assignedTo}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noResultText}>No leads match your filters.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  heading: { fontSize: 18, fontWeight: 'bold' },
  cross: { fontSize: 24, color: '#888' },
  matchMode: { flexDirection: 'row', marginBottom: 16 },
  radioOption: { marginRight: 20 },
  radioText: { fontSize: 14, color: '#555' },
  selectedRadio: { fontWeight: 'bold', color: '#000' },
  filterRow: {
    flexDirection: 'row', alignItems: 'center',
    marginBottom: 12
  },
  pickerWrapper: {
    flex: 1, borderWidth: 1, borderColor: '#ccc',
    borderRadius: 8, marginHorizontal: 4, height: 50,
    justifyContent: 'center', overflow: 'hidden'
  },
  removeText: {
    color: 'red', fontSize: 20, paddingHorizontal: 8
  },
  addBtn: {
    backgroundColor: '#eee', padding: 10,
    borderRadius: 6, alignSelf: 'flex-start', marginVertical: 10
  },
  addBtnText: { color: '#333' },
  buttonRow: {
    flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16
  },
  clearButton: {
    padding: 12, backgroundColor: '#eee',
    borderRadius: 6, marginRight: 10
  },
  applyButton: {
    padding: 12, backgroundColor: '#007bff',
    borderRadius: 6
  },
  resultsContainer: { marginTop: 30 },
  leadCard: {
    backgroundColor: '#f9f9f9', padding: 12,
    borderRadius: 8, marginBottom: 12
  },
  leadName: { fontWeight: 'bold', marginBottom: 4 },
  noResultText: { textAlign: 'center', marginTop: 20, color: '#666' }
});

export default FilterPage;
