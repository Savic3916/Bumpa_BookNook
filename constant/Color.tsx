interface Color {
    primary: string;
    primaryDark: string;
    primaryLight: string;

    background: string;
    surface: string;
    input: string;

    border: string;

    text: string;
    textSecondary: string;
    textMuted: string;

    rating: string;
    danger: string;

    white: string;
    black: string;
}

export const Colors: Color = {
    primary: "#6B4E8E",       // deep muted purple — buttons, active states
    primaryDark: "#4A3563",   // pressed states, headers
    primaryLight: "#F1EBF7",  // soft lavender tint — backgrounds, badges

    background: "#FFFFFF",
    surface: "#F8F6FA",       // faint purple-tinted grey for cards
    input: "#F0ECF4",

    border: "#E7E1ED",

    text: "#241B2F",          // near-black with a purple undertone
    textSecondary: "#7A6E87",
    textMuted: "#A79CB3",

    rating: "#D4A24C",        // warm gold, pairs well against purple
    danger: "#B3475F",        // muted wine-red, stays in family

    white: "#FFFFFF",
    black: "#000000",
};