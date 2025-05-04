import { productsApi } from '@/core/api/productsApi';
import { Product } from '@/core/products/interface/product.interface';



export const updateCreateProduct = async (product: Partial<Product>) => {

    product.stock = isNaN(product.stock as number) ? 0 : Number(product.stock);
    product.price = isNaN(product.price as number) ? 0 : Number(product.price);

    if (product.id && product.id !== 'new') {
       return updateProduct(product)
    }

    return createProduct(product);

}

const updateProduct = async(product: Partial<Product>) => {

    const { id, images = [], user, ...rest } = product;

    try {
        const { data } = await productsApi.patch<Product>(`/products/${id}`, {
            ...rest,
            //TODO images
        }) 
       
        return data;
    } catch (error) {
        console.log(error)
        throw new Error('Error al actualizar el producto');
        
    }
    
    
}

const createProduct = async(product: Partial<Product>) => {
    const { id, images = [], user, ...rest } = product;

    try {
        const { data } = await productsApi.post<Product>(`/products`, {
            ...rest,
            //TODO images
        }) 
        
        return data;
    } catch (error) {
        console.log(error)
        throw new Error('Error al crear el producto');
        
    }
}

