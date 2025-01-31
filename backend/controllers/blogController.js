import blogModel from "../models/blogModel.js"
import cloudinary from "../utils/cloudinary.js";


const createBlog = async (req, res) => {
    let imageUrl;
    const { title, description, image, content } = req.body;
    const allowedfields = ["title", "description", "image", "content"];
    const isAllowed = Object.keys(req.body).every((val) => {
        return allowedfields.includes(val);
    })
    try {
        if(!title || !description || !image || !content){
            throw new Error("Fill all the fields")
        }
        if (!isAllowed) {
            throw new Error("blog creation not possible");
        }
        const istitle = await blogModel.findOne({ title })
        if (istitle) {
            throw new Error("try different title");
        }
        const user = req.user
        //console.log(user);
        if (image && image.startsWith("data:image")) {
            try {
                const cloudResponse = await cloudinary.uploader.upload(image, { folder: "blogImages" });
                imageUrl = cloudResponse?.secure_url;
            } catch (error) {
                throw new Error("Failed in uploading image")
            }
        }
        else{
            imageUrl = image
        }
        const data = new blogModel({
            title, description, image: imageUrl, content,author:user._id
        })
        //console.log(data);
        await data.save();
        res.status(201).json({ message: "blog created" })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAllBlogs = async (req, res) => {
    const id = req.user._id
    try {
        const data = await blogModel.find({author:id})
        if (!data) {
            throw new Error("no blogs found");
        }
        
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getBlog = async(req,res)=>{
    const id = req.params.id;
    try {
        const data = await blogModel.findById(id);
        if (!data) {
            throw new Error("blog not found");
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export {
    createBlog,
    getAllBlogs,
    getBlog
}