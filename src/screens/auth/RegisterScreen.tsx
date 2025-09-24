import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrera dig</Text>
            <Button title="Tillbaka till Login" onPress={() => navigation.navigate('Login')} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});