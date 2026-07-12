import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors } from "../../constant/Color";

export default function BookDetails() {
    const { id } = useLocalSearchParams();

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Image
                source={{ uri: "https://placehold.co/300x450" }}
                style={styles.cover}
            />

            <Text style={styles.idBadge}>Book id: {id}</Text>

            <Text style={styles.title}>Book Title Here</Text>
            <Text style={styles.author}>by Author Name</Text>

            <View style={styles.ratingRow}>
                <Text style={styles.rating}>★★★★☆</Text>
                <Text style={styles.reviewCount}>(123 reviews)</Text>
            </View>

            <Text style={styles.price}>$14.99</Text>

            <Text style={styles.sectionLabel}>Description</Text>
            <Text style={styles.description}>
                This is where the book description will go. It gives readers an idea
                of what the story or content is about, written in a couple of short
                paragraphs.
            </Text>

            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 60,
    },
    cover: {
        width: 180,
        height: 260,
        borderRadius: 14,
        backgroundColor: Colors.input,
        marginBottom: 16,
    },
    idBadge: {
        fontSize: 12,
        color: Colors.textMuted,
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: Colors.text,
        textAlign: "center",
    },
    author: {
        fontSize: 15,
        color: Colors.textSecondary,
        marginTop: 4,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    rating: {
        fontSize: 16,
        color: Colors.rating,
    },
    reviewCount: {
        fontSize: 13,
        color: Colors.textMuted,
        marginLeft: 8,
    },
    price: {
        fontSize: 20,
        fontWeight: "700",
        color: Colors.primary,
        marginTop: 14,
    },
    sectionLabel: {
        alignSelf: "flex-start",
        fontSize: 16,
        fontWeight: "700",
        color: Colors.text,
        marginTop: 24,
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        lineHeight: 21,
        color: Colors.textSecondary,
    },
    addButton: {
        backgroundColor: Colors.primary,
        borderRadius: 14,
        paddingVertical: 14,
        paddingHorizontal: 40,
        marginTop: 30,
        alignSelf: "stretch",
        alignItems: "center",
        shadowColor: Colors.primaryDark,
        shadowOpacity: 0.25,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    addButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: "700",
    },
});