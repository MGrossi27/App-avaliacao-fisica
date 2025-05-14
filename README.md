# 🏋️‍♂️ App de Avaliação Física - Personal Trainer

Aplicativo mobile para avaliação física de alunos com geração de relatórios em PDF, cálculo de composição corporal, TMB, NDC, e opção de incluir circunferências. Criado para uso por profissionais da área com interface dark e visual moderno.

## 🔥 Funcionalidades

- Avaliação física com 3, 4 ou 7 dobras cutâneas
- Entrada opcional de circunferências
- Cálculo de:
  - Densidade corporal
  - % Gordura, Massa Magra e Massa Gorda
  - TMB e NDC com base no nível de atividade
  - Peso máximo recomendado
- Geração de PDF escuro com identidade visual do personal trainer
- Armazenamento local e funcionalidade offline
- Compartilhamento fácil por WhatsApp, e-mail, etc

## 📲 Screenshots

<table>
  <tr>
    <th>Entrevista Inicial</th>
    <th>Escolha de Método</th>
    <th>Dobras Cutâneas</th>
  </tr>
  <tr>
    <td><img src="screenshots/1.jpeg" height="500"/></td>
    <td><img src="screenshots/2.jpeg" height="500"/></td>
    <td><img src="screenshots/3.jpeg" height="500"/></td>
  </tr>
</table>

<br/>

<table>
  <tr>
    <th>Circunferências 1</th>
    <th>Circunferências 2</th>
    <th>Resultado</th>
  </tr>
  <tr>
    <td><img src="screenshots/4.jpeg" height="500"/></td>
    <td><img src="screenshots/5.jpeg" height="500"/></td>
    <td><img src="screenshots/6.jpeg" height="500"/></td>
  </tr>
</table>

## 🚀 Tecnologias

- React Native (Expo)
- TypeScript
- Styled Components
- Context API
- `expo-print`, `expo-sharing`
- `react-native-svg` + `react-native-view-shot`

## 📦 Como executar

```bash
npm install
npx expo start
