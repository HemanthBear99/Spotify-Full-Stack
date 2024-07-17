import { useEffect, useState } from "react"
import { assets } from "../assets/assets"
import axios from "axios"
import { url } from "../App"
import { toast } from "react-toastify"

const AddSong = () => {
  const [image, setImage] = useState(false)
  const [song, setSong] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [album, setAlbum] = useState("none")
  const [loading, setLoading] = useState(false)
  const [albumData, setAlbumData] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("audio", song)
      formData.append("image", image)
      formData.append("name", name)
      formData.append("description", description)
      formData.append("album", album)

      const response = await axios.post(`${url}/api/song/add`, formData)
      if (response.data.success) {
        toast.success("Added song")
        setName("")
        setDescription("")
        setAlbum("none")
        setImage(false)
        setSong(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Error adding song")
    }
    setLoading(false)
  }

  const loadAlbumData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`)
      if (response.data.success) {
        setAlbumData(response.data.albums)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Error loading albums")
    }
  }
  useEffect(() => {
    loadAlbumData()
  }, [])

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  ) : (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-8 text-gray-600"
    >
      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <p>Upload Song</p>
          <input
            onChange={(e) => setSong(e.target.files[0])}
            type="file"
            id="song"
            accept="audio/*"
            hidden
          />
          <label htmlFor="song">
            <img
              src={song ? assets.upload_added : assets.upload_song}
              alt=""
              className="w-24 cursor-pointer"
            />
          </label>
        </div>
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
      </div>
      <div className="flex flex-col gap-3">
        <p>Song Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-3 w-[max(40vw,250px)]"
          placeholder="Type Here...."
          required
        />
      </div>
      <div className="flex flex-col gap-3">
        <p>Song Description</p>
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-3 w-[max(40vw,250px)]"
          placeholder="Type Here...."
          required
        />
      </div>
      <div className="flex flex-col gap-3">
        <p>Album</p>
        <select
          onChange={(e) => setAlbum(e.target.value)}
          value={album}
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-3 w-[150px]"
        >
          <option value="none">None</option>
          {albumData.map((data, index) => {
            return (
              <option key={index} value={data.name}>
                {data.name}
              </option>
            )
          })}
        </select>
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

export default AddSong
