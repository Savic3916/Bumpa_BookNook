import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Animated,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import PriceTag from "../../components/PriceTag";
import { Colors } from "../../constant/Color";
import { Book, fetchBookByIdFromFirestore } from "../../lib/booksApi";
import { addToCart } from "../../store/cartSlice";
import { useAppDispatch } from "../../store/hooks";

export default function BookDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const flyAnim = useRef(new Animated.Value(0)).current;
    const [showFly, setShowFly] = useState(false);

    useEffect(() => {
        let isMounted = true;

        async function loadBook() {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchBookByIdFromFirestore(id as string);
                if (isMounted) setBook(data);
            } catch {
                if (isMounted) setError("Could not load this book. Please try again.");
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        loadBook();
        return () => {
            isMounted = false;
        };
    }, [id]);

    const handleAddToCart = () => {
        if (!book) return;
        dispatch(addToCart(book));

        setShowFly(true);
        flyAnim.setValue(0);
        Animated.timing(flyAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }).start(() => setShowFly(false));
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (error || !book) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error ?? "Book not found"}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={() => router.back()}>
                    <Text style={styles.retryButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const translateY = flyAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 400] });
    const translateX = flyAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 60] });
    const opacity = flyAnim.interpolate({ inputRange: [0, 0.8, 1], outputRange: [1, 1, 0] });
    const scale = flyAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.3] });

    const fullStars = Math.round(book.rating);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Image
                source={{ uri: book.coverUrl ?? "https://placehold.co/300x450" }}
                style={styles.cover}
            />

            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>by {book.author}</Text>

            <View style={styles.ratingRow}>
                <Text style={styles.rating}>{"★".repeat(fullStars)}{"☆".repeat(5 - fullStars)}</Text>
                <Text style={styles.reviewCount}>({book.rating.toFixed(1)})</Text>
            </View>

            <PriceTag price={book.price} />

            <Text style={styles.sectionLabel}>Description</Text>
            <Text style={styles.description}>{book.description}</Text>

            <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
                <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>

            {showFly && (
                <Animated.View
                    pointerEvents="none"
                    style={[styles.flyIcon, { opacity, transform: [{ translateY }, { translateX }, { scale }] }]}
                >
                    <FontAwesome name="book" size={26} color={Colors.primary} />
                </Animated.View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    content: { alignItems: "center", paddingHorizontal: 20, paddingTop: 60, paddingBottom: 60 },
    centered: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.background, paddingHorizontal: 20 },
    errorText: { fontSize: 15, color: Colors.danger, textAlign: "center", marginBottom: 16 },
    retryButton: { backgroundColor: Colors.primary, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 24 },
    retryButtonText: { color: Colors.white, fontWeight: "700" },
    cover: { width: 180, height: 260, borderRadius: 14, backgroundColor: Colors.input, marginBottom: 16 },
    title: { fontSize: 22, fontWeight: "700", color: Colors.text, textAlign: "center" },
    author: { fontSize: 15, color: Colors.textSecondary, marginTop: 4 },
    ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
    rating: { fontSize: 16, color: Colors.rating },
    reviewCount: { fontSize: 13, color: Colors.textMuted, marginLeft: 8 },
    sectionLabel: { alignSelf: "flex-start", fontSize: 16, fontWeight: "700", color: Colors.text, marginTop: 24, marginBottom: 8 },
    description: { fontSize: 14, lineHeight: 21, color: Colors.textSecondary },
    addButton: {
        backgroundColor: Colors.primary, borderRadius: 14, paddingVertical: 14, paddingHorizontal: 40,
        marginTop: 30, alignSelf: "stretch", alignItems: "center",
        shadowColor: Colors.primaryDark, shadowOpacity: 0.25, shadowRadius: 6, shadowOffset: { width: 0, height: 3 }, elevation: 3,
    },
    addButtonText: { color: Colors.white, fontSize: 16, fontWeight: "700" },
    flyIcon: { position: "absolute", bottom: 100, alignSelf: "center" },
});