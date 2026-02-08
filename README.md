# Capetech RSM - React Native Mobile Application

A professional React Native mobile application for managing a repair shop with POS functionality and ClickUp-inspired task tracking.

## Features

- **Authentication System**: JWT-based authentication with access and refresh tokens
- **Dashboard**: Real-time statistics and quick actions
- **Customer Management**: Full CRUD operations for customer data
- **Device Management**: Track devices linked to customers
- **Repair Ticket Management**: 
  - Create, view, and update repair tickets
  - Status tracking (Pending, In Progress, Waiting for Parts, Completed, Collected)
  - Priority levels (Low, Medium, High, Urgent)
  - Timeline view for ticket history
  - Kanban board view
- **POS System**: Invoice creation and payment processing
- **Settings**: User profile and app configuration

## Technology Stack

- **Framework**: React Native 0.72.6
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation v6
- **UI Library**: React Native Paper
- **Forms**: React Hook Form
- **API Client**: Axios with interceptors
- **Storage**: AsyncStorage
- **Date/Time**: date-fns

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v16 or higher
- **npm** or **yarn**
- **React Native CLI**: `npm install -g react-native-cli`
- **For Android**:
  - Android Studio
  - JDK 11 or higher
  - Android SDK
- **For iOS** (macOS only):
  - Xcode 12 or higher
  - CocoaPods: `sudo gem install cocoapods`

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Leeoasis/capetech-rsm.git
   cd capetech-rsm
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies** (macOS only):
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure your API endpoint:
   ```
   REACT_APP_API_URL=http://your-api-url.com/api/v1
   REACT_APP_ENV=development
   ```

## Running the Application

### Android

1. Start the Metro bundler:
   ```bash
   npm start
   ```

2. In a new terminal, run the Android app:
   ```bash
   npm run android
   ```

### iOS (macOS only)

1. Start the Metro bundler:
   ```bash
   npm start
   ```

2. In a new terminal, run the iOS app:
   ```bash
   npm run ios
   ```

## Project Structure

```
capetech-rsm/
├── src/
│   ├── api/              # API client and endpoint calls
│   ├── components/       # Reusable components
│   │   ├── common/      # Common UI components
│   │   ├── customers/   # Customer-specific components
│   │   ├── repairs/     # Repair-specific components
│   │   └── pos/         # POS-specific components
│   ├── navigation/      # Navigation configuration
│   ├── screens/         # Screen components
│   │   ├── auth/       # Authentication screens
│   │   ├── home/       # Dashboard
│   │   ├── customers/  # Customer management
│   │   ├── repairs/    # Repair management
│   │   ├── pos/        # POS screens
│   │   └── settings/   # Settings
│   ├── store/          # Redux store and slices
│   ├── theme/          # Theme configuration
│   ├── utils/          # Utility functions
│   ├── hooks/          # Custom React hooks
│   └── App.js          # Root component
├── android/            # Android native code
├── ios/                # iOS native code
└── package.json        # Dependencies
```

## API Integration

The app expects a REST API with the following endpoints:

### Authentication
- `POST /auth/login` - Login with email and password
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout
- `GET /auth/me` - Get current user

### Customers
- `GET /customers` - List customers (supports search, pagination)
- `POST /customers` - Create customer
- `GET /customers/:id` - Get customer details
- `PUT /customers/:id` - Update customer
- `DELETE /customers/:id` - Delete customer

### Devices
- `GET /devices` - List devices
- `POST /devices` - Create device
- `GET /devices/:id` - Get device details
- `PUT /devices/:id` - Update device

### Repair Tickets
- `GET /repair_tickets` - List repair tickets (supports filters)
- `POST /repair_tickets` - Create repair ticket
- `GET /repair_tickets/:id` - Get repair ticket details
- `PUT /repair_tickets/:id` - Update repair ticket
- `POST /repair_tickets/:id/update_status` - Update ticket status
- `GET /repair_tickets/:id/timeline` - Get ticket timeline
- `GET /repair_tickets/kanban` - Get Kanban board data

### Payments
- `POST /payments` - Create payment
- `GET /payments/:id` - Get payment details

### POS
- `POST /pos/create_invoice` - Create invoice
- `POST /pos/process_payment` - Process payment
- `GET /pos/receipt/:id` - Get receipt

## Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier

## Testing

Run tests with:
```bash
npm test
```

## Building for Production

### Android

1. Generate a release APK:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
   
   The APK will be generated at:
   `android/app/build/outputs/apk/release/app-release.apk`

2. For signed APK, configure signing in `android/app/build.gradle`

### iOS

1. Open the project in Xcode:
   ```bash
   open ios/CapetechRSM.xcworkspace
   ```

2. Select your target device
3. Product > Archive
4. Follow the App Store submission process

## Troubleshooting

### Common Issues

**Metro bundler not starting**:
```bash
npm start -- --reset-cache
```

**Android build fails**:
```bash
cd android
./gradlew clean
cd ..
npm run android
```

**iOS build fails**:
```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

**Module not found errors**:
```bash
rm -rf node_modules
npm install
```

## Color Coding

### Status Colors
- **Pending**: Gray (#9E9E9E)
- **In Progress**: Blue (#2196F3)
- **Waiting for Parts**: Orange (#FF9800)
- **Completed**: Green (#4CAF50)
- **Collected**: Dark Green (#388E3C)
- **Cancelled**: Red (#F44336)

### Priority Colors
- **Low**: Gray (#9E9E9E)
- **Medium**: Yellow (#FDD835)
- **High**: Orange (#FF9800)
- **Urgent**: Red (#F44336)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is proprietary software for Capetech.

## Support

For support, contact the development team or open an issue in the repository.

## Future Enhancements

- Push notifications for status updates
- Barcode/QR code scanning for devices
- Camera integration for device photos
- Dark mode support
- Multi-language support
- Offline mode with sync
- Analytics integration
- Print receipt functionality
- Advanced reporting and analytics
- Inventory management
- Parts ordering system