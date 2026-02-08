# Capetech RSM - Quick Start Guide

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env and set your API URL
```

### 3. Run the App

**Android**:
```bash
npm run android
```

**iOS** (macOS only):
```bash
cd ios && pod install && cd ..
npm run ios
```

## Application Structure

```
┌─────────────────────────────────────────────────────────┐
│                   Capetech RSM App                      │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │   App Navigator       │
              │  (Auth Switching)     │
              └───────────────────────┘
                     │        │
          ┌──────────┘        └──────────┐
          ▼                               ▼
   ┌─────────────┐              ┌──────────────────┐
   │   Auth      │              │  Main Navigator  │
   │ Navigator   │              │  (Bottom Tabs)   │
   └─────────────┘              └──────────────────┘
          │                               │
          ▼                               ▼
   ┌─────────────┐         ┌──────────────────────────────┐
   │   Login     │         │  ┌──────┬──────┬──────────┐  │
   │   Screen    │         │  │ Home │Cust. │ Repairs  │  │
   └─────────────┘         │  └──────┴──────┴──────────┘  │
                           │  ┌──────┬──────────────────┐ │
                           │  │ POS  │   Settings       │ │
                           │  └──────┴──────────────────┘ │
                           └──────────────────────────────┘
```

## Key Features

### 🔐 Authentication
- JWT-based login
- Auto-refresh tokens
- Persistent sessions

### 👥 Customer Management
- Create, edit, delete customers
- Search and filter
- View customer details

### 🔧 Repair Tickets
- List all repairs
- View detailed ticket info
- Update status
- Timeline view
- Kanban board (basic)

### 🏪 Dashboard
- Statistics overview
- Quick actions
- Pull-to-refresh

### ⚙️ Settings
- User profile
- Logout

## Tech Stack

| Technology | Version |
|-----------|---------|
| React Native | 0.72.6 |
| Redux Toolkit | 1.9.7 |
| React Navigation | 6.x |
| Axios | 1.6.2 |
| React Native Paper | 5.11.3 |

## Available Commands

```bash
# Development
npm start              # Start Metro bundler
npm run android        # Run on Android
npm run ios           # Run on iOS

# Code Quality
npm run lint          # Lint code
npm run format        # Format code
npm test              # Run tests

# Production
cd android && ./gradlew assembleRelease  # Build Android APK
```

## API Endpoints Expected

The app expects a REST API with these endpoints:

- `POST /auth/login` - Authentication
- `POST /auth/refresh` - Token refresh
- `GET /customers` - List customers
- `POST /customers` - Create customer
- `GET /repair_tickets` - List repairs
- `POST /repair_tickets/:id/update_status` - Update status

See `README.md` for complete API documentation.

## Project Files Overview

```
Configuration Files (9):
├── package.json          # Dependencies
├── babel.config.js       # Babel config
├── metro.config.js       # Metro bundler
├── jest.config.js        # Testing config
├── .eslintrc.js         # Linting rules
├── .prettierrc          # Code formatting
├── app.json             # RN app config
├── .env.example         # Environment template
└── .gitignore          # Git ignore rules

Source Code (65+ files):
├── src/
│   ├── api/ (7)         # API integration
│   ├── components/ (11) # Reusable UI
│   ├── hooks/ (3)       # Custom hooks
│   ├── navigation/ (3)  # Navigation
│   ├── screens/ (13)    # Screen components
│   ├── store/ (7)       # Redux state
│   ├── theme/ (3)       # Design tokens
│   ├── utils/ (6)       # Utilities
│   └── App.js          # Root component

Documentation (3):
├── README.md            # Main documentation
├── SETUP.md            # Setup guide
└── IMPLEMENTATION.md   # Project summary
```

## Color Scheme

### Status Colors
- 🟦 **In Progress**: Blue (#2196F3)
- 🟧 **Waiting for Parts**: Orange (#FF9800)
- 🟩 **Completed**: Green (#4CAF50)
- 🟩 **Collected**: Dark Green (#388E3C)
- ⬜ **Pending**: Gray (#9E9E9E)
- 🟥 **Cancelled**: Red (#F44336)

### Priority Colors
- ⬜ **Low**: Gray
- 🟨 **Medium**: Yellow
- 🟧 **High**: Orange
- 🟥 **Urgent**: Red

## Common Issues & Solutions

**Metro bundler not starting:**
```bash
npm start -- --reset-cache
```

**Build failures:**
```bash
rm -rf node_modules
npm install
```

**Android issues:**
```bash
cd android && ./gradlew clean && cd ..
npm run android
```

**iOS issues:**
```bash
cd ios && pod install && cd ..
npm run ios
```

## Next Steps

1. ✅ App structure is complete
2. ⏭️ Connect to backend API
3. ⏭️ Test all user flows
4. ⏭️ Implement remaining features
5. ⏭️ Deploy to app stores

## Support

For issues or questions:
- Check `README.md` for detailed docs
- Check `SETUP.md` for setup help
- Check `IMPLEMENTATION.md` for project overview
- Create an issue in the repository

---

**Ready to start developing!** 🚀
