# Detailed Setup Guide for Capetech RSM

This guide provides step-by-step instructions for setting up the Capetech RSM React Native application for development.

## Table of Contents

1. [Development Environment Setup](#development-environment-setup)
2. [Android Setup](#android-setup)
3. [iOS Setup](#ios-setup)
4. [Running on Physical Devices](#running-on-physical-devices)
5. [Debugging](#debugging)
6. [Common Issues](#common-issues)

## Development Environment Setup

### Node.js and npm

1. Install Node.js (v16 or higher) from [nodejs.org](https://nodejs.org/)
2. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### React Native CLI

Install React Native CLI globally:
```bash
npm install -g react-native-cli
```

### Project Dependencies

Clone and install dependencies:
```bash
git clone https://github.com/Leeoasis/capetech-rsm.git
cd capetech-rsm
npm install
```

## Android Setup

### Prerequisites

1. **Install Java Development Kit (JDK)**
   - Download and install JDK 11 or higher
   - Set `JAVA_HOME` environment variable

2. **Install Android Studio**
   - Download from [developer.android.com](https://developer.android.com/studio)
   - During installation, ensure the following are checked:
     - Android SDK
     - Android SDK Platform
     - Android Virtual Device

3. **Configure Android SDK**
   - Open Android Studio
   - Go to Preferences → Appearance & Behavior → System Settings → Android SDK
   - Install the following:
     - Android 12.0 (S) or higher
     - Android SDK Build-Tools
     - Android Emulator
     - Android SDK Platform-Tools

4. **Set Environment Variables**
   
   Add to your `~/.bash_profile` or `~/.zshrc`:
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

   Then reload:
   ```bash
   source ~/.bash_profile  # or ~/.zshrc
   ```

### Running on Android

1. **Start an Android Emulator**
   - Open Android Studio
   - AVD Manager → Create Virtual Device
   - Select a device and system image
   - Start the emulator

2. **Run the App**
   ```bash
   npm run android
   ```

### Building Android APK

```bash
cd android
./gradlew assembleRelease
cd ..
```

The APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

## iOS Setup (macOS Only)

### Prerequisites

1. **Install Xcode**
   - Download from Mac App Store
   - Install Xcode Command Line Tools:
     ```bash
     xcode-select --install
     ```

2. **Install CocoaPods**
   ```bash
   sudo gem install cocoapods
   ```

3. **Install iOS Dependencies**
   ```bash
   cd ios
   pod install
   cd ..
   ```

### Running on iOS

1. **Start iOS Simulator**
   ```bash
   npm run ios
   ```

2. **Or specify a device**
   ```bash
   npm run ios -- --simulator="iPhone 14 Pro"
   ```

### Building for iOS

1. Open in Xcode:
   ```bash
   open ios/CapetechRSM.xcworkspace
   ```

2. Select your signing team
3. Product → Archive
4. Follow distribution steps

## Running on Physical Devices

### Android

1. **Enable Developer Options**
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
   - Go back to Settings → Developer Options
   - Enable "USB Debugging"

2. **Connect Device**
   - Connect via USB
   - Accept debugging prompt on device
   - Verify connection:
     ```bash
     adb devices
     ```

3. **Run App**
   ```bash
   npm run android
   ```

### iOS

1. **Configure Signing**
   - Open `ios/CapetechRSM.xcworkspace` in Xcode
   - Select your target
   - Signing & Capabilities → Select your team

2. **Trust Developer**
   - On device: Settings → General → VPN & Device Management
   - Trust your developer certificate

3. **Run App**
   - Select your device in Xcode
   - Product → Run (or ⌘R)

## Debugging

### React Native Debugger

1. Install React Native Debugger:
   ```bash
   brew install --cask react-native-debugger
   ```

2. In app, shake device or press:
   - iOS: ⌘D
   - Android: ⌘M (on Mac) or Ctrl+M (on Windows/Linux)

3. Select "Debug"

### Chrome DevTools

1. Shake device and select "Debug"
2. Open Chrome and go to `chrome://inspect`
3. Click "inspect" under your app

### Flipper

1. Install Flipper from [fbflipper.com](https://fbflipper.com/)
2. It should auto-detect your app
3. Use for network inspection, Redux state, and more

### Logging

```javascript
import { LogBox } from 'react-native';

// Ignore specific warnings
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all warnings (not recommended)
LogBox.ignoreAllLogs();
```

## Common Issues

### Metro Bundler Issues

**Issue**: Metro bundler crashes or won't start

**Solution**:
```bash
npm start -- --reset-cache
```

### Build Failures

**Android**:
```bash
cd android
./gradlew clean
cd ..
rm -rf node_modules
npm install
npm run android
```

**iOS**:
```bash
cd ios
rm -rf Pods
pod deintegrate
pod install
cd ..
rm -rf node_modules
npm install
npm run ios
```

### Module Not Found

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Gradle Issues

```bash
cd android
./gradlew clean
./gradlew assembleDebug --stacktrace
```

### Pod Installation Issues

```bash
cd ios
pod cache clean --all
pod deintegrate
pod setup
pod install
cd ..
```

### Red Screen Errors

1. Read the error message carefully
2. Check the stack trace
3. Common fixes:
   - Clear cache and restart
   - Reinstall dependencies
   - Check for syntax errors
   - Verify API responses

### Performance Issues

1. Enable Hermes (already configured in this project)
2. Use React DevTools Profiler
3. Optimize images
4. Use `React.memo` for expensive components
5. Avoid unnecessary re-renders

## Environment Variables

Create `.env` file:
```bash
REACT_APP_API_URL=http://your-backend-url.com/api/v1
REACT_APP_ENV=development
```

For different environments:
- `.env.development`
- `.env.staging`
- `.env.production`

## Code Quality

### Linting

```bash
npm run lint
```

Fix automatically:
```bash
npm run lint -- --fix
```

### Formatting

```bash
npm run format
```

### Type Checking (if using TypeScript)

```bash
npm run type-check
```

## Additional Tools

### VS Code Extensions

Recommended extensions:
- React Native Tools
- ESLint
- Prettier
- React-Native/React/Redux snippets

### Testing

Run tests:
```bash
npm test
```

Watch mode:
```bash
npm test -- --watch
```

Coverage:
```bash
npm test -- --coverage
```

## Getting Help

If you encounter issues not covered here:
1. Check the React Native documentation
2. Search GitHub issues
3. Ask the development team
4. Create a detailed issue with:
   - Error message
   - Steps to reproduce
   - Environment details
   - Screenshots if applicable
