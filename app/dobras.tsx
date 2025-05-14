import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Header from '../components/Header';
import { calcularComposicaoCorporal } from '../utils/calculos';
import { calcularTMBNDC } from '../utils/metabolismo';

const Container = styled(ScrollView)`
  flex: 1;
  background-color: #121212;
  padding: 20px;
`;

const Label = styled.Text`
  color: #fff;
  margin-top: 15px;
  margin-bottom: 5px;
`;

const Input = styled.TextInput`
  background-color: #1e1e1e;
  color: #fff;
  padding: 10px;
  border-radius: 8px;
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

const metodoDobrasMap: Record<'3' | '4' | '7', string[]> = {
  '3': ['Tríceps', 'Peitoral', 'Abdominal'],
  '4': ['Tríceps', 'Subescapular', 'Supra-ilíaca', 'Abdominal'],
  '7': ['Tríceps', 'Subescapular', 'Peitoral', 'Axilar', 'Supra-ilíaca', 'Abdominal', 'Femoral'],
};

export default function Dobras() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const metodo = params.metodoDobras as '3' | '4' | '7';
  const sexo = params.sexo as 'Masculino' | 'Feminino';

  const [valoresDobras, setValoresDobras] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!metodo || !sexo) {
      Alert.alert('Erro', 'Método ou sexo não foram definidos.');
      router.back();
    }
  }, []);

  const handleInputChange = (dobra: string, valor: string) => {
    setValoresDobras((prev) => ({
      ...prev,
      [dobra]: valor,
    }));
  };

  const handleCalcular = () => {
    const campos = metodoDobrasMap[metodo];

    const faltando = campos.some((dobra) => {
      const valor = valoresDobras[dobra]?.trim();
      return !valor || isNaN(Number(valor));
    });

    if (faltando) {
      Alert.alert('Atenção', 'Preencha corretamente todos os campos com valores numéricos.');
      return;
    }

    const idade = Number(String(params.idade).replace(',', '.'));
    const peso = Number(String(params.peso).replace(',', '.'));
    const altura = Number(String(params.altura).replace(',', '.'));
    const atividadeFator = Number(String(params.atividadeFator));

    const resultado = calcularComposicaoCorporal({
      sexo,
      idade,
      peso,
      metodo,
      dobras: Object.fromEntries(
        Object.entries(valoresDobras).map(([k, v]) => [k, Number(v.replace(',', '.'))])
      ),
    });

    const metabolismo = calcularTMBNDC({
      sexo,
      idade,
      peso,
      altura,
      fatorAtividade: atividadeFator,
    });

    const dobrasIndividuais = Object.fromEntries(
      Object.entries(valoresDobras).map(([k, v]) => [k, v.replace(',', '.')])
    );

    const destino = params.avaliacaoCompleta === 'true' ? '/circunferencias' : '/resultado';

    router.push({
      pathname: destino,
      params: {
        ...params,
        ...resultado,
        ...dobrasIndividuais,
        tmb: metabolismo.tmb,
        ndc: metabolismo.ndc,
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <Header title="Dobras Cutâneas" />
      <Container contentContainerStyle={{ paddingBottom: 40 }}>
        <StatusBar style="light" />
        {metodoDobrasMap[metodo]?.map((dobra) => (
          <React.Fragment key={dobra}>
            <Label>{dobra}</Label>
            <Input
              keyboardType="numeric"
              placeholder="Valor em mm"
              placeholderTextColor="#aaa"
              value={valoresDobras[dobra] || ''}
              onChangeText={(valor) => handleInputChange(dobra, valor)}
            />
          </React.Fragment>
        ))}
        <Button onPress={handleCalcular}>
          <ButtonText>Avançar</ButtonText>
        </Button>
      </Container>
    </SafeAreaView>
  );
}
