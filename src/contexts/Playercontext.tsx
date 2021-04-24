import { createContext, ReactNode, useContext, useState } from 'react'

type Episode = {
    title: string,
    members: string,
    thumbnail: string,
    duration: number,
    url: string,
}

type PlayerContextData = {
    episodeList:Episode[],
    currentEpisodeIndex: number,
    isPlaying:boolean,
    hasPrevious: boolean,
    hasNext: boolean,
    isLooping: boolean,
    isShuffling: boolean,
    play: (episode: Episode) => void,
    toggleLoop: ()=>void,
    togglePlay: () => void,
    toggleShuffle: () => void,
    setPlayingState: (state: boolean) => void,
    playlist: (list: Episode[], index: number) => void,
    playPrevious: () => void,
    playNext: () => void,
    clearPlayerState: ()=>void,
}

type PlayerContextProviderProps ={
    children : ReactNode
}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({children}:PlayerContextProviderProps){
    const [episodeList, setEpisodeList] = useState([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [ isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)
    const [isShuffling, setIsShuffling] = useState(false)
    
    function play(episode: Episode){
      setEpisodeList([episode])
      setCurrentEpisodeIndex(0)
      setIsPlaying(true)
  
    }

    function playlist(list: Episode[], index: number){
        setEpisodeList(list)
        setCurrentEpisodeIndex(index)
        setIsPlaying(true)
    }
  
    function togglePlay(){
        setIsPlaying(!isPlaying)
    }

    function toggleLoop(){
        setIsLooping(!isLooping)    
    }

    function toggleShuffle(){
        setIsShuffling(!isShuffling)
    }
  
    function setPlayingState(state: boolean){
      setIsPlaying(state)
    }

    function clearPlayerState(){
        setEpisodeList([])
        setCurrentEpisodeIndex(0)
    }

    const hasPrevious = currentEpisodeIndex > 0
    const hasNext =  isShuffling ||(currentEpisodeIndex+1) < episodeList.length

    function playNext(){
        if(isShuffling){
            const nextRandomIndex = Math.floor(Math.random() * episodeList.length)
            setCurrentEpisodeIndex(nextRandomIndex)
        } else if(hasNext){
            setCurrentEpisodeIndex(currentEpisodeIndex + 1)
        }   
    
    }

    function playPrevious(){
        if(isShuffling){
            const nextRandomIndex = Math.floor(Math.random() * episodeList.length)
            setCurrentEpisodeIndex(nextRandomIndex)
        } else if(hasPrevious){
            setCurrentEpisodeIndex(currentEpisodeIndex - 1)
        }   
    }
  
    return(
      <PlayerContext.Provider 
      value={{
        episodeList, 
        currentEpisodeIndex,
        play,
        isPlaying,
        togglePlay,
        playlist,
        playPrevious,
        playNext,
        setPlayingState,
        hasPrevious,
        hasNext,
        isLooping,
        toggleLoop,
        isShuffling,
        toggleShuffle,
        clearPlayerState
    }}
        >
          {children}
      </PlayerContext.Provider>
    )
}


export const usePlayer = () => {
    return useContext(PlayerContext)
}

