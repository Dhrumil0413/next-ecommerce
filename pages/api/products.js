import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
    const { method } = req;

    await mongooseConnect();

    if (method === "DELETE") {
        const id = req.query?.id;
        if (id) {
            await Product.deleteOne({ _id: id });
            res.json(true);
        }
    }

    if (method === "PUT") {
        const { title, description, price, _id } = req.body;
        await Product.updateOne({ _id: _id }, { title: title, description: description, price: price });
        res.json(true);
    }

    if (method === "GET") {
        if (req.query?.id) {
            res.json(await Product.findOne({ _id: req.query.id }));
        }
        else {
            const Data = await Product.find();
            res.json(Data);
        }
    }

    if (method === "POST") {
        const { title, description, price } = req.body;
        const productDoc = await Product.create({
            title,
            description,
            price,
        });

        res.json(productDoc);
    }
}