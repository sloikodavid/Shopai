# Shopai Documentation

## Overview

This document provides a detailed breakdown of the mobile shopping app "Shopai", including its core functionalities, navigation flow, and structure. The goal is to help developers fully understand and design the app step by step.

**TICK OFF COMPLETED TASKS WITH `[x]`**

## Features Summary

- **Login/Signup Page**: Allows users to log in using Email + OTP.
- **Search Page**: A user can search for products to start a conversation with the AI.
- **Conversation View**: AI asks the user questions to narrow down product choices, after that, it recommends a *deck* of *cards* that can be opened to view.
- **Deck View**: Displays the *deck* of *cards* that the AI recommended, with options to modify the *deck* through further AI interaction. Cards can be swiped up to remove them or down to put them at the back of the *deck*. 
- **Card View**: Scrollable page with the AI summary, official product description, reviews (from Merchant API), and *product listings* on different sites - listings and prices appear for the user-selected location in the settings. There's an option to load more *listings* and a constant floating button to reply to the current card (puts the user back on the conversation page, with a card reply element).
- **Saved Page**: Stores user-saved *conversations*, *cards*, and *decks*.
- **AI/Search Processing**: The *conversation* with AI is powered by gemini-2.0-flash using the Gemini API. Finding the product will be handled by feeding *conversation* information to gemini-2.0-flash with "Grounding with Google Search" enabled. Getting the product images, reviews, and *listings* will be handled by the Google Merchant API used through DataForSEO. The API calls to the Gemini API and DataForSEO will all be made through n8n, in smart workflows.
- **Supabase Integration**: Handles accounts, saved cards (image links, summaries, descriptions, listings) with Vector Store embeddings for AI retrieval, backend storage, and user data.
- **Subscription Paywall**: All features locked behind a subscription hard paywall, with a 7-day free trial.

## 1. Tech Stack

> For complete dependency information and exact versions, refer to the `package.json` file in the project root.

### Frontend Packages:
- `react-native`
- `typescript`
- `expo`
- `expo-router`
- `nativewind` (tailwind for react native)
- `react-native-reusables` (shadcn for react native)
- `react-native-reanimated` (animations)
- `react-native-gesture-handler` (gestures)
- `react-native-deck-swiper` (card-swiping interactions)
- `react-native-reanimated-carousel` (card view image carousel)
- `@heroicons/react` (icons)
- `expo-linear-gradient` (gradients)
- `expo-image` (image handling)
- `@gorhom/bottom-sheet` (bottom sheet/modal)
- `react-native-safe-area-context`
- `zustand`
- `@tanstack/react-query`
- `zod`
- `expo-in-app-purchases`

### Backend & Integration:
- `@supabase/supabase-js`
- n8n (Workflow Automation)
- Google Gemini API
- DataForSEO Merchant API

### AI/Search Integration (via n8n workflows):
- Google gemini-2.0-flash - $0.1/1000 requests
- Google gemini-2.0-flash with "Grounding with Google Search" - 1500 free daily queries, then $35/1000 requests
- Google Merchant API via DataForSEO - $2.5/1000 queries
- Supabase Vector Store for basic product storage and retrieval

### Development & Deployment:
- Expo Go for testing
- Expo EAS for deployment

## 2. Project Structure

