import Layout from "@/components/layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function editProduct() {
    const [productData, setProductData] = useState(null);

    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/products?id='+id).then(response => {
            setProductData(response.data);
        });
    }, [id]);

    return (

        <Layout>
            {productData && <ProductForm {...productData}/>}
        </Layout>
 
    );
}