import { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Props {
  isExpanded: SharedValue<boolean>;
  children: ReactNode;
  viewKey: string;
  style: ViewStyle;
  duration?: number;
}
export default function AccordionItem({
  isExpanded,
  children,
  viewKey,
  style,
  duration = 500,
}: Props) {
  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isExpanded.value), {
      duration,
    })
  );
  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  return (
    <Animated.View
      key={`accordionItem_${viewKey}`}
      style={[styles.animatedView, bodyStyle, style]}
    >
      <View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={styles.wrapper}
      >
        {children}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animatedView: {},
  wrapper: {},
});
