---
name: Metro welcome banner
description: React Native Metro startup logs include a Welcome to React Native banner that is unrelated to the rendered app screen.
---

The phrase “Welcome to React Native” in Metro workflow logs is the bundler’s startup banner, not evidence that the default template screen is rendering. Verify the actual app by inspecting the live bundle labels or loading it on a native device/emulator.

**Why:** This project’s actual AnyRenting entry rendered the dashboard bundle while the workflow log still showed the generic Metro welcome banner.

**How to apply:** Do not remove or edit the Metro banner; check the registered AppRegistry entry and bundle contents when diagnosing a default-screen report.