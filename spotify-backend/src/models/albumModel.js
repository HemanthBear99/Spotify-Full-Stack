import mongoose from "mongoose"
const albumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  bgColour: { type: String, required: true },
  image: { type: String, required: true },
})

const albumModel = mongoose.models.Album || mongoose.model("album", albumSchema)

export default albumModel
