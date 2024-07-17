import { useEffect, useState } from "react"
import axios from "axios"
import { url } from "../App"
import { toast } from "react-toastify"

const ListAlbum = () => {
  const [data, setData] = useState([])

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`)

      if (response.data.success) {
        setData(response.data.albums)
      }
    } catch (error) {
      toast.error("error occured")
    }
  }
  const deleteAlbum = async (id) => {
    try {
      const response = await axios.post(`${url}/api/album/delete`, { id })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchAlbums()
      } else {
        toast.error("Error deleting song")
      }
    } catch (error) {
      toast.error("Error occurred")
    }
  }
  useEffect(() => {
    fetchAlbums()
  }, [])

  return (
    <div>
      <p>All Albums List</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-3 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Colour</b>
          <b>Action</b>
        </div>
        {data.map((data, index) => {
          return (
            <div
              key={index}
              className="grid  grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-3 p-3 border border-gray-300 text-sm mr-5 bg-white"
            >
              <img className="w-10" src={data.image} alt={data.name} />
              <p>{data.name}</p>
              <p>{data.description}</p>
              <input type="color" value={data.bgColour} />
              <button
                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                onClick={() => deleteAlbum(data._id)}
              >
                Delete
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListAlbum
