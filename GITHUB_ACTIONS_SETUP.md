# GitHub Actions APK Build Setup

## Project Configuration Summary

### Build Requirements (from existing project):
- **React Native:** 0.87.1
- **React:** 19.2.3
- **Node.js:** >= 22.11.0
- **JDK:** 17
- **Gradle:** 9.4.1 (via Gradle wrapper)
- **Kotlin:** 2.2.0
- **Android SDK:**
  - compileSdk: 37
  - targetSdk: 36
  - minSdk: 24
  - buildTools: 37.0.0
  - NDK: 27.1.12297006

### Application Details:
- **Package Name:** com.anyrentingapp
- **Application ID:** com.anyrentingapp
- **Namespace:** com.anyrentingapp
- **Signing:** Uses debug keystore for both debug and release (unsigned for testing)

## Files Created/Modified

### Created:
1. `.github/workflows/build-apk.yml` - GitHub Actions workflow for automated APK building

### Modified:
1. `.gitignore` - Added proper exclusions for React Native, environment files, secrets, and APK files
2. `android/build.gradle` - Removed Aliyun repositories (for GitHub Actions compatibility)

## GitHub Actions Workflow

The workflow (`.github/workflows/build-apk.yml`) will:
1. Trigger on push to main branch, pull requests, or manual execution
2. Use Node.js 22 with npm caching
3. Install dependencies using `npm ci`
4. Set up JDK 17 with Gradle caching
5. Build both debug and release APKs
6. Upload both APKs as artifacts (30-day retention)

## GitHub Secrets/Variables Required

**None required** for current configuration because:
- The app uses the default debug keystore
- No environment variables are referenced in the code
- No API keys or secrets are hardcoded
- Release APK is unsigned (for testing)

## Future: Production Signing (Optional)

For production releases with proper signing, you would need to add these GitHub Secrets:

1. `KEYSTORE_FILE` - Base64 encoded keystore file
2. `KEYSTORE_PASSWORD` - Keystore password
3. `KEY_ALIAS` - Key alias
4. `KEY_PASSWORD` - Key password

Then modify the workflow to decode and use these secrets.

## APK Download Location

After the workflow runs successfully, download the APK from:

**GitHub → Repository → Actions → Build Android APK → Workflow Run → Artifacts**

Two artifacts will be available:
- `app-debug-apk` - Debug APK for testing
- `app-release-apk` - Release APK (unsigned, for testing)

## Next Steps

1. **Stage and commit changes:**
   ```bash
   git add .github/workflows/build-apk.yml
   git add .gitignore
   git add android/build.gradle
   git commit -m "Add GitHub Actions workflow for automated APK building"
   ```

2. **Push to GitHub:**
   ```bash
   git push origin main
   ```

3. **Trigger workflow:**
   - The workflow will automatically trigger on push
   - Or manually trigger from GitHub Actions tab

4. **Download APK:**
   - Go to Actions tab
   - Click on the workflow run
   - Download the APK artifact

## Notes

- The existing app functionality remains unchanged
- No UI, navigation, or logic modifications
- Only build infrastructure was added
- The workflow uses the project's existing Gradle wrapper
- APK output path follows standard React Native CLI structure
