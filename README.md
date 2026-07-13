# The Book Nook App

A React Native (Expo) app built for a small independent bookstore, allowing customers to browse inventory, view book details, manage a shopping cart, and (eventually) check out — built for the Bumpa Mobile Engineer Assessment.

## Features

- **Browse & Search** — Home screen lists all books with a live search filter by title, plus infinite scroll pagination (8 books per page) to handle large catalogs efficiently.
- **Book Details** — Dedicated screen that fetches a single book by ID, showing a loading spinner while fetching and a retry-able error state if the fetch fails.
- **Shopping Cart** — Add books to cart, adjust quantities, remove items, and see the total price update in real time.
- **Add to Cart Animation** — A subtle "fly to cart" animation (React Native `Animated`) plays when a book is added, giving the user visual feedback.
- **Add a Book** — Users can add a new book with a cover image (picked from the device library), title, author, price, rating, and description.
- **Mock Data Mode** — The app can run entirely offline against seeded mock data, with no Firebase project required (useful for demos or grading).

## Tech Stack

- **Framework:** React Native + Expo (Expo Router for file-based navigation)
- **Language:** TypeScript
- **State Management:** Redux Toolkit (`booksSlice`, `cartSlice`) — chosen over Context for predictable, centralized state as the app grows (async thunks for fetch/add, typed hooks via `useAppSelector`/`useAppDispatch`)
- **Backend:** Firebase Firestore (with a mock-data fallback layer for offline/demo use)
- **Animation:** React Native `Animated` API for the add-to-cart effect
- **Icons:** `@expo/vector-icons` (FontAwesome)

## Architecture Notes

- `lib/booksApi.ts` centralizes all data access. A `USE_MOCK_DATA` flag (driven by an env variable) transparently switches every function between live Firestore calls and an in-memory mock dataset, so UI code never needs to know which source it's talking to.
- `store/` holds Redux slices: `booksSlice` manages fetched book data and loading/error state via `createAsyncThunk`; `cartSlice` manages cart items, quantities, and derived totals.
- Home screen pagination is handled client-side with `visibleCount` + `onEndReached`, alongside `FlatList` performance props (`initialNumToRender`, `maxToRenderPerBatch`, `windowSize`, `removeClippedSubviews`) to keep large lists smooth.
- Book cover images are lazy-loaded per row via `Image`, avoiding upfront loading of the full catalog's images.

## Setup Instructions

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root:
   ```
   EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   EXPO_PUBLIC_USE_MOCK_DATA=true
   ```
   Set `EXPO_PUBLIC_USE_MOCK_DATA=false` to connect to a real Firestore project instead (update `lib/firebase.ts` with your own Firebase config).
3. Start the dev server:
   ```bash
   npx expo start --dev-client --clear
   ```
4. Run on a development build (Android/iOS) or press `w` for web.

> **Note:** This project uses a custom dev client (not Expo Go) due to native dependencies. Make sure you have a dev build installed on your device/simulator first.

## Known Gaps / Next Steps

- **Unit tests** are not yet included in this build and are a planned addition (Jest / React Native Testing Library) covering the price display component, cart add/remove logic, book-fetching API calls, and checkout.
- **Checkout flow** currently totals the cart but does not yet process a real payment/order submission.

## Project Structure

```
app/
  (tabs)/
    home.tsx        # Book list, search, pagination
    cart.tsx        # Cart view, quantity controls, checkout total
  books/[id].tsx     # Book details screen
  add-book.tsx       # Add a new book (modal)
components/
  PriceTag.tsx
  CheckoutButton.tsx
lib/
  firebase.ts        # Firebase init
  booksApi.ts         # Data layer (Firestore + mock fallback)
  mockData.ts         # Seed data for mock mode
store/
  store.ts
  booksSlice.ts
  cartSlice.ts
  hooks.ts
```
