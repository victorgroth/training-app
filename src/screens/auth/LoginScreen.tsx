import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Logga in</Text>
            <Button title="Gå till Registrering" onPress={() => navigation.navigate('Register')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold' },
});