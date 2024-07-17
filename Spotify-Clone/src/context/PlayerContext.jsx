import { createContext, useEffect, useRef, useState } from "react"
import axios from "axios"

export const PlayerContext = createContext()

const PlayerContextProvider = (props) => {
  const audioRef = useRef()
  const seekBg = useRef()
  const seekBar = useRef()
  const url = "http://localhost:5000"
  const [songsData, setSongsData] = useState([])
  const [albumsData, setAlbumsData] = useState([])

  const [track, setTrack] = useState(null)
  const [playStatus, setPlayStatus] = useState(false)
  const [time, setTime] = useState({
    currentTime: {
      seconds: 0,
      minutes: 0,
    },
    totalTime: {
      seconds: 0,
      minutes: 0,
    },
  })

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setPlayStatus(true)
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setPlayStatus(false)
    }
  }

  const playWithId = (id) => {
    const song = songsData.find((data) => id === data._id)
    if (song) {
      setTrack(song)
      if (audioRef.current) {
        audioRef.current.play()
        setPlayStatus(true)
      }
    }
  }

  const previous = () => {
    const currentIndex = songsData.findIndex(
      (data) => track && data._id === track._id
    )
    if (currentIndex > 0) {
      setTrack(songsData[currentIndex - 1])
      if (audioRef.current) {
        audioRef.current.play()
        setPlayStatus(true)
      }
    }
  }

  const next = () => {
    const currentIndex = songsData.findIndex(
      (data) => track && data._id === track._id
    )
    if (currentIndex >= 0 && currentIndex < songsData.length - 1) {
      setTrack(songsData[currentIndex + 1])
      if (audioRef.current) {
        audioRef.current.play()
        setPlayStatus(true)
      }
    }
  }

  const seekSong = (e) => {
    if (audioRef.current && seekBar.current) {
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / seekBar.current.offsetWidth) *
        audioRef.current.duration
    }
  }

  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`)
      setSongsData(response.data.songs)
      if (response.data.songs.length > 0) {
        setTrack(response.data.songs[0])
      }
    } catch (error) {
      console.error("Error fetching songs data:", error)
    }
  }

  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`)
      setAlbumsData(response.data.albums)
    } catch (error) {
      console.error("Error fetching albums data:", error)
    }
  }

  useEffect(() => {
    audioRef.current.ontimeupdate = () => {
      if (seekBar.current) {
        seekBar.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + "%"
      }
      setTime({
        currentTime: {
          seconds: Math.floor(audioRef.current.currentTime % 60),
          minutes: Math.floor(audioRef.current.currentTime / 60),
        },
        totalTime: {
          seconds: Math.floor(audioRef.current.duration % 60),
          minutes: Math.floor(audioRef.current.duration / 60),
        },
      })
    }
  }, [])

  useEffect(() => {
    getSongsData()
    getAlbumsData()
  }, [])

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    songsData,
    albumsData,
  }

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  )
}

export default PlayerContextProvider
