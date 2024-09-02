import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductForm(
{
_id,
title: exisitingTitle,
description: existingDescription, 
price: exisitingPrice,
images}
) {
    const [title, setTitle] = useState(exisitingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(exisitingPrice || '');
    // goToProduct: checks if to send the user to product page or not.
    const [goToProduct, setGoToProduct] = useState(false); 
    const router = useRouter();
    const data = {title, description, price};
    async function handleSubmit(ev) {
        ev.preventDefault();
        if (_id) {
            await axios.put('/api/products', {...data, _id});
        }
        else {
            await axios.post('/api/products', data);
        }
        setGoToProduct(true);
    }

    async function handleUpload(event) {
        const files = event.target?.files;
        if (files?.length > 0) {
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);   
            }
            const res = await axios.post("/api/upload", data, {
                headers: {
                    'Content-Type': 'multipart/form-data'  // Optional: axios sets this automatically for FormData
                }
            });
        }
    }

    if (goToProduct) {
        router.push('/products');
        setGoToProduct(false);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1 className="">New Product</h1>
                <label htmlFor="name">Product Name</label>
                <input type="text"
                value={title}
                onChange={(ev) => {setTitle(ev.target.value)}} 
                id="name" placeholder="new product name..." />

                <label htmlFor="Photos-btn">
                    Photos
                </label>
                <div className="mb-2">
                    <label onClick={handleUpload} className="w-24 h-24 border shadow-md flex justify-center items-center gap-1" id="Photos-btn"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    <div>button</div>
                    <input type="file" className="hidden" accept="image/*" name="filePictures" id="filePictures" />
                    </label>
                    {!images?.length && (<div>No Photos in this product</div>)}
                </div>

                <label htmlFor="description">Product Description</label>
                <textarea 
                value={description}
                onChange={(ev) => {setDescription(ev.target.value)}}
                name="description" id="description" placeholder="description..."></textarea>

                <label htmlFor="price">Price $CAD</label>
                <input className="w-36 block" 
                value={price}
                onChange={(ev) => {setPrice(ev.target.value)}} type="number" name="price" id="price" placeholder="$32"/>

                <button className="btn-primary" type="submit">{router?.pathname === '/products/new' ? "Submit" : "Save"}</button>
            </form>
        </>
    );
}