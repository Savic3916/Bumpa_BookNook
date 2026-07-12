import React from "react";
import { StyleSheet, Text } from "react-native";
import { Colors } from "../constant/Color";

interface PriceTagProps {
    price: number;
}

export default function PriceTag({ price }: PriceTagProps) {
    return <Text style={styles.price}>${price.toFixed(2)}</Text>;
}

const styles = StyleSheet.create({
    price: {
        fontSize: 15,
        fontWeight: "700",
        color: Colors.primary
    },
});