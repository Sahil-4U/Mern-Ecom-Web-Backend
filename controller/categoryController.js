import CategoryModal from "../model/CategoryModal.js";
import slugify from 'slugify';



// create new category
export const categoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: 'Name is required' });
        }
        const isCategoryExist = await CategoryModal.findOne({ name });
        if (isCategoryExist) {
            return res.status(200).send({
                success: false,
                message: 'category already exist'
            })
        }
        const categoryDb = await new CategoryModal({ name, slug: slugify(name) }).save();
        return res.status(201).send({
            success: true,
            message: 'category created successfully',
            categoryDb
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: 'Error in category-controller'
        })
    }
};

// update category controller
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const categorydb = await CategoryModal.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
        console.log(categorydb);
        return res.status(202).send({
            success: true,
            categorydb,
            message: 'Category updated successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: 'Error in catergory update controller'
        })
    }
}

// all categories
export const allCategoryController = async (req, res) => {
    try {
        const categorydb = await CategoryModal.find({});
        return res.status(200).send({
            success: true,
            categorydb,
            message: 'All categories'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: 'Error in allcategoryController'
        })
    }
}

// single category controller
export const singleCategoryController = async (req, res) => {
    try {
        const categorydb = await CategoryModal.findOne({ slug: req.params.slug });
        return res.status(200).send({
            success: true,
            categorydb,
            message: "Single category find successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: 'Error in singleCategoryController'
        })
    }
}

// delete category
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await CategoryModal.findByIdAndDelete(id);
        return res.status(200).send({
            success: true,
            message: "Category deleted successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'error in deleteCategoryController',
            error
        })
    }
}