import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from '../../lib/index';

const otherFontTheme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#6e48aa',
  headerFontColor: '#fff',
  headerFontSize: '16px',
  botBubbleColor: '#6E48AA',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const steps = [
  {
    id: '1',
    message: 'Hi, I am your virtual assistent',
    trigger: '2',
  },
  {
    id: '2',
    message: 'Before I can answer your queries, we need to identify you',
    trigger: '3',
  },
  {
    id: '3',
    message: 'Can you please provide me your full name',
    trigger: '4',
  },
  {
    id: '4',
    user: true,
    trigger: '5',
  },
  {
    id: '5',
    message: 'what I can do for you',
    trigger: '6',
  },
  {
    id: '6',
    user: true,
    trigger: '7',
  },
  {
    id: '7',
    message: fetchAndWait,
    trigger: '6',
  },
];

async function fetchAndWait(previousValue) {
  const url = 'http://api.clinik.review/message';

  const response = await fetch(url, {
    method: 'POST',
    body: previousValue.previousValue,
  });
  const text = await response.text();
  return text;
}


const ThemedExample = () => (
  <ThemeProvider theme={otherFontTheme}>
    <ChatBot steps={steps} />
  </ThemeProvider>
);

export default ThemedExample;
