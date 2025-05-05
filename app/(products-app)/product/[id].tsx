import { useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, View, ActivityIndicator, RefreshControl } from 'react-native';
import { Redirect, router, useLocalSearchParams, useNavigation } from 'expo-router';
import { Formik } from 'formik';

import { useProduct } from '@/presentation/products/hooks/useProduct';

import { ThemedView } from '@/presentation/theme/components/ThemedView';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import ProductImages from '@/presentation/products/components/ProductImages';
import ThemedButtonGroup from '@/presentation/theme/components/ThemedButtonGroup';
import ThemedButton from '@/presentation/theme/components/ThemedButton';
import MenuIconButton from '@/presentation/theme/components/MenuIconButton';
import { type Size } from '@/core/products/interface/product.interface';
import { useCameraStore } from '@/presentation/store/useCameraStore';


const ProductScreen = () => {

  const { selectedImages, clearImages } = useCameraStore();

  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { productQuery, productMutation } = useProduct(`${id}`);


  useEffect(() => {
    return () => {
      clearImages()
    }
  }, [])
  

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MenuIconButton 
          icon='camera-outline'
          onPress={() => router.push('/camera')}
        />

      )
    })
  }, [])

  useEffect(() => {
    if (productQuery.data) {
      navigation.setOptions({
        title: productQuery.data.title,
      })
    }
  }, [productQuery.data])

  if (productQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={30} />
      </View>
    )
  }

  if (!productQuery.data) {
    return (
      <Redirect href={'/(products-app)/(home)'} />
    )
  }

  const product = productQuery.data!;

  return (

    <Formik
      initialValues={product}
      onSubmit={(productLike) => productMutation.mutate({
        ...productLike,
        images: [
          ...productLike.images,
          ...selectedImages
        ]
      })}
    >
      {
        ({ values, handleSubmit, handleChange, setFieldValue }) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <ScrollView
              refreshControl={
                <RefreshControl 
                    refreshing={ productQuery.isFetching }
                    onRefresh={ async() => {
                      await productQuery.refetch()
                    }} 
                />
              }
            
            >
              {/* product images */}
              <ProductImages
                images={[ ...product.images, ...selectedImages ]}
              />

              <ThemedView style={{ marginHorizontal: 20, marginTop: 20 }}>

                <ThemedTextInput
                  placeholder='Título'
                  style={{ marginVertical: 5, }}
                  value={values.title}
                  onChangeText={handleChange('title')}
                />

                <ThemedTextInput
                  placeholder='Slug'
                  style={{ marginVertical: 5, }}
                  value={values.slug}
                  onChangeText={handleChange('slug')}
                />

                <ThemedTextInput
                  placeholder='Descripción'
                  multiline
                  numberOfLines={5}
                  style={{ marginVertical: 5, }}
                  value={values.description}
                  onChangeText={handleChange('description')}
                />

              </ThemedView>


              <ThemedView
                style={{
                  marginHorizontal: 20,
                  marginTop: 10,
                  flexDirection: 'row',
                  gap: 10,
                }}
              >

                <ThemedTextInput
                  placeholder='Precio'
                  containerStyle={{ flex: 1 }}
                  value={values.price.toString()}
                  onChangeText={handleChange('price')}

                />

                <ThemedTextInput
                  placeholder='Inventario'
                  containerStyle={{ flex: 1 }}
                  value={values.stock.toString()}
                  onChangeText={handleChange('stock')}
                />

              </ThemedView>


              <ThemedView style={{ marginHorizontal: 20, marginTop: 10 }}>
                <ThemedButtonGroup
                  options={['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']}
                  selectedOptions={values.sizes}
                  onSelect={(selectedSize) => {

                    const sizesValues = values.sizes.includes(selectedSize as Size)
                      ? values.sizes.filter(size => size !== selectedSize)
                      : [...values.sizes, selectedSize]

                    setFieldValue('sizes', sizesValues);
                  }}
                />

                <ThemedButtonGroup
                  options={['men', 'women', 'kid', 'unisex']}
                  selectedOptions={[values.gender]}
                  onSelect={(selectedOption) => setFieldValue('gender', selectedOption)}
                />

              </ThemedView>


              {/* Boton para guardar  */}

              <View style={{
                marginHorizontal: 10,
                marginTop: 20,
                marginBottom: 50
              }}>

                <ThemedButton
                  icon='save-outline'
                  onPress={() => handleSubmit()}
                >
                  Guardar
                </ThemedButton>
              </View>

            </ScrollView>
          </KeyboardAvoidingView>

        )
      }
    </Formik>
  )
}

export default ProductScreen