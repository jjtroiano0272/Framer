import { Slider, PanDirectionEnum } from "react-native-awesome-slider";
import { StyleSheet, Platform } from "react-native";
import {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from "react-native-reanimated";
import LottieView from "lottie-react-native";
import Animated from "react-native-reanimated";
import { SliderCard } from "@/components/slider-card";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export function SliderWithLottie() {
  const progress = useSharedValue(20);
  const min = useSharedValue(10);
  const max = useSharedValue(110);
  const thumbLottieValue = useSharedValue<PanDirectionEnum>(
    PanDirectionEnum.START
  );

  const thumbAnimatedProps = useAnimatedProps(() => {
    let value = 0;
    if (thumbLottieValue.value === PanDirectionEnum.START) {
      value = 0.25;
    }
    if (thumbLottieValue.value === PanDirectionEnum.LEFT) {
      value = 0.0;
    }
    if (thumbLottieValue.value === PanDirectionEnum.RIGHT) {
      value = 0.5;
    }
    if (thumbLottieValue.value === PanDirectionEnum.END) {
      value = 0.25;
    }
    return {
      progress: withTiming(value, { duration: 600 }),
    };
  });

  if (Platform.OS === "web") {
    return null;
  }

  return (
    <SliderCard title="Lottie Animation">
      <Slider
        progress={progress}
        style={styles.slider}
        minimumValue={min}
        maximumValue={max}
        theme={{
          maximumTrackTintColor: "#292929",
          minimumTrackTintColor: "#EAECEF",
          bubbleBackgroundColor: "#E0E2E5",
          bubbleTextColor: "#262C36",
          cacheTrackTintColor: "rgba(189, 186, 186, 0.6)",
        }}
        containerStyle={styles.borderRadius}
        panDirectionValue={thumbLottieValue}
        thumbWidth={50}
        renderThumb={() => (
          <AnimatedLottieView
            animatedProps={thumbAnimatedProps}
            source={require("@/assets/rainbow.json")}
            style={styles.lottie}
          />
        )}
      />
    </SliderCard>
  );
}

const styles = StyleSheet.create({
  slider: {
    marginBottom: 20,
    marginTop: 12,
  },
  borderRadius: {
    borderRadius: 20,
  },
  lottie: {
    width: 60,
    height: 60,
    bottom: -4,
  },
});
