# Replit setup

This repository is a React Native app. Replit runs the Metro JavaScript bundler; the native Android or iOS app must be built and launched on a device, emulator, or simulator.

## Run Metro

```bash
npm start -- --host 0.0.0.0 --port 8081
```

The configured **Metro bundler** workflow runs this command automatically on port 8081.

## Device development

For a USB-connected Android device, use the device's Metro/debug-server settings to point at the Replit development host on port 8081. For a local emulator, use the normal React Native Android command and the matching Metro host.

## Checks

```bash
npm test -- --runInBand
npm run lint
npx react-native bundle --platform android --dev true --entry-file index.js --bundle-output /tmp/anyrenting.android.bundle --assets-dest /tmp/anyrenting-assets
```