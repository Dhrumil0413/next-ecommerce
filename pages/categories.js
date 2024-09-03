import Layout from "@/components/layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
    const [name, setName] = useState('');
    const [nameData, setNameData] = useState([]);

    useEffect(() => {
        axios.get('/api/category').then(response => {
            setNameData(response.data);
        })
    }, []);
    
    async function handleSubmit(e) {
        e.preventDefault();
        await axios.post('/api/category', {name});
        setName('');
    }

    return (
        <>
        <Layout>
            <h1>Categories</h1>
            <form onSubmit={handleSubmit} className="flex items-center max-w-[70%]">
                <input className="mb-0 py-1 border-e-0 rounded-r-none focus:border-white" 
                placeholder="Category Name..." 
                type="text"
                value={name}
                onChange={(e) => {setName(e.target.value)}} name="Category-Search" id="Category-Search" />
                <button className="bg-blue-600 border-2 border-blue-600 rounded-l-none rounded px-2 py-1 text-white" 
                type="submit">Save</button>
            </form>

            <table className="basic max-w-[70%]">
                <thead>
                    <tr>
                        <td>Category Name</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        nameData.length > 0 && nameData.map((singleName, index) => {
                            return (
                            <tr key={index}>
                                <td>{singleName.name}</td>
                            </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </Layout>
        </>
    );
}