```
shopai/
├── app/                       # Expo Router app directory
│   ├── (auth)/                # Authentication routes
│   │   ├── login.tsx          # Login screen
│   │   ├── verification.tsx   # OTP verification
│   │   └── _layout.tsx        # Auth layout
│   ├── (main)/                # Main app screens (after auth)
│   │   ├── search/            # Search tab
│   │   │   ├── index.tsx      # Search home
│   │   │   ├── [id]/          # Dynamic search conversations
│   │   │   │   ├── index.tsx  # Conversation screen
│   │   │   │   ├── deck.tsx   # Deck view
│   │   │   │   └── card.tsx   # Card view
│   │   │   └── _layout.tsx    # Search layout
│   │   ├── saved/             # Saved items tab
│   │   │   ├── index.tsx      # Saved items home
│   │   │   ├── cards/         # Saved cards
│   │   │   ├── decks/         # Saved decks
│   │   │   ├── conversations/ # Saved conversations
│   │   │   └── _layout.tsx    # Saved layout
│   │   ├── profile/           # User profile
│   │   │   ├── index.tsx      # Profile home
│   │   │   ├── subscription/  # Subscription management
│   │   │   └── _layout.tsx    # Profile layout
│   │   └── _layout.tsx        # Main tab layout
│   ├── _layout.tsx            # Root layout
│   └── index.tsx              # Entry redirect
├── assets/                    # Static assets
│   ├── fonts/                 # Custom fonts
│   ├── images/                # Image assets
│   └── icons/                 # App icons
├── components/                # Shared UI components
│   ├── cards/                 # Card-related components
│   ├── conversation/          # Chat-related components
│   ├── deck/                  # Deck-related components
│   ├── ui/                    # Generic UI components
│   └── providers/             # Context providers (themes, auth, etc.)
├── lib/                       # Core functionality libraries
│   ├── supabase/              # Supabase client setup
│   ├── gemini/                # Gemini API integration
│   ├── dataforseo/            # DataForSEO API integration
│   └── n8n/                   # N8n workflow callers
├── hooks/                     # Custom React hooks
│   ├── use-auth.ts            # Authentication hooks
│   ├── use-cards.ts           # Card-related hooks
│   ├── use-conversation.ts    # Conversation hooks
│   └── use-storage.ts         # Async storage hooks
├── config/                    # Configuration files
│   ├── colors.ts              # Color constants
│   ├── theme.ts               # UI Theme config (with react-native-reusables)
│   ├── fonts.ts               # Font configuration
│   └── constants.ts           # General constants
├── utils/                     # Utility functions
│   ├── api.ts                 # API helper functions
│   ├── format.ts              # Formatting utilities
│   ├── validation.ts          # Input validation
│   └── analytics.ts           # Analytics tracking
├── stores/                    # Zustand stores
│   ├── auth-store.ts          # Authentication state
│   ├── card-store.ts          # Card state
│   ├── conversation-store.ts  # Conversation state
│   └── app-store.ts           # General app state
├── types/                     # TypeScript type definitions
│   ├── supabase.ts            # Supabase type definitions
│   ├── api.ts                 # API response types
│   ├── cards.ts               # Card-related types
│   └── navigation.ts          # Navigation related types
├── supabase/                  # Supabase edge functions
│   ├── functions/             # Edge function code
│   │   ├── auth/              # Auth related functions
│   │   │   └── [...files]     # Auth function files
│   │   ├── n8n/               # N8n workflow triggers
│   │   │   ├── conversation/  # Conversation workflows
│   │   │   ├── search/        # Search workflows
│   │   │   └── products/      # Product data workflows
│   │   └── subscription/      # Subscription validation functions
│   └── migrations/            # Database migrations
│       └── [...files]         # Migration files
├── app.json                   # Expo config
├── babel.config.js            # Babel config
├── eas.json                   # EAS build config
├── metro.config.js            # Metro bundler config
├── tsconfig.json              # TypeScript config
├── package.json               # Project dependencies
└── README.md                  # Project documentation
```

## 3. Data Architecture

### Supabase Data Structure
Supabase serves as the primary database and source of truth for all application data:

1. **User Data**:
   - Authentication information
   - Profile preferences
   - Subscription status
   - Saved items (conversations, decks, cards)

2. **Product/Card Data**:
   - Complete card information (descriptions, images, reviews)
   - Listing details by country
   - Price history

3. **Conversation Data**:
   - Message history
   - Deck versions
   - User prompts

### Supabase Vector Store Structure
Supabase Vector Store is used for basic product storage and retrieval:

1. **Product/Card Vectors**:
```typescript
interface SupabaseCard {
  id: string;
  embedding: number[]; // Embedding from AI model
  product_name: string; // The product name
  brand_name: string; // The product brand name
  price_range: string; // Price range information
  card_id: string // Supabase ID to retrieve card information
}
```

### Data Storage Strategy
- All product data is stored in Supabase tables
- Vector embeddings for basic similarity are stored in pgvector extension
- Product discovery and retrieval is primarily handled by direct AI queries via n8n

## 4. User Flow

### 4.1 Login/Signup

- Users are greeted with a **login screen**, the **login screen** has an *email input box*, and a *6 digit code input.*
- They can sign in via *Email + OTP*, or browse the app without an account, but it's required for *subscribing*, and a *subscription* is mandatory for using ANY features.
- Users create a unique *username* during signup.
- After signing-in and accepting the *privacy policy & terms and conditions*, they land on the **Search Page**.
- New users are offered a 7-day *free trial* of the app's features.

### 4.2 **Search Page**

- *Search-style input box* for entering product queries to begin the conversation.
- *Begin* button for product discovery.
- Tapping the *Begin* button triggers the **Conversation View**.

### 4.3 **Conversation View**

- Conversation starts with the user's *message*, to which the AI responds with a series of narrowing-down questions to gather everything the user wants.
- After gathering enough information, the AI recommends a *deck* of about 10 *cards* that match the user's requirements from the previous *messages*.
- *Messages* + *Decks* can always be *rolled back* to a certain point in the *conversation*.
- The deck can be tapped to open the **Deck View**.

### 4.4 **Deck View**

- Displays the *deck* of recommended *cards*, one *card* at a time, with horizontally scrollable images (not files, but image links that show up as images), the name of the product, and the lowest price available for that product, from the available listings (all of this is fetched using the Google Merchant API through DataForSEO in n8n).
- Users can:
  - Swipe up to remove *cards* from the *deck* (they can be restored later, in that specific *version* of the *deck*)
  - Swipe down to bring the currently viewed *card* to the back of the *deck*.
  - Press down on the product name to copy it.
  - Save individual *cards* or the entire *deck*
  - Send a *message* to ask questions about the product from the currently viewed *card* or modify the *deck* based on the request and/or the currently viewed product/*card*. Whether the user is asking about the product or wants to modify the deck will be understood by AI. Modifying the *deck* automatically creates a new *version* of the *deck* in the background (the list of removed *cards* is also copied), so when the user goes back to the **Conversation View**, he will see the AI-sent *deck*, user-sent *message* of what to change, the AI-sent new *version* of that *deck*, and so on - you can always *roll back* to a previous *message*/*edit* it, this will delete the *messages* sent after the message that was *rolled back* to.
  - Tap on a *card* to open the **Card View**.

