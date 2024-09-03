import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ReactSortable } from "react-sortablejs";

import SpinningLoader from "@/components/SpiningLoader";

export default function ProductForm(
    {
        _id,
        title: exisitingTitle,
        description: existingDescription,
        price: exisitingPrice,
        images: existingImagesLinks }
) {
    const [title, setTitle] = useState(exisitingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(exisitingPrice || '');
    const [imagesLinks, setImagesLinks] = useState(existingImagesLinks || []);
    const [isImageUploading, setIsImageUploading] = useState(false);
    // goToProduct: checks if to send the user to product page or not.
    const [goToProduct, setGoToProduct] = useState(false);
    const router = useRouter();
    const data = { title, description, price, imagesLinks };
    async function handleSubmit(ev) {
        ev.preventDefault();
        if (_id) {
            await axios.put('/api/products', { ...data, _id });
        }
        else {
            await axios.post('/api/products', data);
        }
        setGoToProduct(true);
    }

    async function handleUpload(event) {
        const files = event.target?.files;
        if (files?.length > 0) {
            setIsImageUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }

            const res = await axios.post('/api/upload', data);
            setImagesLinks(oldImages => { return [...imagesLinks, ...res.data.links] });
            setIsImageUploading(false);
        }
    }

    function setListImageHandler(images) {
        setImagesLinks(images);
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
                    onChange={(ev) => { setTitle(ev.target.value) }}
                    id="name" placeholder="new product name..." />

                <label htmlFor="Photos-btn">
                    Photos
                </label>
                <div>
                    <div className="mb-2 flex flex-wrap gap-1 items-center">
                        <ReactSortable list={imagesLinks} className="flex flex-wrap gap-1" setList={setListImageHandler}>
                            {
                                imagesLinks?.length > 0 && imagesLinks.map((link) => {
                                    return (
                                        <div key={link} className="w-24 h-24 overflow-hidden">
                                            <img className="rounded" src={link} alt="Product Images" />
                                        </div>
                                    )
                                })
                            }
                        </ReactSortable>
                        {
                            isImageUploading && (<div className="flex items-center justify-center w-24 h-24"><SpinningLoader /></div>)
                        }
                        <label className="w-24 h-24 border shadow-md flex justify-center items-center gap-1" id="Photos-btn"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                            <div>button</div>
                            <input required onChange={handleUpload} type="file" accept="image/*" className="hidden" name="filePictures" id="filePictures" />
                        </label>
                    </div>
                    {!!imagesLinks?.length && (<div>No Photos in this product</div>)}
                </div>

                <label htmlFor="description">Product Description</label>
                <textarea required
                    value={description}
                    onChange={(ev) => { setDescription(ev.target.value) }}
                    name="description" id="description" placeholder="description..."></textarea>

                <label htmlFor="price">Price $CAD</label>
                <input required className="w-36 block"
                    value={price}
                    onChange={(ev) => { setPrice(ev.target.value) }} type="number" name="price" id="price" placeholder="$32" />

                <button className="btn-primary" type="submit">{router?.pathname === '/products/new' ? "Submit" : "Save"}</button>
            </form>
        </>
    );
}