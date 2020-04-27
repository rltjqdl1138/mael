import { createAction, handleActions } from 'redux-actions'
import { Asset } from 'expo-asset';
import networkHandler from '../../networkHandler'
import CacheManager from '../../CacheManager'


const INITIALIZE = 'audio/INITIALIZE'
const UPDATE = 'audio/UPDATE'
const REPLAY = 'audio/REPLAY'
const PAUSE = 'audio/PAUSE'
const RESUME = 'audio/RESUME'
const NEXT = 'audio/NEXT'
const JUMP = 'audio/JUMP'
const CHANGE_OPTION = 'audio/CHANGE_OPTION'
const TIMING = 'audio/TIMING'
const TURN_TO_PLAY = 'audio/TURN_TO_PLAY'
const TURN_TO_LOAD = 'audio/TURN_TO_LOAD'

export const initialize = createAction(INITIALIZE, value => value)
export const update = createAction(UPDATE, value => value)
export const replay = createAction(REPLAY, value => value)
export const pause = createAction(PAUSE, value => value)
export const resume = createAction(RESUME, value => value)
export const next = createAction(NEXT, value => value)
export const jump = createAction(JUMP, value => value)
export const changeOption = createAction(CHANGE_OPTION, value=>value)
export const timing = createAction(TIMING, value=>value)
export const turnToPlay = createAction(TURN_TO_PLAY)
export const turnToLoad = createAction(TURN_TO_LOAD)

const playOption = {
    option: 0
}

const initialState = {
    showPlaybar:false,
    isPlaying: false,
    isLoaded:false,
    isUpdated:true,
    playOption: playOption,

    soundObject: null,
    time:{ms:0, duration:100000},
    
    albumID: -1,
    index: 0,
    playlist:[],
    playinfo:{}
}


const loadAndPlay = async (soundObject, url, isPlaying) =>{
    try{
        if(isPlaying)
            await soundObject.pauseAsync()
        await soundObject.unloadAsync()
        const result = await CacheManager.music.getMusicFromCache(url)
        if(result.status === 'fail'){
            console.warn('다운로드 실패')
            await soundObject.loadAsync({uri: networkHandler.url + '/music/' + url},{},true)
        }else{
            console.warn(result.status)
            await soundObject.loadAsync({uri:result.uri})
        }
        await soundObject.playAsync()
    }catch(e){
        throw Error(e)
    }
}
export default handleActions({
    [INITIALIZE]: (state, {payload})=>{
        const { soundObject } = payload
        return {
            ...state,
            soundObject
        }
    },

    //My playlist 재생중 목록 삭제/수정/추가 changedIndex / list
    //앨범 플레이  albumID / index / list
    [UPDATE]: (state, {payload}) =>{
        const {albumID, index, list, info} = payload
        const {soundObject, isPlaying} = state
        
        // Unnormal case
        if(!albumID && info)
            return state
        if(albumID === undefined)
            return state
        if(!list || list.length === 0){
            if(state.albumID===0){
                soundObject.unloadAsync()
                return{
                    ...state,
                    index:0,
                    albumID:-1,
                    showPlaybar:false,
                    isPlaying: false,
                    isLoaded:false,
                    isUpdated:false,
                    playlist:[]
                }
            }
            return state
        }
        //edit My Playlist
        if(albumID===0 && state.albumID===0 && index!==undefined ){
            
            const isNeedLoading = index === state.index
            let nowIndex = index < state.index ? state.index -1 : state.index
            nowIndex = nowIndex > list.length ? 0: nowIndex
            if(isNeedLoading && isPlaying)
                loadAndPlay(soundObject, list[nowIndex].uri, isPlaying)
            
            return {
                ...state,
                isLoaded: !isNeedLoading,
                index: nowIndex,
                isUpdated:false,
                playlist:list,
            }
        }
        // Play My playlist
        else if(albumID === 0){
            let nowIndex = index ? index -1 : 0

            // Trouble shooting
            // TODO: error catch
            if( !list[nowIndex] || !list[nowIndex].uri )
                return state

            loadAndPlay(soundObject, list[nowIndex].uri, isPlaying)
            return {
                ...state,
                playinfo: null,
                isPlaying: true,
                showPlaybar: true,
                isLoaded:false,
                albumID:0,
                index: nowIndex,
                playlist: list,
                isUpdated:false
            }
        }
        let nowIndex = index ? index -1 : 0

        // Trouble shooting
        // TODO: error catch
        if( !list[nowIndex] || !list[nowIndex].uri)
            return state

        try{ loadAndPlay(soundObject, list[nowIndex].uri, isPlaying) }
        catch(e){
            console.warn(e)
            soundObject.unloadAsync()
            return {
                ...state,
                playinfo:info,
                isPlaying: false,
                showPlaybar: true,
                isLoaded:false,
                albumID,
                index:nowIndex,
                playlist:list,
                isUpdated:false
            }
        }
        return {
            ...state,
            playinfo:info,
            isPlaying:true,
            isLoaded:false,
            showPlaybar:true,
            albumID,
            index:nowIndex,
            playlist:list,
            isUpdated:false
        }
    },

    [REPLAY]:( state )=>{
        const {soundObject, isPlaying} = state
        soundObject.replayAsync()
        if(isPlaying)
            return state
        else
            return {
                ...state,
                isPlaying:true
            }
    },

    [PAUSE]: (state, {payload})=>{
        const {isPlaying} = state
        if(!isPlaying)
            return state

        try{  state.soundObject.pauseAsync()  }
        catch(e){
            console.warn(e)
            return state
        }
        return {
            ...state,
            isPlaying: false
        }
    },

    [RESUME]: ( state, {payload} )=>{
        const {isPlaying} = state
        if(isPlaying)
            return state

        try{  state.soundObject.playAsync()  }
        catch(e){
            console.warn(e)
            return state}

        return {
            ...state,
            isPlaying: true}
    },

    [CHANGE_OPTION]:(state, {payload})=>{
        const option = payload ? payload.option : undefined
        if(option!==undefined && option >= 0 && option <4)
            return {...state, playOption:{option}}
        const playOption = (state.playOption.option + 1) % 3
        return {...state, playOption:{option: playOption}}
    },

    [NEXT]: (state, {payload})=>{
        const { isPlaying, playlist, soundObject } = state
        const { index } = payload
        let _index = index===undefined ?  state.index + 1 : index - 1
        const limit = playlist.length

        if( _index > limit)
            return state

        else if(_index === limit)
            _index = 0

        else if(index <= 0)
            _index = limit - 1

        loadAndPlay(soundObject, playlist[_index].uri, isPlaying)
        return {
            ...state,
            isPlaying:true,
            isLoaded:false,
            index: _index
        }
        

    },

    [JUMP]: (state, {payload})=>{
        const { ms } = payload

        state.soundObject.setStatusAsync({ positionMillis: ms })
        return {
            ...state,
            isLoaded:false }
    },
    [TIMING]:(state,{payload}) =>
        payload.duration?
            ({...state,time:{ms:payload.ms, duration:payload.duration}}) :
            ({ ...state, time: {...state.time, ms:payload.ms}})
    ,
    [TURN_TO_PLAY]: (state)=>({ ...state, isLoaded:true }),
    [TURN_TO_LOAD]:(state)=> ({ ...state, isUpdated:true })
}, initialState)