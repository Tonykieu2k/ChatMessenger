import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Screen/Home';
import Chat from './src/Screen/Chat';



function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const onChat = () => {
    setCurrentPage('Chat')
  }
  const onHome = () => {
    setCurrentPage('Home')
  }
  switch (currentPage) {
    case 'Home':
      return (
        <Home
          onChat={onChat}
        />
      );
    case 'Chat':
      return (
        <Chat
          onHome={onHome}
        />
      );
    default:
      return null;
  }

}

export default App;