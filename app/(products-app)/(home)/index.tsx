import { ThemedText } from '@/presentation/theme/components/ThemedText'
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor'
import { View } from 'react-native'


const HomeScreen = () => {

  const primary = useThemeColor({}, 'primary')


  return (
    <View style={{  paddingTop: 100 , paddingHorizontal: 20 }}>
      <ThemedText style={{ fontFamily: 'kanitRegular', color: primary}}>HomeScreen</ThemedText>
      <ThemedText style={{ fontFamily: 'kanitBold' }}>HomeScreen</ThemedText>
      <ThemedText style={{ fontFamily: 'kanitThin' }}>HomeScreen</ThemedText>
    </View>
  )
}

export default HomeScreen