import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { personalInfo } from '../utils/personalInfo';

const Container = styled.ScrollView`
  flex: 1;
  background-color: #121212;
  padding: 20px;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
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

const SelectorRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

const OptionButton = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? '#6200ee' : '#333')};
  padding: 10px 20px;
  border-radius: 8px;
`;

const OptionText = styled.Text`
  color: #fff;
`;

const StyledPicker = styled(Picker)`
  background-color: #1e1e1e;
  color: #fff;
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

export default function Index() {
  const router = useRouter();

  const [sexo, setSexo] = useState<'Masculino' | 'Feminino' | null>(null);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [metodoDobras, setMetodoDobras] = useState<'3' | '4' | '7' | null>(null);
  const [avaliacaoCompleta, setAvaliacaoCompleta] = useState(false);

  const [atividadeLabel, setAtividadeLabel] = useState('');
  const [atividadeFator, setAtividadeFator] = useState<number | ''>('');

  const niveis = [
    { label: 'Sedentário', fator: 1.2 },
    { label: 'Levemente ativo', fator: 1.375 },
    { label: 'Moderadamente ativo', fator: 1.55 },
    { label: 'Muito ativo', fator: 1.725 },
    { label: 'Extremamente ativo', fator: 1.9 },
  ];

  const handleAvancar = () => {
    if (!sexo || !nome || !idade || !altura || !peso || !metodoDobras || atividadeFator === '') {
      alert('Preencha todos os campos.');
      return;
    }

    router.push({
      pathname: './dobras',
      params: {
        nome,
        idade,
        peso,
        altura,
        sexo,
        metodoDobras,
        avaliacaoCompleta: String(avaliacaoCompleta),
        atividadeFator: String(atividadeFator),
        atividadeLabel,
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <Container contentContainerStyle={{ paddingBottom: 40 }}>
        <StatusBar style="light" />

        <Image
          source={require('../assets/logo.png')}
          style={{
            width: 150,
            height: 150,
            alignSelf: 'center',
            marginBottom: 1,
            marginTop: 50,
            resizeMode: 'contain',
          }}
        />

      <Title>{`Avaliação por ${personalInfo.nome}`}</Title>

        <Title>Entrevista Inicial</Title>

        <Label>Sexo</Label>
        <SelectorRow>
          <OptionButton selected={sexo === 'Masculino'} onPress={() => setSexo('Masculino')}>
            <OptionText>Masculino</OptionText>
          </OptionButton>
          <OptionButton selected={sexo === 'Feminino'} onPress={() => setSexo('Feminino')}>
            <OptionText>Feminino</OptionText>
          </OptionButton>
        </SelectorRow>

        <Label>Nome</Label>
        <Input value={nome} onChangeText={setNome} placeholder="Digite o nome" placeholderTextColor="#aaa" />

        <Label>Idade</Label>
        <Input value={idade} onChangeText={setIdade} keyboardType="numeric" placeholder="Ex: 24" placeholderTextColor="#aaa" />

        <Label>Altura (cm)</Label>
        <Input value={altura} onChangeText={setAltura} keyboardType="numeric" placeholder="Ex: 186" placeholderTextColor="#aaa" />

        <Label>Peso (kg)</Label>
        <Input value={peso} onChangeText={setPeso} keyboardType="numeric" placeholder="Ex: 120" placeholderTextColor="#aaa" />

        <Label>Nível de atividade</Label>
        <StyledPicker
          selectedValue={atividadeFator}
          onValueChange={(itemValue) => {
            setAtividadeFator(itemValue);
            const selecionado = niveis.find((n) => n.fator === itemValue);
            setAtividadeLabel(selecionado?.label || '');
          }}
        >
          <Picker.Item label="Selecione o nível" value="" />
          {niveis.map((nivel) => (
            <Picker.Item key={nivel.fator} label={nivel.label} value={nivel.fator} />
          ))}
        </StyledPicker>

        <Label>Método de Dobras</Label>
        <SelectorRow>
          {['3', '4', '7'].map((num) => (
            <OptionButton key={num} selected={metodoDobras === num} onPress={() => setMetodoDobras(num as '3' | '4' | '7')}>
              <OptionText>{num} Dobras</OptionText>
            </OptionButton>
          ))}
        </SelectorRow>

        <Label>Deseja medir as circunferências?</Label>
        <SelectorRow>
          <OptionButton selected={avaliacaoCompleta} onPress={() => setAvaliacaoCompleta(true)}>
            <OptionText>Sim</OptionText>
          </OptionButton>
          <OptionButton selected={!avaliacaoCompleta} onPress={() => setAvaliacaoCompleta(false)}>
            <OptionText>Não</OptionText>
          </OptionButton>
        </SelectorRow>

        <Button onPress={handleAvancar}>
          <ButtonText>Próximo</ButtonText>
        </Button>
      </Container>
    </SafeAreaView>
  );
}
