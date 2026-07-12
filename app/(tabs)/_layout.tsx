import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from "expo-router";
import { Colors } from "../../constant/Color";

export default function RootLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.textMuted,
                tabBarStyle: {
                    backgroundColor: Colors.background,
                    borderTopColor: Colors.border,
                },
            }}
        >
            <Tabs.Screen name="home" options={{
                title: 'Home',
                tabBarIcon: ({ color }) => <FontAwesome size={24} name="book" color={color} />,
            }} />
            <Tabs.Screen name="cart" options={{
                title: 'Cart',
                tabBarIcon: ({ color }) => <FontAwesome size={24} name="shopping-cart" color={color} />,
            }} />
        </Tabs>
    );
}