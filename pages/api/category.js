import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handler(req, res) {
    const {method} = req;
    await mongooseConnect();

    if (method === "GET") {
        const Data = await Category.find();
        res.json(Data);
    }

    if (method === "POST") {
        const {name} = req.body;
        const CategoryDoc = await Category.create({name});
        res.json(CategoryDoc);
    }
}