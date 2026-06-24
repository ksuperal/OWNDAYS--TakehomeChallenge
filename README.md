# OD-Connect HR Forms & Requests Portal

A mobile-first Progressive Web App (PWA) for HR self-service, built with React and Vite.

## Features

- **Progressive Web App (PWA)**: Install on any device, works offline
- **Bilingual Support**: Seamless switching between English and Thai
- **Mobile-First Design**: iOS-style device frame with responsive mobile UI
- **Home Screen**: Quick access to leave requests, documents, and recent requests
- **Category Browsing**: Browse forms by category (Leave, Payroll, Documents, Benefits, Expense, Other)
- **Navigation**: Bottom navigation bar with Home, Requests, and Profile tabs
- **Real-time Badge**: Pending requests counter on navigation
- **Beautiful UI**: IBM Plex font family, smooth animations, modern card-based design
- **Offline Support**: Service worker caches assets for offline access

## Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **PWA**: vite-plugin-pwa with Workbox
- **CSS**: Custom styles with animations
- **Google Fonts**: IBM Plex Sans (Thai & English) and IBM Plex Mono
- **Service Worker**: Auto-updates, offline caching

## Project Structure

```
hr-portal/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── DeviceFrame.jsx
│   │   ├── AppBar.jsx
│   │   └── BottomNav.jsx
│   ├── screens/          # Screen components
│   │   └── HomeScreen.jsx
│   ├── hooks/            # Custom React hooks
│   │   └── useAppState.js
│   ├── data/             # Static data and configurations
│   │   ├── forms.js
│   │   ├── translations.js
│   │   └── initialRequests.js
│   ├── utils/            # Utility functions
│   │   ├── dateHelpers.js
│   │   └── statusHelpers.js
│   ├── App.jsx           # Main app component
│   ├── App.css           # Global styles
│   └── main.jsx          # Entry point
└── index.html            # HTML template
```

## Getting Started

### Installation

```bash
cd hr-portal
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or next available port)

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Key Components

### DeviceFrame
Mobile device mockup with iOS-style status bar and frame

### AppBar
Top navigation bar with:
- Back button (contextual)
- App logo and title
- Language toggle (EN/TH)

### BottomNav
Bottom navigation with:
- Home
- Requests (with pending count badge)
- Profile

### HomeScreen
Main dashboard featuring:
- Personalized greeting
- Primary action buttons (Request leave, Get document)
- Recent requests list
- Category shortcuts

## State Management

The app uses a custom `useAppState` hook for centralized state management:
- Language preference
- Current screen/navigation
- Form data
- User requests
- UI preferences

## Styling

- Mobile-first responsive design
- Device frame: 384×824px
- Primary color: #1f6feb (blue)
- Font: IBM Plex Sans Thai/Sans
- Smooth animations with CSS keyframes

## Progressive Web App (PWA)

### Features
- **Installable**: Add to home screen on mobile and desktop
- **Offline Support**: Service worker caches assets for offline access
- **Auto-updates**: Automatically updates when new version is deployed
- **App-like Experience**: Runs in standalone mode without browser chrome
- **Fast Loading**: Pre-caches critical assets

### Installation

**On Mobile (iOS/Android):**
1. Open the app in your mobile browser
2. Tap the share/menu button
3. Select "Add to Home Screen"
4. The app will install and appear on your home screen

**On Desktop (Chrome/Edge):**
1. Click the install icon in the address bar
2. Or go to Menu → Install OD-Connect
3. The app will open in its own window

### Manifest Configuration
- **Name**: OD-Connect HR Portal
- **Theme Color**: #1f6feb (blue)
- **Display**: Standalone
- **Orientation**: Portrait
- **Icons**: 64x64, 192x192, 512x512 (standard + maskable)

### Caching Strategy
- **Static Assets**: Precached at install time
- **Google Fonts**: Cached for 1 year
- **Runtime Caching**: Network-first for API calls

## Future Enhancements

The app currently includes:
- ✅ Home screen with navigation
- ✅ Bilingual support (EN/TH)
- ✅ Device mockup
- ✅ Progressive Web App (installable, offline support)
- ✅ Service Worker with auto-updates
- ✅ PWA icons and manifest
- ⏳ Category screen (placeholder)
- ⏳ Multi-step leave request form
- ⏳ Requests list with filtering
- ⏳ Request detail view
- ⏳ Profile screen with preferences
- ⏳ Calendar date picker
- ⏳ File upload functionality
- ⏳ Form validation
- ⏳ Push notifications

## Original Design

This project is a React implementation of the original Claude Design prototype, maintaining the same visual design, interactions, and user experience while converting from a single HTML file to a modular React application.


