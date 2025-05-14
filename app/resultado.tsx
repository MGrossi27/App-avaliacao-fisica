import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Header from '../components/Header';
import { gerarRelatorioPDF } from '../utils/pdf';
import { gerarRelatorioSimplificadoPDF } from '../utils/pdfSimplificado';
import { personalInfo } from '../utils/personalInfo';

const Container = styled(ScrollView)`
  flex: 1;
  background-color: #121212;
  padding: 20px;
`;

const SectionTitle = styled.Text`
  color: #03dac6;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const InfoBox = styled.View`
  background-color: #1e1e1e;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Label = styled.Text`
  color: #aaa;
  font-size: 14px;
`;

const Value = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
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

const CIRCUNFERENCIAS = [
  'Pescoço', 'Ombro', 'Peitoral', 'Cintura', 'Quadril', 'Abdômen',
  'Braço direito (relaxado)', 'Braço direito (contraído)',
  'Braço esquerdo (relaxado)', 'Braço esquerdo (contraído)',
  'Antebraço direito', 'Antebraço esquerdo',
  'Coxa direita (proximal)', 'Coxa direita (medial)', 'Coxa direita (distal)',
  'Panturrilha direita', 'Coxa esquerda (proximal)', 'Coxa esquerda (medial)',
  'Coxa esquerda (distal)', 'Panturrilha esquerda',
];

const DOBRAS = [
  'Tríceps', 'Subescapular', 'Peitoral', 'Axilar',
  'Supra-ilíaca', 'Abdominal', 'Femoral',
];

export default function Resultado() {
  const params = useLocalSearchParams();

  const {
    nome, densidade, percentualGordura, massaMagra, massaGorda,
    pesoMaximo, objetivoEmagrecimento, tmb, ndc,
  } = params;

  const densidadeNum = Number(densidade);
  const percentualNum = Number(percentualGordura);
  const massaMagraNum = Number(massaMagra);
  const massaGordaNum = Number(massaGorda);
  const pesoMaxNum = Number(pesoMaximo);
  const emagrecerNum = Number(objetivoEmagrecimento);
  const tmbNum = Number(tmb);
  const ndcNum = Number(ndc);
  const isCompleta = params.avaliacaoCompleta === 'true';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
      <Header title="Resultado da Avaliação" />
      <Container contentContainerStyle={{ paddingBottom: 40 }}>
        <StatusBar style="light" />

        <SectionTitle>Informações do Aluno</SectionTitle>
        <InfoBox><Label>Nome</Label><Value>{nome}</Value></InfoBox>
        <InfoBox><Label>Idade</Label><Value>{params.idade} anos</Value></InfoBox>
        <InfoBox><Label>Peso</Label><Value>{params.peso} kg</Value></InfoBox>

        <SectionTitle>Composição Corporal</SectionTitle>
        <InfoBox><Label>Densidade Corporal</Label><Value>{!isNaN(densidadeNum) ? densidadeNum : '—'}</Value></InfoBox>
        <InfoBox><Label>% Gordura</Label><Value>{!isNaN(percentualNum) ? `${percentualNum}%` : '—'}</Value></InfoBox>
        <InfoBox><Label>Massa Magra</Label><Value>{!isNaN(massaMagraNum) ? `${massaMagraNum} kg` : '—'}</Value></InfoBox>
        <InfoBox><Label>Massa Gorda</Label><Value>{!isNaN(massaGordaNum) ? `${massaGordaNum} kg` : '—'}</Value></InfoBox>
        <InfoBox><Label>Peso Máximo Recomendado</Label><Value>{!isNaN(pesoMaxNum) ? `${pesoMaxNum} kg` : '—'}</Value></InfoBox>
        <InfoBox><Label>Objetivo de Emagrecimento</Label><Value>{!isNaN(emagrecerNum) ? (emagrecerNum > 0 ? `${emagrecerNum} kg` : 'Nenhum') : '—'}</Value></InfoBox>

        <SectionTitle>Metabolismo</SectionTitle>
        <InfoBox><Label>Taxa Metabólica Basal (TMB)</Label><Value>{!isNaN(tmbNum) ? `${tmbNum.toFixed(2)} kcal` : '—'}</Value></InfoBox>
        <InfoBox><Label>Necessidade Diária de Calorias (NDC)</Label><Value>{!isNaN(ndcNum) ? `${ndcNum.toFixed(2)} kcal` : '—'}</Value></InfoBox>

        <SectionTitle>Dobras Cutâneas</SectionTitle>
        {DOBRAS.map((dobra) =>
          params[dobra] ? (
            <InfoBox key={dobra}>
              <Label>{dobra}</Label>
              <Value>{params[dobra]} mm</Value>
            </InfoBox>
          ) : null
        )}

        {isCompleta && (
          <>
            <SectionTitle>Circunferências</SectionTitle>
            {CIRCUNFERENCIAS.map((campo) =>
              params[campo] ? (
                <InfoBox key={campo}>
                  <Label>{campo}</Label>
                  <Value>{params[campo]} cm</Value>
                </InfoBox>
              ) : null
            )}
          </>
        )}

        <SectionTitle>Avaliador</SectionTitle>
        <InfoBox><Label>Responsável pela avaliação</Label><Value>{personalInfo.nome}</Value></InfoBox>

        <Button
          onPress={() => {
            const baseData = {
              nome: typeof nome === 'string' ? nome : 'Aluno',
              densidade: isNaN(densidadeNum) ? 0 : densidadeNum,
              percentualGordura: isNaN(percentualNum) ? 0 : percentualNum,
              massaMagra: isNaN(massaMagraNum) ? 0 : massaMagraNum,
              massaGorda: isNaN(massaGordaNum) ? 0 : massaGordaNum,
              pesoMaximo: isNaN(pesoMaxNum) ? 0 : pesoMaxNum,
              objetivoEmagrecimento: isNaN(emagrecerNum) ? 0 : emagrecerNum,
              tmb: isNaN(tmbNum) ? 0 : tmbNum,
              ndc: isNaN(ndcNum) ? 0 : ndcNum,
              personal: personalInfo.nome,
              ...Object.fromEntries(
                Object.entries(params).filter(([key]) =>
                  ['Tríceps', 'Peitoral', 'Abdominal', 'Subescapular', 'Supra-ilíaca', 'Axilar', 'Femoral'].includes(key)
                )
              )
            };
            
            if (isCompleta) {
              gerarRelatorioPDF({ ...baseData, ...params });
            } else {
              gerarRelatorioSimplificadoPDF(baseData);
            }
          }}
        >
          <ButtonText>Gerar PDF</ButtonText>
        </Button>
      </Container>
    </SafeAreaView>
  );
}
