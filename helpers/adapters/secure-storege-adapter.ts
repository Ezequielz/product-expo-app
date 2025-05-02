
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export class SecureStorageAdapter {

    static async setItem(key: string, value: string): Promise<void> {
        try {
            await SecureStore.setItemAsync(key, value);
        } catch (error) {
            Alert.alert('Error', 'Failed to save data to secure storage.');
            console.error(`Error setting item in secure storage: ${error}`);
        }
    }


    static async getItem(key: string): Promise<string | null> {
        try {
            const value = await SecureStore.getItemAsync(key);
            return value;
        } catch (error) {
            Alert.alert('Error', 'Failed to retrieve data from secure storage.');
            console.error(`Error getting item from secure storage: ${error}`);
            return null;
        }
    }

    static async deleteItem(key: string): Promise<void> {
        try {
            await SecureStore.deleteItemAsync(key);
        } catch (error) {
            Alert.alert('Error', 'Failed to delete data from secure storage.');
            console.error(`Error removing item from secure storage: ${error}`);
        }
    }
}