import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Header from '../components/Header';

const Container = styled(ScrollView)`
  flex: 1;
  background-color: #121212;
  padding: 20px;
`;

const Label = styled.Text`
  color: #fff;
  margin-top: 15px;
`;

const Input = styled.TextInput`
  background-color: #1e1e1e;
  color: #fff;
  padding: 10px;
  border-radius: 8px;
  margin-top: 5px;
`;

const Button = styled.TouchableOpacity`
  margin-top: 30px;
  background-color: #03dac6;
  padding: 15px;
  border-radius: 10px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #000;
  font-weight: bold;
`;

const CAMPOS = [
  'Pescoço', 'Ombro', 'Peitoral', 'Cintura', 'Quadril', 'Abdômen',
  'Braço direito (relaxado)', 'Braço direito (contraído)',
  'Braço esquerdo (relaxado)', 'Braço esquerdo (contraído)',
  'Antebraço direito', 'Antebraço esquerdo',
  'Coxa direita (proximal)', 'Coxa direita (medial)', 'Coxa direita (distal)',
  'Panturrilha direita', 'Coxa esquerda (proximal)', 'Coxa esquerda (medial)',
  'Coxa esquerda (distal)', 'Panturrilha esquerda',
];

function CircunferenciasScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [dados, setDados] = useState<Record<string, string>>({});

  const handleChange = (campo: string, valor: string) => {
    setDados((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleAvancar = () => {
    const incompletos = CAMPOS.some((campo) => !dados[campo]);
    if (incompletos) {
      Alert.alert('Preencha todos os campos.');
      return;
    }

    router.push({
      pathname: '/resultado',
      params: {
        ...params,
        ...dados,
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <StatusBar style="light" />
      <Header title="Circunferências" />
      <Container contentContainerStyle={{ paddingBottom: 40 }}>
        {CAMPOS.map((campo) => (
          <React.Fragment key={campo}>
            <Label>{campo}</Label>
            <Input
              keyboardType="numeric"
              placeholder="Em cm"
              placeholderTextColor="#aaa"
              value={dados[campo] || ''}
              onChangeText={(valor) => handleChange(campo, valor.replace(',', '.'))}
            />
          </React.Fragment>
        ))}

        <Button onPress={handleAvancar}>
          <ButtonText>Avançar</ButtonText>
        </Button>
      </Container>
    </SafeAreaView>
  );
}

export default CircunferenciasScreen;
