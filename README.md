# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## NativeWind (Tailwind for React Native) — packages & setup I used

Packages installed
```bash
npm install nativewind tailwindcss postcss autoprefixer
```

Babel config
- Add the NativeWind babel plugin to babel.config.js:
```js
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: ['nativewind/babel'],
};
```

Tailwind config
- Create tailwind.config.js at the project root and include the NativeWind preset and content globs. Example (this repo's config):
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./**/*.mdx",
  ],
  presets: [require("nativewind/preset")],
  theme: { extend: {} },
  plugins: [],
};
```

Global CSS
- Create app/global.css and include the Tailwind directives:
```css
/* app/global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```
- Import that file from your entry (you already import it in app/index.tsx):
```ts
import "../global.css";
```

Building / CLI notes
- If you run the Tailwind CLI directly, point it at the actual file path (app/global.css). For example:
```bash
npx tailwindcss -i ./app/global.css -o app/output.css --watch
```
- The warning "No utility classes were detected..." usually means the `content` globs don't match or the CLI is pointed at the wrong working dir. Ensure tailwind.config.js is at the repo root and run the CLI from the project root (or pass --config).

Final checks
- Restart the Metro bundler / dev server after making config changes.
- Confirm files with className strings exist under the paths listed in `content` (e.g. app/index.tsx).

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
