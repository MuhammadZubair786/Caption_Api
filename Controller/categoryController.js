const CaptionModel = require("../Model/CaptionModel");
const ImagesModel = require("../Model/ImagesModel");
const categoryModel = require("../Model/categoryModel");
const subCategoryModel = require("../Model/subCategoryModel");
const userModel = require("../Model/userModel");
const { validateCategoryCaption } = require("../Validator/CaptionValidate");
const { validateCategory } = require("../Validator/categoryValidate");
const { validateSubCategory } = require("../Validator/subCategoryValidate");
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');


exports.createCategory = async (req, res) => {
    // try {

    const validationResult = validateCategory(req.body);

    if (validationResult) {
        console.error('Validation error:', validationResult.message);
        return res.json({ message: validationResult.message });

    }

    const checkAdmin = await userModel.findById(req.userId)
    if (checkAdmin.userType == "admin") {

        if (req.file == undefined) {

            return res.status(401).json({ message: 'Select Category Pic' });
        }

        const folderName = 'category';
        const qualityLevel = 'auto:low';

        const bufferStream = cloudinary.uploader.upload_stream(
            { folder: folderName, resource_type: 'auto', quality: qualityLevel },
            (error, result) => {
                if (error) {
                    return res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
                }


                // Add the Cloudinary URL to your category data
                const catAdd = categoryModel({ ...req.body, categoryImage: result.secure_url });
                catAdd.save();

                return res.status(409).json({ message: 'Add New Category', data: catAdd });
            }
        );

        // Convert the Buffer to a ReadableStream
        bufferStream.end(req.file.buffer);
    }
    else {
        return res.status(400).json({ error: 'Please Login as Admin' });
    }

    // }
    // catch (e) {
    //     console.log(e)
    //     return res.status(409).json({ error: e });
    // }
}

exports.viewCategory = async (req, res) => {
    try {
    const checkAdmin = await userModel.findById(req.userId)
    if (checkAdmin.userType == "admin") {
        let category = await categoryModel.find({}).populate("sub_category")


        return res.status(200).json({ message: 'View All Category', data: category });
    }
    else {
        return res.status(400).json({ error: 'Please Login as Admin' });
    }


    }
    catch(e){
        return res.status(409).json({ error: 'Error' });
    }

}

