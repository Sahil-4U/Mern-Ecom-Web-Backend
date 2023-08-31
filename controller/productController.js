import ProductModel from "../model/ProductModel.js";
import slugigy from 'slugify';
import fs from 'fs';

export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // now we check everything is find or not we implement here validations with the help of switch statement
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' })
            case !description:
                return res.status(500).send({ error: 'Description is required' })
            case !price:
                return res.status(500).send({ error: 'Price is required' })
            case !category:
                return res.status(500).send({ error: 'Category is required' })
            case !quantity:
                return res.status(500).send({ error: 'Quantity is required' })
            case photo && photo.size < 100000:
                return res.status(500).send({ error: 'Photo  is required and size should be less than 1mb' })
        }
        const products = new ProductModel({ ...req.fields, slug: slugigy(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.path;
        }
        await products.save();
        return res.status(201).send({
            success: true,
            message: "products created successfully",
            products,
        })
    } catch (error) {
    console.log(error);
    return res.status(500).send({
        success: false,
        error,
        message: 'Error in create Product Controller'
    })
}
}