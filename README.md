## Instructions to Run the Application

1. **Clone the Repository**

   ```bash
   git clone https://github.com/n13b9/react-native-expo-firebase-quiz-.git

2. Install Dependencies
   npm install

3. Set Up Firebase

   Go to the Firebase Console.
   Replace the contents of firebaseConfig.js with your Firebase configuration:

   ```javascript
   const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
        measurementId: "YOUR_ID",
      };
5. Start the Application
      ```javascript
      npm start
      npm run android
      npm run web
   This will start the Expo development server. You can then use the Expo Go app on your mobile device or an emulator to      run the application.
