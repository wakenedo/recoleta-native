import React, { useState } from 'react';
import { Slot } from 'expo-router';
import AnimatedSplashScreen from '../components/SplashScreen';

export default function RootLayout() {
  const [isSplashVisible, setSplashVisible] = useState(true);

  if (isSplashVisible) {
    return <AnimatedSplashScreen onFinish={() => setSplashVisible(false)} />;
  }

  return <Slot />;
}