import { KeyboardAvoidingView, ScrollView, useWindowDimensions, View } from 'react-native'
import { ThemedText } from '@/presentation/theme/components/ThemedText'
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import ThemedButton from '@/presentation/theme/components/ThemedButton';
import ThemedLink from '@/presentation/theme/components/ThemedLink';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';


const LoginScreen = () => {

  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, 'background');

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ 
          paddingHorizontal: 40,
          backgroundColor: backgroundColor,
         }}
      >

        <View
          style={{
            paddingTop: height * 0.35,
          }}
        >

          <ThemedText type='title' >Ingresar</ThemedText>
          <ThemedText style={{ color: 'grey' }} >
            Por favor ingrese para continuar
          </ThemedText>

        </View>

        {/* Email y Password */}
        <View
          style={{
            marginTop: 20,
          }}
        >
          <ThemedTextInput
            placeholder='Correo electrónico'
            keyboardType='email-address'
            autoCapitalize='none'
            icon='mail-outline'
          // value=''
          />
          <ThemedTextInput
            placeholder='Contraseña'
            secureTextEntry={true}
            autoCapitalize='none'
            icon='lock-closed-outline'
          // value=''
          />

        </View>

        {/* Spacer */}
        <View style={{ marginTop: 10 }} />

        {/* Boton */}
        <ThemedButton
          icon='arrow-forward-outline'
        >
          Ingresar
        </ThemedButton>

        {/* Spacer */}
        <View style={{ marginTop: 50 }} />

        {/* Enlace a registro */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <ThemedText >
            ¿No tienes cuenta?
          </ThemedText>
          <ThemedLink href="/auth/register" style={{ marginHorizontal: 5 }}>
            Crear cuenta
          </ThemedLink>
        </View>



      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen