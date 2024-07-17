import { useState } from "react"
import { assets } from "../assets/assets"
import { url } from "../App"
import { toast } from "react-toastify"
import axios from "axios"
const AddAlbum = () => {
  const [image, setImage] = useState(false)
  const [colour, setColour] = useState("#121212")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("image", image)
      formData.append("name", name)
      formData.append("description", description)
      formData.append("bgColour", colour)

      const response = await axios.post(`${url}/api/album/add`, formData)

      if (response.data.success) {
        toast.success("Added album successfully")
        setImage(false)
        setName("")
        setDescription("")
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Error occured")
    }
    setLoading(false)
  }

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  ) : (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-8 text-gray-600"
    >
      <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          accept="image/*"
          hidden
        />
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt=""
            className="w-24 cursor-pointer"
          />
        </label>
      </div>
      <div className=" flex flex-col gap-3">
        <p>Album Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Album Name"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-3 w-[max(40vw,250px)]"
        />
      </div>
      <div className=" flex flex-col gap-3">
        <p>Album Description</p>
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          placeholder="Album Description"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-3 w-[max(40vw,250px)]"
        />
      </div>
      <div className="flex flex-col gap-3">
        <p>Background Color</p>
        <input
          type="color"
          onChange={(e) => setColour(e.target.value)}
          value={colour}
        />
      </div>
      <button
        type="submit"
        className="text-base bg-black text-white py-3 px-14 cursor-pointer"
      >
        Add
      </button>
    </form>
  )
}

export default AddAlbum
