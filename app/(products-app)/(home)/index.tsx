
import { ActivityIndicator, View } from 'react-native'
import { useProducts } from '@/presentation/products/hooks/useProducts'
import ProductList from '@/presentation/products/components/ProductList'
import { FAB } from '@/presentation/theme/components/FAB';
import { router } from 'expo-router';



const HomeScreen = () => {

  const { loadNextPage, productsQuery } = useProducts();

  if (productsQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={30} />
      </View>
    )
  }


  return (
    <View style={{ paddingHorizontal: 20 }}>
      <ProductList
        products={productsQuery.data?.pages.flatMap(page => page) ?? []}
        loadNextPage={loadNextPage}
      />
      <FAB 
        iconName='add-outline'
        onPress={() => router.push('/(products-app)/product/new')}
      />
    </View>
  )
}

export default HomeScreen