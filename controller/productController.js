import ProductModel from "../model/ProductModel.js";
import slugigy from 'slugify';
import fs from 'fs';

// create Product
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

// get all products
export const getproductsController = async (req, res) => {
    try {
        const products = await ProductModel.find({}).populate("category").select("-photo").limit(12).sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            totalcount: products.length,
            message: 'All products',
            products
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in getting all products (check getproductsController)",
            error
        })
    }
}

// get Single product
export const getsingleproductController = async (req, res) => {
    try {
        const product = await ProductModel.findOne({ slug: req.params.slug }).select("-photo").populate("category");
        return res.status(200).send({
            success: true,
            message: 'Single Product',
            product
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in fetching single product check(getsingleproductController)',
            error
        })
    }
}

// get photo of a product
export const photoController = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "error in photoContoller",
            error,
        })

    }
}

// delete product controller
export const deleteproductController = async (req, res) => {
    try {
        await ProductModel.findByIdAndDelete(req.params.pid).select("-photo");
        return res.status(200).send({
            success: true,
            message: 'Product deleted successfully'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'error while delete product',
            error
        })
    }
}