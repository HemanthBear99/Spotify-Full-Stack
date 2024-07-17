import albumModel from "../models/albumModel.js"

import { v2 as cloudinary } from "cloudinary"

const addAlbum = async (req, res) => {
  try {
    const { name, description, bgColour } = req.body

    // Check if all required fields are provided
    if (!name || !description || !bgColour) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" })
    }

    // Check if file is uploaded
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No image uploaded" })
    }

    const imageFile = req.file

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    })

    // Create new album object
    const newAlbum = new albumModel({
      name,
      description,
      bgColour,
      image: imageUpload.secure_url,
    })

    // Save album to MongoDB
    await newAlbum.save()

    // Respond with success message
    res.json({ success: true, message: "Album added successfully" })
  } catch (error) {
    console.error("Error adding album:", error)
    res.json({ success: false, message: error.message })
  }
}
const listAlbum = async (req, res) => {
  try {
    const allAlbums = await albumModel.find({})
    res.json({ success: true, albums: allAlbums })
  } catch (error) {
    console.error("Error listing albums:", error)
    res.json({ success: false, message: error.message })
  }
}

const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.body
    await albumModel.findByIdAndDelete(id)
    res.json({ success: true, message: "Album deleted successfully" })
  } catch (error) {
    console.error("Error deleting album:", error)
    res.json({ success: false, message: error.message })
  }
}

export { addAlbum, listAlbum, deleteAlbum }