### 4.5 **Card View**

- Displays all the same things as in the **deck view** as well as *product listings* on different sites, based on the user's selected location (in the settings), full reviews (up to 50), as well as an in-depth, AI-generated product description.
- Users can:
  - Do all the same actions as on the **deck view** EXCEPT swiping up/down, because it's not a card.
  - Open the review list.
  - Add more *product listings* for that product from the same/different country.

### 4.6 Saved Tab

- Stores **Saved Cards**, **Saved Decks**, and **Saved Conversations**.
- Users can:
  - Tap a saved *card* to open the **Card View**.
  - Tap a saved *deck* to view all the *cards* in the *deck* (viewed in the **deck view**).
  - Tap a saved *conversation* to continue where they left off.
- All saved items can be searched or sorted by date added.

### 4.7 *Conversation* Management

- Users can *save* *conversations* to their account.
- Unsaved *conversations* are automatically deleted after 14 days.
- Users can edit previous messages to change the *conversation* flow.

### 4.8 Subscription Management

-  Free users have limited access to:
  - Ability to browse the app, when they want to use a feature, show them a hard paywall.
- Subscribed users get:
  - The app features.
  - 100 total Saved Cards.
- Users can manage their subscription from their profile page
- Subscription offers:
  - Monthly plan (7 day free trial for new users)
  - Annual plan (discounted)

## 5. Supabase Integration

### 5.1 Role Division

- **Supabase**: Primary database and source of truth
  - Stores complete user data, product information, and all app state
  - Handles authentication, user management, and subscriptions
  - Stores conversation history and saved items

- **Supabase Vector Store**: Basic product storage
  - Stores vector embeddings for basic product information
  - Enables simple similarity searches when needed
  - Provides backup for product data when offline

- **Supabase Edge Functions**: Secure server-side operations
  - Handles sensitive operations like payment validation
  - Triggers and manages n8n workflows
  - Provides API endpoints for external services integration

### 5.2 Data Flow

1. **Product Discovery Flow**:
   - User conversation generates search context
   - n8n workflow calls Gemini API with Google Search grounding
   - Discovered products are stored in Supabase
   - Product details presented to user

2. **Storage Flow**:
   - Cards are embedded using AI models
   - Embeddings stored in Supabase vector store (pgvector)
   - Full product details stored in regular Supabase tables
   - User saves and history tracked in relational tables

## 6. AI Processing & Data Retrieval

All AI and data processing is implemented in n8n workflows, called via Supabase Edge Functions:

1. **Edge Function Flow**:
   - Client app calls Supabase Edge Function
   - Edge Function authenticates and validates request
   - Edge Function calls appropriate n8n workflow with required parameters
   - Results returned to client app

2. **AI Processing**: Used for most text-based tasks, search refinement, funneling and data processing.
3. **AI Processing with Search Grounding**: About 100x more expensive but ensures up-to-date and accurate product data, should be used to improve the user experience when needed.
4. **Merchant API (from DataForSEO)**: Fetches product images, listings by country, reviews.

- When a card is generated, the AI also generates the **Card View** simultaneously in a different part of the answer, to save generations.
- Simple embeddings for products are generated using AI models and stored in Supabase Vector Store.

## 7. In-App Purchase Integration

### 7.1 Subscription Plans

Two main subscription tiers:
- **Monthly**: $11.99/month
- **Annual**: $35.99/year (free trial for new users)

### 7.2 Free Trial

- 7-day free trial for new users
- Automatic conversion to paid subscription after trial (unless canceled)
- One trial per user (tied to account)

### 7.3 Implementation Strategy

1. **Native Purchase Libraries**:
   - Use expo-in-app-purchases for cross-platform purchase handling
   - Configure product IDs in app.json

2. **Server-Side Validation**:
   - Use Supabase edge functions to validate purchases via App Store/Google Play
   - Store subscription status in database

3. **Client-Side Feature Gating**:
   - Check subscription status before allowing access to features
   - Provide upgrade paywalls when trying to access features and at other appropriate moments

4. **Trial Management**:
   - Set trial start and trial end timestamps on new account creation
   - Send reminder notifications before trial expiry

5. **Receipt Validation**:
   - iOS: Server-to-server receipt validation with Apple
   - Android: Verify purchases with Google Play Developer API

6. **Subscription Management**:
   - Allow users to view subscription status
   - Allow users to check Google Play/App Store + Account for existing subscription status in-case the user switched devices
   - Provide links to manage subscription (redirects to App Store/Google Play)
   - Handle grace periods for failed payments

## 8. Future Enhancements

  - Keyword system
  - Social features
  - Web version with shared accounts
  - Family subscription plans
  - Wish lists and gift registries
  - Shopping cart synchronization
  