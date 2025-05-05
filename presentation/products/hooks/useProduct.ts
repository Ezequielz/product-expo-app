import { getProductById } from "@/core/products/actions/get-product-by-id.action"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Product } from '@/core/products/interface/product.interface';
import { Alert } from "react-native";
import { updateCreateProduct } from "@/core/products/actions/create-update-product.action";
import { useRef } from "react";
import { useCameraStore } from "@/presentation/store/useCameraStore";

export const useProduct = (productId: string) => {

    const { clearImages } = useCameraStore();
    const queryClient = useQueryClient();
    const productIdRef = useRef( productId )


    const   productQuery = useQuery({
        queryKey: ['products', productId],
        queryFn: () => getProductById(productId),
        staleTime: 1000 * 60 * 60, // 60 minutes

    });

    // Mutacion
    const productMutation = useMutation({
        mutationFn: async(data: Product) => updateCreateProduct({
            ...data,
            id: productIdRef.current
        }),
        onSuccess( data: Product ){

            productIdRef.current = data.id
            clearImages();
            // invalidar product querys
            queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] });
            queryClient.invalidateQueries({ queryKey: ['products', data.id] });

            Alert.alert('Producto guardado', `El producto ${data.title} fue guardado correctamente`)
        }


    })

    // Mantener id del producto en caso que sea nuevo


    return {
        productQuery,
        productMutation,
    }
}
