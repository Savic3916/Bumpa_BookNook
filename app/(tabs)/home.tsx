// app/(tabs)/home.tsx
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors } from "../../constant/Color";

export default function Home() {
    const router = useRouter();

    const placeholderBooks = [{ id: "1" }, { id: "2" }, { id: "3" }];

    const renderBook = ({ item }: { item: { id: string } }) => (
        <TouchableOpacity
            style={styles.card}
        //   onPress={() => router.push(`/book/${item.id}`)}
        >
            <Image
                source={{ uri: "https://placehold.co/100x150" }}
                style={styles.cover}
            />
            <View style={styles.cardInfo}>
                <Text style={styles.title} numberOfLines={1}>
                    Book Title
                </Text>
                <Text style={styles.author}>Author Name</Text>
                <Text style={styles.price}>$0.00</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.header}>Book Nook</Text>
                <TouchableOpacity style={styles.addButton}>
                    <FontAwesome name="plus" size={18} color={Colors.white} />
                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.searchInput}
                placeholder="Search books..."
                placeholderTextColor={Colors.textMuted}
            />

            <FlatList
                data={placeholderBooks}
                keyExtractor={(item) => item.id}
                renderItem={renderBook}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No books yet — tap + to add one</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: 16, paddingTop: 60 },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    header: { fontSize: 28, fontWeight: "700", color: Colors.text },
    addButton: {
        backgroundColor: Colors.primary,
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: Colors.primaryDark,
        shadowOpacity: 0.25,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    searchInput: {
        backgroundColor: Colors.input,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 15,
        color: Colors.text,
        marginBottom: 16,
    },
    list: { paddingBottom: 100 },
    card: {
        flexDirection: "row",
        marginBottom: 14,
        backgroundColor: Colors.surface,
        borderRadius: 14,
        padding: 10,
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.border,
    },
    cover: { width: 55, height: 80, borderRadius: 8, backgroundColor: Colors.input },
    cardInfo: { marginLeft: 12, flex: 1 },
    title: { fontSize: 16, fontWeight: "600", color: Colors.text },
    author: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
    price: { fontSize: 15, fontWeight: "700", marginTop: 6, color: Colors.primary },
    emptyText: { textAlign: "center", marginTop: 40, color: Colors.textMuted },
});