exports.deleteCategory = async (req, res) => {
    try {
        const checkAdmin = await userModel.findById(req.userId);

        if (checkAdmin.userType === "admin") {
            const categoryId = req.params.categoryId; // Assuming you have the categoryId in the request parameters
            const deletedCategory = await categoryModel.findByIdAndDelete(categoryId);

            const deleteSubCategry = await subCategoryModel.findOneAndDelete({categoryId})

            const deleteCaptions = await CaptionModel.findOneAndDelete({categoryId})


            if (!deletedCategory) {
                return res.status(404).json({ error: 'Category not found' });
            }

            return res.status(200).json({ message: 'Category deleted successfully', data: deletedCategory });
        } else {
            return res.status(400).json({ error: 'Please Login as Admin' });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.updateCategory = async (req, res) => {
    try {

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No fields provided for update' });
        }
        const validationResult = validateCategory(req.body);

        if (validationResult) {
            console.error('Validation error:', validationResult.message);
            return res.json({ message: validationResult.message });
        }

        const checkAdmin = await userModel.findById(req.userId);

        if (checkAdmin.userType === "admin") {
            const categoryId = req.params.categoryId; // Assuming you have the categoryId in the request parameters
       
           let imageLink = "";


        if (req.file != undefined) { 
            console.log("********")
            const folderName = 'category';
            const qualityLevel = 'auto:low';
    
            const bufferStream = cloudinary.uploader.upload_stream(
                { folder: folderName, resource_type: 'auto', quality: qualityLevel },
                async (error, result) => {
                    if (error) {
                        return res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
                    }
                    
           
                    imageLink = result.secure_url
                    console.log("imagelink")

                    const updatedCategory = await categoryModel.findByIdAndUpdate(
                        categoryId,
                        { ...req.body, categoryImage: imageLink  },
                        { new: true }
                    );
        
                    if (!updatedCategory) {
                        return res.status(404).json({ error: 'Category not found' });
                    }
        
                    return res.status(200).json({ message: 'Category updkasjmfknaskated successfull1y', data: updatedCategory });
                });
                 bufferStream.end(req.file.buffer);


        }
        else{
            const updatedCategory = await categoryModel.findByIdAndUpdate(
            categoryId,
           {...req.body},
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }

        return res.status(200).json({ message: 'Category updated successfully', data: updatedCategory });

        }

        } else {
            return res.status(400).json({ error: 'Please Login as Admin' });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.createSubCategory = async (req, res) => {
    try {

        const { id } = req.params
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid Category ID' });
        }
        else {

            let checkCategory = await categoryModel.findById(id)

            if (checkCategory) {
                if(checkCategory.category_type!="subcategory"){
                    return res.json({ message: "Sub Categpory not add in this category" });

                }
                const validationResult = validateSubCategory(req.body);

                if (validationResult) {
                    console.error('Validation error:', validationResult.message);
                    return res.json({ message: validationResult.message });

                }
                const checkAdmin = await userModel.findById(req.userId)
                if (checkAdmin.userType == "admin") {

                    req.body.categoryId = id

                    var subCatAdd = subCategoryModel(req.body)
                    await subCatAdd.save()

                    checkCategory.sub_category.push(subCatAdd._id)
                    await checkCategory.save();

                    return res.status(200).json({ message: 'Add New Sub Category', data: subCatAdd });
                }
                else {
                    return res.status(400).json({ error: 'Please Login as Admin' });
                }
            }
            else {
                return res.status(400).json({ error: 'Category Not Found' });
            }
        }

    }
    catch (e) {
        console.log(e)
        return res.status(409).json({ error: 'Error' });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const checkAdmin = await userModel.findById(req.userId);

        if (checkAdmin.userType === "admin") {
            const categoryId = req.params.categoryId; // Assuming you have the categoryId in the request parameters
            const deletedCategory = await categoryModel.findByIdAndDelete(categoryId);

            if (!deletedCategory) {
                return res.status(404).json({ error: 'Category not found' });
            }

            return res.status(200).json({ message: 'Category deleted successfully', data: deletedCategory });
        } else {
            return res.status(400).json({ error: 'Please Login as Admin' });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.viewSubCategory = async (req, res) => {
    try {
    const checkAdmin = await userModel.findById(req.userId)
    if (checkAdmin.userType == "admin") {
        let subcategory = await subCategoryModel.find({categoryId:req.params.categoryId}).populate("captions")


        return res.status(200).json({ message: 'View All Sub Category', data: subcategory });
    }
    else {
        return res.status(400).json({ error: 'Please Login as Admin' });
    }


    }
    catch(e){
        return res.status(409).json({ error: 'Error' });
    }

}

exports.deletesubCategory = async (req, res) => {
    try {
        const checkAdmin = await userModel.findById(req.userId);

        if (checkAdmin.userType === "admin") {
            const subcategoryId = req.params.subCategoryId; // Assuming you have the categoryId in the request parameters
            console.log(subcategoryId)
            const deletedSubCategory = await subCategoryModel
                .findByIdAndDelete(subcategoryId)// Assuming 'category' is the field in subCategoryModel referencing categoryModel

            if (!deletedSubCategory) {
                return res.status(404).json({ error: 'Sub Category not found' });
            }

            // Remove the subcategory from the associated category
            const categoryId = deletedSubCategory.categoryId;
            const updatedCategory = await categoryModel.findByIdAndUpdate(
                categoryId,
                { $pull: { sub_category: subcategoryId } },
                { new: true }
            );

            return res.status(200).json({ message: 'Sub Category deleted successfully', data: deletedSubCategory });
        } else {
            return res.status(400).json({ error: 'Please Login as Admin' });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.updatesubCategory = async (req, res) => {
    try {

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No fields provided for update' });
        }
        const validationResult = validateSubCategory(req.body);

        if (validationResult) {
            console.error('Validation error:', validationResult.message);
            return res.json({ message: validationResult.message });
        }

        const checkAdmin = await userModel.findById(req.userId);

        if (checkAdmin.userType === "admin") {
            const categoryId = req.params.subCategoryId; // Assuming you have the categoryId in the request parameters
        const updatedCategory = await subCategoryModel.findByIdAndUpdate(
            categoryId,
           {...req.body},
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ error: 'Sub category not found' });
        }

        return res.status(200).json({ message: 'Sub category updated successfully', data: updatedCategory });

        

        } else {
            return res.status(400).json({ error: 'Please Login as Admin' });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


 exports.getCaptions = async (req, res) => {
        try {
            const { categoryId, subCategoryId } = req.body;
    
            let query = {};

            if (categoryId) {
                query = { categoryId };
            }

            if (subCategoryId) {
                query = { subCategoryId };
            }

            console.log(query)

            const captions = await CaptionModel.find(query);
    
            if (!captions || captions.length === 0) {
                return res.status(404).json({ error: 'No captions found for the provided criteria' });
            }
    
            return res.status(200).json({ message: 'Captions retrieved successfully', data: captions });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
};

exports.deleteCaptions = async (req, res) => {
    try {
        const checkAdmin = await userModel.findById(req.userId);

        if (checkAdmin.userType === "admin") {
            const captionId = req.params.captionId; // Assuming you have the categoryId in the request parameters
            console.log(captionId)
            const deletedCaptions = await CaptionModel
                .findByIdAndDelete(captionId)// Assuming 'category' is the field in subCategoryModel referencing categoryModel

            if (!deletedCaptions) {
                return res.status(404).json({ error: 'Captions not found' });
            }

            // Remove the subcategory from the associated category
            const categoryId = deletedCaptions.categoryId;
            const updatedCategory = await categoryModel.findByIdAndUpdate(
                categoryId,
                { $pull: { sub_category: deletedCaptions.categoryId } },
                { new: true }
            );

            const updatedSubCategory = await subCategoryModel.findByIdAndUpdate(
                categoryId,
                { $pull: { sub_category: deletedCaptions.subCategoryId } },
                { new: true }
            );

            return res.status(200).json({ message: 'Captions deleted successfully', data: deletedCaptions });
        } else {
            return res.status(400).json({ error: 'Please Login as Admin' });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}




// exports.createSubCategory1 = async (req, res) => {
//     try {

//         const validationResult = validateCategory(req.body);

//         if (validationResult) {
//             console.error('Validation error:', validationResult.message);
//             return res.json({ message: validationResult.message });

//         }

//         const checkAdmin = await userModel.findById(req.userId)
//         if (checkAdmin.userType == "admin") {

//             var subCatAdd = subCategoryModel(req.body)
//             await subCatAdd.save()

//             return res.status(200).json({ message: 'Add New Category', data: subCatAdd });
//         }
//         else {
//             return res.status(400).json({ error: 'Please Login as Admin' });
//         }

//     }
//     catch (e) {
//         console.log(e)
//         return res.status(409).json({ error: 'Email is already registered.' });
//     }
// }

exports.createCaptionCategory = async (req, res) => {
    try {

        const { id } = req.params
        const {sub_category_id} = req.body

        delete req.body["sub_category_id"]

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid Category ID' });
        }
        else {

            let checkCategory = await categoryModel.findById(id)

            if (checkCategory) {
                if(checkCategory.category_type=="subcategory"){
                    if(sub_category_id == undefined || sub_category_id ==null ){
                        return res.json({ message: "Sub Category Required" });
                    }

                    else{
                        
                        let checkSubCategory = await subCategoryModel.findById(sub_category_id)
                        if(checkSubCategory.length==0 || checkSubCategory==null){
                            return res.json({ message: "invalid Sub Category Id"});

                        }
                        else{
                            const validationResult = validateCategoryCaption(req.body);
                            if (validationResult) {
                                console.error('Validation error:', validationResult.message);
                                return res.json({ message: validationResult.message });
            
                            }
                            const checkAdmin = await userModel.findById(req.userId)
                            if (checkAdmin.userType == "admin") {
            
                                req.body.categoryId = id
                                req.body.subCategoryId = sub_category_id
            
                                var captionAdd = CaptionModel(req.body)
                                await captionAdd.save()
            
                                checkSubCategory.Caption.push(captionAdd._id)

                                await checkSubCategory.save();
            
                                return res.status(200).json({ message: 'Add New Caption in Sub category', data: captionAdd });
                            }
                            else {
                                return res.status(400).json({ error: 'Please Login as Admin' });
                            }

                        }
                       
                    }
                    // return res.json({ message: "Sub Categpory not add in this category" });

                }
                else{

                    const validationResult = validateCategoryCaption(req.body);
                    if (validationResult) {
                        console.error('Validation error:', validationResult.message);
                        return res.json({ message: validationResult.message });
    
                    }
                    const checkAdmin = await userModel.findById(req.userId)
                    if (checkAdmin.userType == "admin") {
    
                        req.body.categoryId = id
    
                        var captionAdd = CaptionModel(req.body)
                        await captionAdd.save()
    
                        checkCategory.Caption.push(captionAdd._id)

                        await checkCategory.save();
    
                        return res.status(200).json({ message: 'Add New Caption in  category', data: captionAdd });
                    }
                    else {
                        return res.status(400).json({ error: 'Please Login as Admin' });
                    }

                
                }
                
            }
            else {
                return res.status(400).json({ error: 'Category Not Found' });
            }
        }

    }
    catch (e) {
        console.log(e)
        return res.status(409).json({ error: 'Error' });
    }
}


exports.createImages = async (req, res) => {
    try {
    const checkAdmin = await userModel.findById(req.userId)
    if (checkAdmin.userType == "admin") {

        if (req.file == undefined) {

            return res.status(401).json({ message: 'Select Image' });
        }

        const folderName = 'Images';
        const qualityLevel = 'auto:low';

        const bufferStream = cloudinary.uploader.upload_stream(
            { folder: folderName, resource_type: 'auto', quality: qualityLevel },
            (error, result) => {
                if (error) {
                    return res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
                }


                // Add the Cloudinary URL to your category data
                const IamgeAdd = ImagesModel({ status:"show", image: result.secure_url });
                IamgeAdd.save();

                return res.status(409).json({ message: 'Add New Images', data: IamgeAdd });
            }
        );

        // Convert the Buffer to a ReadableStream
        bufferStream.end(req.file.buffer);
    }
    else {
        return res.status(400).json({ error: 'Please Login as Admin' });
    }

    }
    catch (e) {
        console.log(e)
        return res.status(409).json({ error: e });
    }
}

// Zubair11$%^