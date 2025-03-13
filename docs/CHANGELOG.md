# Shopai Changelog

All notable changes to the Shopai project will be documented in this file, **BOTTOM TO TOP**.

## [1.0.3] - Expo Doctor Configuration

### Added
- Added `expo.doctor.reactNativeDirectoryCheck` configuration in package.json to exclude specific packages from React Native Directory compatibility checks
- Added `expo-in-app-purchases` to the excluded packages list
- Set `listUnknownPackages` to false to suppress warnings about packages with no metadata
- Enabled New Architecture with `newArchEnabled: true` in package.json

## [1.0.2] - Icon Package Replacement

### Changed
- Replaced `lucide-react-native` with `react-native-heroicons` throughout the project
- Updated icon imports in `lib/icons/MoonStar.tsx`, `lib/icons/Sun.tsx`, and `lib/icons/Info.tsx`
- Modified `lib/icons/iconWithClassName.ts` to work with react-native-heroicons
- Updated package.json to remove lucide-react-native dependency

## [1.0.1] - Tech Stack Update

### Updated
- Updated `docs/CONTEXT.md` Tech Stack section to include all currently installed packages from package.json
- Marked packages as "installed" or "planned" to clarify current project state
- Added descriptions for each package to explain its purpose
- Identified alternative packages where applicable (e.g., lucide-react-native as an alternative to @heroicons/react)
- Created the app with react-native-reusables, expo-router and nativewind.

## [1.0.0] - Initial Documentation

### Added
- Created `docs/CHANGELOG.md` with all the changes
- Created `docs/CONTEXT.md` with the context of the whole project and ticked off completed tasks
- Created initial project documentation structure in `docs/` directory