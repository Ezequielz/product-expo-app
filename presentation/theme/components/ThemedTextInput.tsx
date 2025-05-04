import { Ionicons } from '@expo/vector-icons'
import { TextInputProps, StyleSheet, TextInput, StyleProp, ViewStyle } from 'react-native'
import { useThemeColor } from '../hooks/useThemeColor';
import { useRef, useState } from 'react';
import { ThemedView } from './ThemedView';

interface Props extends TextInputProps {
    icon?: keyof typeof Ionicons.glyphMap;
    containerStyle?: StyleProp<ViewStyle>
}

const ThemedTextInput = ({ icon, containerStyle, ...rest }: Props) => {

    const [isActive, setIsActive] = useState(false);
    const inputRef = useRef<TextInput>(null)

    const primaryColor = useThemeColor({}, 'primary');
    const textColor = useThemeColor({}, 'text');


    return (
        <ThemedView
            style={[
                styles.border,
                { borderColor: isActive ? primaryColor : '#ccc', backgroundColor: 'white' },
                containerStyle, // <- ahora pasás style propio del View si querés
            ]}
            onTouchStart={() => inputRef.current?.focus()}

        >
            {icon && (
                <Ionicons
                    name={icon}
                    size={24}
                    color={textColor}
                    style={{ marginRight: 10 }}

                />
            )}
            <TextInput
                ref={inputRef}
                placeholderTextColor="5c5c5c"
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}
                style={{
                    color: textColor,
                    marginRight: 10,
                    flex: 1,
                }}
                {...rest}
            />
        </ThemedView>
    )
}

export default ThemedTextInput



const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 2,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    }
})