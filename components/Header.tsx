import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  const router = useRouter();

  return (
    <SafeAreaView style={{ backgroundColor: '#121212' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>{title}</Text>
      </View>
    </SafeAreaView>
  );
}