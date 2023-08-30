export const createProductController = async (req, res) => {
    try {

} catch (error) {
    console.log(error);
    return res.status(500).send({
        success: false,
        error,
        message: 'Error in create Product Controller'
    })
}
}