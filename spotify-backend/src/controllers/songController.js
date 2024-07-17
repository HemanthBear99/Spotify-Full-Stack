import songModel from "../models/songModel.js"
import { v2 as cloudinary } from "cloudinary"

const addSong = async (req, res) => {
  try {
    const { name, description, album } = req.body
    const audioFile = req.files.audio[0]
    const imageFile = req.files.image[0]

    // Upload files to Cloudinary
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    })
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    })
    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    )}`

    const newSong = new songModel({
      name,
      description,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    })

    await newSong.save()
    res.json({ success: true, message: "Song added successfully" })
  } catch (error) {
    console.error("Error adding song:", error)
    res.json({ success: false, message: error.message })
  }
}
const listSong = async (req, res) => {
  try {
    const allSongs = await songModel.find({})
    res.json({ success: true, songs: allSongs })
  } catch (error) {
    res.json({ success: false })
  }
}

const deleteSong = async (req, res) => {
  try {
    const { id } = req.body
    await songModel.findByIdAndDelete(id)
    res.json({ success: true, message: "Song deleted successfully" })
  } catch (error) {
    res.json({ success: false })
  }
}

export { addSong, listSong, deleteSong }
