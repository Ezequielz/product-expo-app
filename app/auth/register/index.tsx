import { useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, useWindowDimensions, View } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/presentation/theme/components/ThemedText'
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import ThemedButton from '@/presentation/theme/components/ThemedButton';
import ThemedLink from '@/presentation/theme/components/ThemedLink';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';


const RegisterScreen = () => {

  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, 'background');
  const [isPosting, setIsPosting] = useState(false)
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    password: '',
  });


  const { register } = useAuthStore();

  const onSubmit = async () => {

    const { fullname, email, password } = form;


    if (email.length === 0 || password.length === 0 || fullname.length === 0 ) return;

    setIsPosting(true);
    const wasSuccesfull = await register(fullname, email, password);

    setIsPosting(false);
    if (wasSuccesfull) {
      router.replace('/')
      return;
    }

    Alert.alert('Error', 'Invalid credentials')

  }


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

          <ThemedText type='title' >Crear cuenta</ThemedText>
          <ThemedText style={{ color: 'grey' }} >
            Por favor crea una cuenta para continuar
          </ThemedText>

        </View>

        {/* Email y Password */}
        <View
          style={{
            marginTop: 20,
          }}
        >
          <ThemedTextInput
            placeholder='Nombre completo'
            // keyboardType='email-address'
            autoCapitalize='words'
            icon='person-outline'
            onChangeText={(value) => setForm({ ...form, fullname: value })}
            value={form.fullname}
          />
          <ThemedTextInput
            placeholder='Correo electrónico'
            keyboardType='email-address'
            autoCapitalize='none'
            icon='mail-outline'
            onChangeText={(value) => setForm({ ...form, email: value })}
            value={form.email}
          />
          <ThemedTextInput
            placeholder='Contraseña'
            secureTextEntry={true}
            autoCapitalize='none'
            icon='lock-closed-outline'
            onChangeText={(value) => setForm({ ...form, password: value })}
            value={form.password}
          />

        </View>

        {/* Spacer */}
        <View style={{ marginTop: 10 }} />

        {/* Boton */}
        <ThemedButton
          icon='arrow-forward-outline'
          onPress={onSubmit}
          disabled={isPosting}
        >
          Crear cuenta
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
            ¿Yo tienes cuenta?
          </ThemedText>
          <ThemedLink href="/auth/login" style={{ marginHorizontal: 5 }}>
            Ingresar
          </ThemedLink>
        </View>



      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen