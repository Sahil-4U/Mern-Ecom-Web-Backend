import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'category',
        // ab hum yha pr reference create kr rhe h to humko us model ka jo export keyword h yani jo model ka name liya h vhi likhna h or mongoose.ObjectId ek type ka id hota h jo database khud se generate krta h:)
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
        // agar humko koi bhi image database m save krni ho to humko type:Buffer or contentType:String lena hi pdega or buffer m hum sirf 15 mb tk ki file save kr skte h

    },
    shipping: {
        type: Boolean
    }
}, { timestamps: true })

export default mongoose.model('productsSchema', productSchema);