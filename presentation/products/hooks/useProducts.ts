import { getProducts } from "@/core/products/actions/get-products.action"
import { useInfiniteQuery } from "@tanstack/react-query"


export const useProducts = () => {


    const productsQuery = useInfiniteQuery({
        queryKey: ['products', 'infinite'],
        queryFn: (params) => getProducts(20, params.pageParam * 20),
        staleTime: 1000 * 60 * 60, // 60 minutes
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => allPages.length,
    })

  return {
    productsQuery,


    // Methods
    loadNextPage: productsQuery.fetchNextPage
  }
}
