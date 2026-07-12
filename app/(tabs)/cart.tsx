import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CheckoutButton from "../../components/CheckoutButton";
import PriceTag from "../../components/PriceTag";
import { Colors } from "../../constant/Color";
import { CartItem, decrementQuantity, incrementQuantity } from "../../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function Cart() {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);

    const total = cartItems.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

    const renderItem = ({ item }: { item: CartItem }) => (
        <View style={styles.row}>
            <Image
                source={{ uri: item.book.coverUrl ?? "https://placehold.co/80x120" }}
                style={styles.cover}
            />
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>{item.book.title}</Text>
                <PriceTag price={item.book.price} />
            </View>
            <View style={styles.qtyControls}>
                <TouchableOpacity style={styles.qtyButton} onPress={() => dispatch(decrementQuantity(item.book.id))}>
                    <Text style={styles.qtyButtonText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <TouchableOpacity style={styles.qtyButton} onPress={() => dispatch(incrementQuantity(item.book.id))}>
                    <Text style={styles.qtyButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Cart</Text>

            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.book.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty</Text>}
            />

            {cartItems.length > 0 && (
                <View style={styles.footer}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                    </View>
                    <CheckoutButton total={total} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 16,
        paddingTop: 60
    },
    header: { fontSize: 28, fontWeight: "700", color: Colors.text, marginBottom: 16 },
    list: { paddingBottom: 20 },
    row: {
        flexDirection: "row", alignItems: "center", marginBottom: 14, backgroundColor: Colors.surface,
        borderRadius: 14, padding: 10, borderWidth: 1, borderColor: Colors.border,
    },
    cover: { width: 45, height: 65, borderRadius: 8, backgroundColor: Colors.input },
    info: { flex: 1, marginLeft: 12 },
    title: { fontSize: 15, fontWeight: "600", color: Colors.text },
    qtyControls: { flexDirection: "row", alignItems: "center" },
    qtyButton: {
        width: 28, height: 28, borderRadius: 14, backgroundColor: Colors.primaryLight,
        justifyContent: "center", alignItems: "center",
    },
    qtyButtonText: { fontSize: 16, fontWeight: "700", color: Colors.primary },
    qtyText: { marginHorizontal: 10, fontSize: 15, fontWeight: "600", color: Colors.text },
    emptyText: { textAlign: "center", marginTop: 40, color: Colors.textMuted },
    footer: { borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: 14, paddingBottom: 20 },
    totalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
    totalLabel: { fontSize: 16, color: Colors.textSecondary },
    totalValue: { fontSize: 20, fontWeight: "700", color: Colors.text },
});