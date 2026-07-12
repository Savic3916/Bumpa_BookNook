import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { Colors } from "../constant/Color";
import { addBook } from "../store/booksSlice";
import { useAppDispatch } from "../store/hooks";

export default function AddBook() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [image, setImage] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");
    const [description, setDescription] = useState("");
    const [saving, setSaving] = useState(false);

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert('Permission required', 'Permission to access the media library is required.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        if (!title || !author || !price) {
            Alert.alert("Missing info", "Title, author, and price are required.");
            return;
        }

        setSaving(true);
        try {
            await dispatch(
                addBook({
                    title,
                    author,
                    price: parseFloat(price) || 0,
                    rating: parseFloat(rating) || 0,
                    description,
                    coverUrl: image,
                })
            ).unwrap();
            router.back();
        } catch (e) {
            console.log("SAVE ERROR:", e);
            Alert.alert("Error", "Could not save the book. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <FontAwesome name="arrow-left" size={20} color={Colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.header}>Add a Book</Text>
                    <View style={{ width: 20 }} />
                </View>

                <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.previewImage} />
                    ) : (
                        <>
                            <FontAwesome name="camera" size={24} color={Colors.textMuted} />
                            <Text style={styles.imagePickerText}>Add Cover Image</Text>
                        </>
                    )}
                </TouchableOpacity>

                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. The Midnight Library"
                    placeholderTextColor={Colors.textMuted}
                    value={title}
                    onChangeText={setTitle}
                />

                <Text style={styles.label}>Author</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. Matt Haig"
                    placeholderTextColor={Colors.textMuted}
                    value={author}
                    onChangeText={setAuthor}
                />

                <Text style={styles.label}>Price</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. 14.99"
                    placeholderTextColor={Colors.textMuted}
                    keyboardType="decimal-pad"
                    value={price}
                    onChangeText={setPrice}
                />

                <Text style={styles.label}>Rating</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. 4.5"
                    placeholderTextColor={Colors.textMuted}
                    keyboardType="decimal-pad"
                    value={rating}
                    onChangeText={setRating}
                />

                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="What's this book about?"
                    placeholderTextColor={Colors.textMuted}
                    multiline
                    numberOfLines={5}
                    value={description}
                    onChangeText={setDescription}
                />

                <TouchableOpacity style={styles.submitButton} onPress={handleSave} disabled={saving}>
                    {saving ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.submitButtonText}>Save Book</Text>}
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    content: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 60 },
    headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 24 },
    backButton: { width: 36, height: 36, justifyContent: "center" },
    header: { fontSize: 20, fontWeight: "700", color: Colors.text },
    imagePicker: {
        alignSelf: "center", width: 140, height: 200, borderRadius: 14, backgroundColor: Colors.input,
        borderWidth: 1, borderColor: Colors.border, borderStyle: "dashed", justifyContent: "center",
        alignItems: "center", marginBottom: 28, overflow: "hidden",
    },
    previewImage: { width: "100%", height: "100%" },
    imagePickerText: { marginTop: 8, fontSize: 13, color: Colors.textMuted },
    label: { fontSize: 14, fontWeight: "600", color: Colors.text, marginBottom: 6, marginTop: 14 },
    input: { backgroundColor: Colors.input, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: Colors.text },
    textArea: { height: 110, textAlignVertical: "top" },
    submitButton: {
        backgroundColor: Colors.primary, borderRadius: 14, paddingVertical: 15, alignItems: "center", marginTop: 30,
        shadowColor: Colors.primaryDark, shadowOpacity: 0.25, shadowRadius: 6, shadowOffset: { width: 0, height: 3 }, elevation: 3,
    },
    submitButtonText: { color: Colors.white, fontSize: 16, fontWeight: "700" },
});