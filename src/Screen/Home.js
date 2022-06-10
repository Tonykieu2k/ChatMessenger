import React, { useRef } from "react";
import { Animated, View, StyleSheet, Image, PanResponder, Text, TouchableOpacity } from "react-native";
// import MainScreen from './Main'

const Home = ({ navigation }) => {

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ],
        {useNativeDriver: false}
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  ).current;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Drag this box!</Text>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }, ]
        }}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: 'https://sojohotels.com/static/images/common/ic_contact.png',
            }}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  },
  tinyLogo: {
    width: 52,
    height: 55,
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5
  }
});

export default Home;