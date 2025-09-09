import React, { useRef, useCallback } from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window'); // largura da tela

export default function SlideScreen({ children, backgroundColor = '#050713' }: { children: React.ReactNode, backgroundColor?: string }) {
  const translateX = useRef(new Animated.Value(width)).current; // começa fora da tela, à direita

  useFocusEffect(
    useCallback(() => {
      // Slide da direita para a posição 0 quando a tela entra em foco
      translateX.setValue(width); // reset posição inicial
      Animated.timing(translateX, {
        toValue: 0, // posição final
        duration: 300, // duração da animação
        useNativeDriver: true,
      }).start();
    }, [])
  );

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX }], backgroundColor }]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
