import React, { useRef, useEffect } from "react";
import { FlatList, View, Dimensions, Animated, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { GameCardSimple } from "./Card_game";

const { width } = Dimensions.get("window");

interface CarouselProps {
  data: any[];
}

export default function Carousel({ data }: CarouselProps) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const currentIndex = useRef(0);
  const isUserInteracting = useRef(false);
  const interactionTimeout = useRef<NodeJS.Timeout | null>(null);

  const ITEM_WIDTH = width * 0.7;
  const ITEM_MARGIN = 10;
  const ITEM_SIZE = ITEM_WIDTH + ITEM_MARGIN * 2;
  const SPACER = (width - ITEM_WIDTH) / 2 - ITEM_MARGIN;

  const dataWithSpacers = [{ key: "left-spacer" }, ...data, { key: "right-spacer" }];

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (isUserInteracting.current) return; // pausa enquanto usuário interage

      if (currentIndex.current < data.length - 1) {
        currentIndex.current += 1;
      } else {
        currentIndex.current = 0;
      }

      flatListRef.current?.scrollToIndex({
        index: currentIndex.current + 1, // +1 por causa do left-spacer
        animated: true,
        viewPosition: 0.5,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [data]);

  // Detecta interação do usuário
  const handleScrollBeginDrag = () => {
    isUserInteracting.current = true;
    if (interactionTimeout.current) clearTimeout(interactionTimeout.current);
  };

  const handleScrollEndDrag = () => {
    // espera 3s após o usuário parar de arrastar para retomar o auto-scroll
    interactionTimeout.current = setTimeout(() => {
      isUserInteracting.current = false;
    }, 3000);
  };

  const handleMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    currentIndex.current = Math.round(offsetX / ITEM_SIZE) - 1; // -1 por causa do left-spacer
  };

  return (
    <Animated.FlatList
      ref={flatListRef}
      data={dataWithSpacers}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={ITEM_SIZE}
      decelerationRate="fast"
      bounces={false}
      contentContainerStyle={{ alignItems: "center" }}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}
      onScrollBeginDrag={handleScrollBeginDrag}
      onScrollEndDrag={handleScrollEndDrag}
      onMomentumScrollEnd={handleMomentumScrollEnd}
      renderItem={({ item, index }) => {
        if (!item.name) {
          return <View style={{ width: SPACER }} />;
        }

        const inputRange = [
          (index - 2) * ITEM_SIZE,
          (index - 1) * ITEM_SIZE,
          index * ITEM_SIZE,
        ];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1, 0.8], // central maior, laterais menores
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={{
              width: ITEM_WIDTH,
              transform: [{ scale }],
              marginHorizontal: ITEM_MARGIN,
            }}
          >
            <GameCardSimple name={item.name} image={item.background_image} />
          </Animated.View>
        );
      }}
    />
  );
}
