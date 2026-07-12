import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../store/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="book/[id]" options={{ headerShown: false }} />
        <Stack.Screen
          name="add-book"
          options={{ headerShown: false, presentation: "modal" }}
        />
      </Stack>
    </Provider>
  );
}