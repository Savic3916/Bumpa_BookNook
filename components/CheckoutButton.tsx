// components/CheckoutButton.tsx
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../constant/Color";
import { clearCart } from "../store/cartSlice";
import { useAppDispatch } from "../store/hooks";

interface CheckoutButtonProps {
    total: number;
}

export default function CheckoutButton({ total }: CheckoutButtonProps) {
    const dispatch = useAppDispatch();

    const handleCheckout = () => {
        if (total <= 0) return;
        dispatch(clearCart());
        Alert.alert("Order placed", "Thank you for your purchase!");
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handleCheckout} testID="checkout-button">
            <Text style={styles.text}>Checkout</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: { backgroundColor: Colors.primary, borderRadius: 12, paddingVertical: 14, alignItems: "center" },
    text: { color: Colors.white, fontSize: 16, fontWeight: "700" },
});