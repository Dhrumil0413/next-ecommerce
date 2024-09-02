import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function deleteItem() {
    const router = useRouter();
    const id = router?.query?.delete;
    console.log(id);
    const [productData, setProductData] = useState(null);

    
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/products?id='+id).then(response => {
            setProductData(response.data);
        });
    }, [id]);

    function goBack() {
        router.push('/products');
    }

    async function handleDelete() {
        await axios.delete('/api/products?id='+id);
        goBack();
    }

    return(
        <Layout>
            <h1>Are you sure you want to delete "{productData?.title}"?</h1>
            <button onClick={handleDelete} className="bg-red-600 p-1 px-3 rounded-md text-white mr-4">Delete</button>
            <button onClick={goBack} className="bg-blue-600 p-1 px-3 rounded-md text-white">Cancel</button>
        </Layout>
    );
}