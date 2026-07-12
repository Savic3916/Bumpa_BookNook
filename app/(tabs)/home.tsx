import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import PriceTag from "../../components/PriceTag";
import { Colors } from "../../constant/Color";
import { Book } from "../../lib/booksApi";
import { fetchBooks } from "../../store/booksSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const PAGE_SIZE = 8;

export default function Home() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { items: books, loading, error } = useAppSelector((state) => state.books);

    const [search, setSearch] = useState("");
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    useFocusEffect(
        useCallback(() => {
            dispatch(fetchBooks());
        }, [dispatch])
    );

    const filteredBooks = books.filter((b) =>
        b.title.toLowerCase().includes(search.toLowerCase())
    );
    const visibleBooks = filteredBooks.slice(0, visibleCount);

    const renderBook = ({ item }: { item: Book }) => (
        <TouchableOpacity style={styles.card} onPress={() => router.push({
            pathname: "/books/[id]",
            params: {
                id: item.id,
            },
        })}>
            <Image
                source={{ uri: item.coverUrl ?? "https://placehold.co/100x150" }}
                style={styles.cover}
            />
            <View style={styles.cardInfo}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.author}>{item.author}</Text>
                <PriceTag price={item.price} />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.header}>Book Nook</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => router.push("/add-book")}>
                    <FontAwesome name="plus" size={18} color={Colors.white} />
                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.searchInput}
                placeholder="Search books..."
                placeholderTextColor={Colors.textMuted}
                value={search}
                onChangeText={setSearch}
            />

            {loading && books.length === 0 ? (
                <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 40 }} />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <FlatList
                    data={visibleBooks}
                    keyExtractor={(item) => item.id}
                    renderItem={renderBook}
                    contentContainerStyle={styles.list}
                    initialNumToRender={PAGE_SIZE}
                    maxToRenderPerBatch={PAGE_SIZE}
                    windowSize={5}
                    removeClippedSubviews
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (visibleCount < filteredBooks.length) {
                            setVisibleCount((prev) => prev + PAGE_SIZE);
                        }
                    }}
                    ListEmptyComponent={<Text style={styles.emptyText}>No books yet — tap + to add one</Text>}
                    ListFooterComponent={
                        visibleCount < filteredBooks.length ? (
                            <ActivityIndicator size="small" color={Colors.primary} style={{ marginVertical: 16 }} />
                        ) : null
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: 16, paddingTop: 60 },
    headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
    header: { fontSize: 28, fontWeight: "700", color: Colors.text },
    addButton: {
        backgroundColor: Colors.primary, width: 42, height: 42, borderRadius: 21,
        justifyContent: "center", alignItems: "center",
        shadowColor: Colors.primaryDark, shadowOpacity: 0.25, shadowRadius: 6, shadowOffset: { width: 0, height: 3 }, elevation: 3,
    },
    searchInput: {
        backgroundColor: Colors.input, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12,
        fontSize: 15, color: Colors.text, marginBottom: 16,
    },
    list: { paddingBottom: 100 },
    card: {
        flexDirection: "row", marginBottom: 14, backgroundColor: Colors.surface, borderRadius: 14,
        padding: 10, alignItems: "center", borderWidth: 1, borderColor: Colors.border,
    },
    cover: { width: 55, height: 80, borderRadius: 8, backgroundColor: Colors.input },
    cardInfo: { marginLeft: 12, flex: 1 },
    title: { fontSize: 16, fontWeight: "600", color: Colors.text },
    author: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
    emptyText: { textAlign: "center", marginTop: 40, color: Colors.textMuted },
    errorText: { textAlign: "center", marginTop: 40, color: Colors.danger },
});