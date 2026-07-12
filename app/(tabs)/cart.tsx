import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constant/Color";

export default function Cart() {
    const router = useRouter();

    const placeholderCart = [{ id: "1" }, { id: "2" }, { id: "3" }];

    const renderItem = ({ item }: { item: { id: string } }) => (
        <TouchableOpacity
            style={styles.row}
        // onPress={() => router.push(`/cart/${item.id}`)}
        >
            <Image
                source={{ uri: "https://placehold.co/80x120" }}
                style={styles.cover}
            />
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>
                    Book Title
                </Text>
                <Text style={styles.price}>$0.00</Text>
            </View>
            <View style={styles.qtyControls}>
                <TouchableOpacity style={styles.qtyButton}>
                    <Text style={styles.qtyButtonText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>1</Text>
                <TouchableOpacity style={styles.qtyButton}>
                    <Text style={styles.qtyButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Cart</Text>

            <FlatList
                data={placeholderCart}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty</Text>}
            />

            <View style={styles.footer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>$0.00</Text>
                </View>
                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.checkoutText}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: 16, paddingTop: 60 },
    header: { fontSize: 28, fontWeight: "700", color: Colors.text, marginBottom: 16 },
    list: { paddingBottom: 20 },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
        backgroundColor: Colors.surface,
        borderRadius: 14,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    cover: { width: 45, height: 65, borderRadius: 8, backgroundColor: Colors.input },
    info: { flex: 1, marginLeft: 12 },
    title: { fontSize: 15, fontWeight: "600", color: Colors.text },
    price: { fontSize: 14, color: Colors.primary, marginTop: 4 },
    qtyControls: { flexDirection: "row", alignItems: "center" },
    qtyButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: Colors.primaryLight,
        justifyContent: "center",
        alignItems: "center",
    },
    qtyButtonText: { fontSize: 16, fontWeight: "700", color: Colors.primary },
    qtyText: { marginHorizontal: 10, fontSize: 15, fontWeight: "600", color: Colors.text },
    emptyText: { textAlign: "center", marginTop: 40, color: Colors.textMuted },
    footer: { borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: 14, paddingBottom: 20 },
    totalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
    totalLabel: { fontSize: 16, color: Colors.textSecondary },
    totalValue: { fontSize: 20, fontWeight: "700", color: Colors.text },
    checkoutButton: {
        backgroundColor: Colors.primary,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
        shadowColor: Colors.primaryDark,
        shadowOpacity: 0.25,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    checkoutText: { color: Colors.white, fontSize: 16, fontWeight: "700" },
});