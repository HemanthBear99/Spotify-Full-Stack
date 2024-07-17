import NavBar from "./NavBar"
import AlbumItem from "./AlbumItem"
import SongItem from "./SongItem"
import { useContext } from "react"
import { PlayerContext } from "../context/PlayerContext"

const DisplayHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext)
  return (
    <>
      <NavBar />
      <div className=" my-4 ">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albumsData.map((album, index) => (
            <AlbumItem
              key={index}
              name={album.name}
              description={album.description}
              id={album._id}
              image={album.image}
            />
          ))}
        </div>
      </div>
      <div className=" my-4 ">
        <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
        <div className="flex overflow-auto">
          {songsData.map((song, index) => (
            <SongItem
              key={index}
              name={song.name}
              description={song.description}
              id={song._id}
              image={song.image}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default DisplayHome
