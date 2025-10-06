# In Progress – Träningsapp

En träningsapp byggd med **React Native**, **Expo** och **TypeScript**.  
Appen gör det enkelt att logga träningspass utan krångel, se historik och statistik över sin träning – helt gratis och utan abonnemang.  

## ✨ Funktioner
- Registrering och inloggning (lagras lokalt med **SecureStore** och **AsyncStorage**)  
- Logga träningspass (Gym och Löpning)  
  - Gym: välj muskelgrupp, övning, sets/reps, flera övningar per pass  
  - Löpning: välj typ (gång, jogg, intervaller), tid och distans  
- Träningshistorik – visar alla loggade pass med detaljer  
- Träningsstatistik – antal pass per månad, vecka och år samt fördelning av träningsformer (visualiseras med diagram)  
- Profil – visar inloggad användare och logga ut-funktion  

## 🛠️ Komponenter som används

### React Native-komponenter
- **View, Text, Button, TextInput** – för UI och formulär  
- **FlatList** – för att visa listor av träningspass  
- **ScrollView** – för att göra formulär och sidor scrollbara  
- **Alert** – för bekräftelser (t.ex. ta bort pass)  
- **SafeAreaView** – för att layouten inte ska krocka med statusfält  

### Expo SDK-komponenter
- **expo-secure-store** – för att lagra användarens login säkert  
- **@react-native-async-storage/async-storage** – för att spara träningspass lokalt  
- **expo-status-bar** – för statusfältets design  
- **@expo/vector-icons (Ionicons)** – för snygga ikoner i navigationen  
- **@react-native-community/datetimepicker** – för datumval vid loggning av pass  

### Navigation
- **React Navigation** – för att hantera navigering mellan skärmar  
  - AuthStack (Login & Register)  
  - AppStack (Home, LogWorkout, WorkoutHistory, Profile, Stats)  
  - TabNavigation för ikoner längst ner  

### Så här kör du projektet

1. Kör npm install i terminalen
2. npx expo start i terminalen. 

### Uppfyllda krav
Nr	Krav	Status
[x]	Projektet använder minst 4 React Native-komponenter.
[x]	Projektet använder minst 4 Expo SDK-komponenter.
[x]	React Navigation används för navigering.
[x]	Git & GitHub har använts under utvecklingen.
[x]	Projektmappen innehåller en README.md med beskrivning och instruktioner.
[x]	Uppgiften lämnas in i tid.
[x]	Muntlig presentation genomförd.


