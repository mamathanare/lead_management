import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const qualificationOptions = [
  { label: 'High School', value: 'High School' },
  { label: 'Bachelors', value: 'Bachelors' },
  { label: 'Masters', value: 'Masters' },
  { label: 'PhD', value: 'PhD' },
  { label: 'Other', value: 'Other' },
];

const interestOptions = [
  { label: 'Web Development', value: 'Web Development' },
  { label: 'Mobile Development', value: 'Mobile Development' },
  { label: 'Data Science', value: 'Data Science' },
  { label: 'Digital Marketing', value: 'Digital Marketing' },
  { label: 'UI/UX Design', value: 'UI/UX Design' },
];

const sourceOptions = [
  { label: 'Website', value: 'Website' },
  { label: 'Cold Call', value: 'Cold Call' },
  { label: 'Email Campaign', value: 'Email Campaign' },
  { label: 'Social Media', value: 'Social Media' },
];

const assignedToOptions = [
  { label: 'John Doe', value: 'John Doe' },
  { label: 'Jane Smith', value: 'Jane Smith' },
  { label: 'Emily Davis', value: 'Emily Davis' },
  { label: 'Robert Johnson', value: 'Robert Johnson' },
];

const jobInterestOptions = [
  { label: 'Frontend Developer', value: 'Frontend Developer' },
  { label: 'Backend Developer', value: 'Backend Developer' },
  { label: 'Full Stack', value: 'Full Stack' },
  { label: 'Data Analyst', value: 'Data Analyst' },
];

const statusOptions = [
  { label: 'New', value: 'New' },
  { label: 'Follow-Up', value: 'Follow-Up' },
  { label: 'Qualified', value: 'Qualified' },
  { label: 'Converted', value: 'Converted' },
];

const defaultForm = {
  name: '',
  phone: '',
  altPhone: '',
  email: '',
  altEmail: '',
  status: 'New',
  qualification: 'High School',
  interestField: 'Web Development',
  source: 'Website',
  assignedTo: 'John Doe',
  jobInterest: '',
  state: '',
  city: '',
  passoutYear: '',
  heardFrom: ''
};

const AddLeadPage = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState(defaultForm);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const newLead = {
      ...form,
      contact: form.phone,
      interest: form.interestField,
      updatedAt: new Date().toLocaleString(),
    };

    try {
      const existing = await AsyncStorage.getItem('leads');
      const leads = existing ? JSON.parse(existing) : [];
      leads.unshift(newLead);
      await AsyncStorage.setItem('leads', JSON.stringify(leads));
      Alert.alert('Success', 'Lead added');
      setForm(defaultForm); // Clear form
      navigation.navigate('Leads'); // Go back to leads page
    } catch (error) {
      console.error('Error saving lead', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Add Lead</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Leads')}>
            <Ionicons name="close" size={28} color="#333" />
          </TouchableOpacity>
        </View>

        {/* First Row */}
        <View style={styles.row}>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={form.name}
            onChangeText={(text) => handleChange('name', text)}
          />
          <TextInput
            placeholder="Phone"
            style={styles.input}
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={(text) => handleChange('phone', text)}
          />
        </View>

        {/* Second Row */}
        <View style={styles.row}>
          <TextInput
            placeholder="Alt. Phone"
            style={styles.input}
            keyboardType="phone-pad"
            value={form.altPhone}
            onChangeText={(text) => handleChange('altPhone', text)}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            value={form.email}
            onChangeText={(text) => handleChange('email', text)}
          />
        </View>

        {/* Third Row */}
        <View style={styles.row}>
          <TextInput
            placeholder="Alt. Email"
            style={styles.input}
            keyboardType="email-address"
            value={form.altEmail}
            onChangeText={(text) => handleChange('altEmail', text)}
          />
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={form.status}
              onValueChange={(value) => handleChange('status', value)}
            >
              {statusOptions.map((item) => (
                <Picker.Item label={item.label} value={item.value} key={item.value} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Fourth Row */}
        <View style={styles.row}>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={form.qualification}
              onValueChange={(value) => handleChange('qualification', value)}
            >
              {qualificationOptions.map((item) => (
                <Picker.Item label={item.label} value={item.value} key={item.value} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={form.interestField}
              onValueChange={(value) => handleChange('interestField', value)}
            >
              {interestOptions.map((item) => (
                <Picker.Item label={item.label} value={item.value} key={item.value} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Fifth Row */}
        <View style={styles.row}>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={form.source}
              onValueChange={(value) => handleChange('source', value)}
            >
              {sourceOptions.map((item) => (
                <Picker.Item label={item.label} value={item.value} key={item.value} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={form.assignedTo}
              onValueChange={(value) => handleChange('assignedTo', value)}
            >
              {assignedToOptions.map((item) => (
                <Picker.Item label={item.label} value={item.value} key={item.value} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Sixth Row */}
        <View style={styles.row}>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={form.jobInterest}
              onValueChange={(value) => handleChange('jobInterest', value)}
            >
              <Picker.Item label="Select job interest" value="" />
              {jobInterestOptions.map((item) => (
                <Picker.Item label={item.label} value={item.value} key={item.value} />
              ))}
            </Picker>
          </View>
          <TextInput
            placeholder="State"
            style={styles.input}
            value={form.state}
            onChangeText={(text) => handleChange('state', text)}
          />
        </View>

        {/* Seventh Row */}
        <View style={styles.row}>
          <TextInput
            placeholder="City"
            style={styles.input}
            value={form.city}
            onChangeText={(text) => handleChange('city', text)}
          />
          <TextInput
            placeholder="Passout Year"
            style={styles.input}
            keyboardType="numeric"
            value={form.passoutYear}
            onChangeText={(text) => handleChange('passoutYear', text)}
          />
        </View>

        {/* Final Input */}
        <TextInput
          placeholder="Heard From"
          style={styles.inputSingle}
          value={form.heardFrom}
          onChangeText={(text) => handleChange('heardFrom', text)}
        />

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('Leads')}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
            <Text style={{ color: '#fff' }}>Add Lead</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', paddingBottom: 60 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 16
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  row: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginBottom: 12
  },
  input: {
    flex: 1, borderWidth: 1, borderColor: '#ccc',
    borderRadius: 8, padding: 10, marginHorizontal: 4, height: 50
  },
  inputSingle: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 10, marginVertical: 8, height: 50
  },
  pickerWrapper: {
    flex: 1, borderWidth: 1, borderColor: '#ccc',
    borderRadius: 8, marginHorizontal: 4, overflow: 'hidden', height: 50, justifyContent: 'center'
  },
  buttonRow: {
    flexDirection: 'row', justifyContent: 'flex-end',
    marginTop: 20
  },
  cancelButton: {
    padding: 12, backgroundColor: '#eee', borderRadius: 6, marginRight: 10
  },
  addButton: {
    padding: 12, backgroundColor: '#007bff', borderRadius: 6
  }
});

export default AddLeadPage;
