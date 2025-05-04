import { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Product } from '@/core/products/interface/product.interface';
import { ProductCard } from './ProductCard';
import { useQueryClient } from '@tanstack/react-query';



interface Props {
  products: Product[];
  loadNextPage: () => void;
}


const ProductList = ({ products, loadNextPage }: Props) => {

  const [isRefreshing, setIsRefreshing] = useState(false);

  const queryClient = useQueryClient();

  const onPullTorefresh = async() => {

    setIsRefreshing(true);

    await new Promise(resolve => setTimeout(resolve, 200));

    queryClient.invalidateQueries({
      queryKey: ['products', 'infinite'],
      exact: true,
    });


    setIsRefreshing(false);

  }
  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ProductCard product={item} />}

      onEndReached={loadNextPage}
      onEndReachedThreshold={0.8}
      showsVerticalScrollIndicator={false}

      refreshControl={ 
        <RefreshControl 
          refreshing={isRefreshing}
          onRefresh={onPullTorefresh}
          // colors={['#FF0000']}
          // progressBackgroundColor={'#F9F9F9'}
          // tintColor={'#FF0000'}
        />
       }
    />
  )
}

export default ProductList