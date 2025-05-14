# 🏋️‍♂️ App de Avaliação Física - Personal Trainer

Aplicativo mobile desenvolvido com React Native (Expo) para profissionais de educação física realizarem avaliações físicas completas, com geração de relatório PDF profissional, visual moderno em modo escuro e funcionamento totalmente offline.

---

## 📱 Sobre o Projeto

O app permite realizar uma avaliação completa com:
- Dados iniciais do aluno
- Método de dobras cutâneas (3, 4 ou 7)
- Circunferências corporais opcionais
- Cálculo automático de TMB, NDC, % gordura, massa magra e gorda
- Geração de relatório em PDF com layout escuro e identidade visual do profissional

Tudo isso pensado parsa funcionar **sem internet**, facilitando o uso em academias, estúdios ou atendimentos externos.

---

## 🎥 Demonstração do Projeto

### 📲 Screenshots

<div align="center">
  <img src="screenshots/1.jpeg" width="200"/>
  <img src="screenshots/2.jpeg" width="200"/>
  <img src="screenshots/3.jpeg" width="200"/>
  <img src="screenshots/4.jpeg" width="200"/>
  <img src="screenshots/5.jpeg" width="200"/>
  <img src="screenshots/6.jpeg" width="200"/>
  <img src="screenshots/7.jpeg" width="200"/>
  <img src="screenshots/8.jpeg" width="200"/>
</div>

---

## 🚀 Tecnologias Utilizadas

- React Native com Expo
- TypeScript
- Styled Components
- Expo Print & Sharing (para geração de PDF)
- React Native SVG + ViewShot (para gráficos futuros)
- Context API
- Armazenamento local (offline-first)

---

## 📋 Funcionalidades

### 🧍 Entrevista Inicial

- Nome, idade, altura, peso, sexo e nível de atividade
- Escolha do método de dobras
- Escolha de avaliar ou não circunferências

### ✂️ Dobras Cutâneas

- Suporte a 3, 4 ou 7 dobras
- Entradas numéricas com máscara
- Cálculo automático da densidade corporal, % de gordura, massa magra e gorda

### 📏 Circunferências

- Campos organizados para pescoço, ombro, braço, coxa, panturrilha, etc.
- Apenas exibido se selecionado na entrevista inicial

### 🧠 Metabolismo

- Cálculo da TMB e da NDC com base em peso, altura, idade, sexo e atividade física
- Inclusos no PDF final

### 🧾 Geração de PDF

- Relatório escuro com dados do aluno, cálculos e marca do avaliador
- Compartilhamento via WhatsApp, e-mail, Drive, etc.

---

## 🖼️ Design

- Interface escura e limpa
- Destaque visual para os resultados
- Fontes legíveis e espaçamento confortável
- Navegação simples e direta

---

## 📦 Como instalar

```bash
git clone https://github.com/MGrossi27/app-avaliacao-fisica.git
cd app-avaliacao-fisica
npm install
npx expo start
