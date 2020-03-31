import { createAction, handleActions } from 'redux-actions'
import store from '../index'
import { Audio } from 'expo-av'

const SHUFFLE = 0
const REPEAT = 1
const SEQUENTE = 2

const INITIALIZE = 'audio/INITIALIZE'
const UPDATE = 'audio/UPDATE'
const REPLAY = 'audio/REPLAY'
const PAUSE = 'audio/PAUSE'
const RESUME = 'audio/RESUME'
const NEXT = 'audio/NEXT'
const JUMP = 'audio/JUMP'
const OLDTIMING = 'audio/OLDTIMING'
const NEWTIMING = 'audio/NEWTIMING'
const CHANGE_OPTION = 'audio/CHANGE_OPTION'
const ENDING = 'audio/ENDING'

export const initialize = createAction(INITIALIZE, value => value)
export const update = createAction(UPDATE, value => value)
export const replay = createAction(REPLAY, value => value)
export const pause = createAction(PAUSE, value => value)
export const resume = createAction(RESUME, value => value)
export const next = createAction(NEXT, value => value)
export const jump = createAction(JUMP, value => value)
export const oldtiming = createAction(OLDTIMING, value => value)
export const newtiming = createAction(NEWTIMING, value => value)
export const ending = createAction(ENDING, value => value)
export const changeOption = createAction(CHANGE_OPTION, value=>value)


Audio.setAudioModeAsync({
    playsInSilentModeIOS:true,
    staysActiveInBackground:true,
    progressUpdateIntervalMillis:1000
})
const tempList = {
    base2base:require('../../music/base2base.mp3'),
    evans:require('../../music/Evans.mp3'),
    flower:require('../../music/Flower.mp3'),
    heavenlymoon:require('../../music/heavenlyMoon.mp3'),
    nightbird:require('../../music/nightbird.mp3'),
    polaris:require('../../music/Polaris.mp3')
}

const playOption = {
    option: SHUFFLE
}
const initialState = {
    showPlaybar:false,
    oldPlayinfo:{soundObject:new Audio.Sound()},
    newPlayinfo:{},
    isPlaying: 0,
    oldTime:{},
    newTime:{},
    playOption: playOption
}

const onOldPlaybackStatusUpdate = playbackStatus =>{
    if (!playbackStatus.isLoaded) {
    //
      if (playbackStatus.error) {
        console.warn(`Encountered a fatal error during playback: ${playbackStatus.error}`);
      }
    } else if(playbackStatus.didJustFinish){
        switch(playOption.option){
            case SHUFFLE:
                store.dispatch(next({infoNumber:1 }))
                break;
            case REPEAT:
                store.dispatch(jump({infoNumber:1, ms:0}))
                break
            case SEQUENTE:
                store.dispatch(next({infoNumber:1 }))
        }

    }else if (playbackStatus.isPlaying){
        store.dispatch(oldtiming({ms:playbackStatus.positionMillis, duration:playbackStatus.durationMillis}))
    }
}

const onNewPlaybackStatusUpdate = playbackStatus =>{
    if (!playbackStatus.isLoaded) {
    //
      if (playbackStatus.error) {
        console.warn(`Encountered a fatal error during playback: ${playbackStatus.error}`);
      }
    } else if(playbackStatus.didJustFinish){
        switch(playOption.option){
            case SHUFFLE:
                store.dispatch(next({infoNumber:2 }))
                break;
            case REPEAT:
                store.dispatch(jump({infoNumber:2, ms:0}))
                break
            case SEQUENTE:
                store.dispatch(next({infoNumber:2 }))

        }

    }else if (playbackStatus.isPlaying){
        store.dispatch(newtiming({ms:playbackStatus.positionMillis, duration:playbackStatus.durationMillis}))
    }
}


const loadAndPlay = async (playinfo, url, stopinfo) =>{
    if(stopinfo)
        await stopinfo.soundObject.pauseAsync()
    await playinfo.soundObject.unloadAsync()
    await playinfo.soundObject.loadAsync(tempList[url])
    await playinfo.soundObject.playAsync()
}

const stopAndPlay = async (playinfo, stopinfo) =>{
    if(stopinfo.soundObject)
        await stopinfo.soundObject.pauseAsync()
    await playinfo.soundObject.playAsync()
}

const stopAndReplay = async (playinfo, stopinfo) => {
    if(stopinfo.soundObject)
        await stopinfo.soundObject.pauseAsync()
    await playinfo.soundObject.replayAsync()
}

const createing = async(playinfo, index) =>{
    const url = playinfo.list[index].url
    try{
        const soundObject = new Audio.Sound()
        await soundObject.setOnPlaybackStatusUpdate(onNewPlaybackStatusUpdate)
        await soundObject.loadAsync(tempList[url])
        await soundObject.playAsync()
        playinfo.soundObject = soundObject
    }catch(e){ 
        console.warn('[Creating]',e)

    }

}

export default handleActions({
    [INITIALIZE]: (state, {payload})=>{
        const { title, list, _index } = payload
        const index = _index ? _index : 0
        if(state.isPlaying === 1)
            state.oldPlayinfo.soundObject.pauseAsync()
        if(state.isPlaying === 2)
            state.newPlayinfo.soundObject.unloadAsync()
        try{
            const playinfo = {title, index, list, soundObject:null}
            createing(playinfo, index)
            return {
                ...state,
                isPlaying:2,
                newPlayinfo: playinfo
            }
        }catch(e){
            console.warn('Initialize',e)
            return {
                ...state,
                isPlaying: 0,
                newPlayinfo:{ title, index, soundObject:null ,list }
            }
        }
    },
    [OLDTIMING]:(state, {payload}) =>{
        const {ms, duration} = payload
        return {
            ...state,
            oldTime: {ms, duration}
        }
    },
    [NEWTIMING]:(state,{payload})=>{
        const {ms, duration} = payload
        return {
            ...state,
            newTime: {ms, duration}
        }
    },
    [UPDATE]: (state) =>{
        const { newPlayinfo, oldPlayinfo, isPlaying } = state
        
        switch(isPlaying){
            case 2:
                newPlayinfo.soundObject.setOnPlaybackStatusUpdate(onOldPlaybackStatusUpdate)
                
                return {
                    ...state,
                    showPlaybar: true,
                    oldPlayinfo: newPlayinfo,
                    newPlayinfo: {},
                    newTime:{ms:0, duration:1},
                    isPlaying: 1
                }
            default: return {
                    ...state,
                    newPlayinfo:{},
                    newTime:{ms:0, duration:1}
                }
        }
    },

    [REPLAY]:( state )=>{
        const {isPlaying, oldPlayinfo, newPlayinfo} = state

        switch(isPlaying){
            case 1:
                stopAndReplay(oldPlayinfo, oldPlayinfo)
                break
            case 2:
                stopAndReplay(newPlayinfo, newPlayinfo)
                break
        }
        return state
        
    },

    [PAUSE]: (state, {payload})=>{
        const {newPlayinfo, oldPlayinfo } = state
        const { infoNumber } = payload
        if( infoNumber === 1 )
            oldPlayinfo.soundObject.pauseAsync()
        else if( infoNumber === 2)
            newPlayinfo.soundObject.pauseAsync()
            
        return {
            ...state,
            isPlaying: 0
        }
    },

    [CHANGE_OPTION]:(state, {payload})=>{
        const option = payload ? payload.option : undefined
        if(option && option >= 0 && option <4)
            return {...state, playOption:{option}}
        const playOption = (state.playOption.option + 1) % 3
        return {...state, playOption:{option: playOption}}
    },

    [RESUME]: ( state, {payload} )=>{
        const {newPlayinfo, oldPlayinfo, isPlaying} = state
        const { infoNumber } = payload
        if( infoNumber === 1 && isPlaying === 2)
            stopAndPlay(oldPlayinfo, newPlayinfo)
        else if( infoNumber === 2 && isPlaying ===1 )
            stopAndPlay(newPlayinfo, oldPlayinfo)
        else if( infoNumber === 1 && isPlaying === 0)
            oldPlayinfo.soundObject.playAsync()
        else if( infoNumber === 2 && isPlaying === 0)
            newPlayinfo.soundObject.playAsync()
        else
            return {...state, isPlaying: 0}
            
        return {
            ...state,
            isPlaying: infoNumber
        }
    },
    [ENDING]:(state)=>{
        const {oldPlayinfo, isPlaying} = state
        if(isPlaying === 1){
            oldPlayinfo.soundObject.unloadAsync()
            return {
                ...state,
                isPlaying: 0,
                showPlaybar: false,
                oldPlayinfo: {}
            }
        }else if(isPlaying === 2){
            if(oldPlayinfo.soundObject)
                oldPlayinfo.soundObject.unloadAsync()
            return {
                ...state,
                showPlaybar: false,
                oldPlayinfo: {}
            }
        }
    },
    [NEXT]: (state, {payload})=>{
        const { newPlayinfo, oldPlayinfo, isPlaying} = state
        const { infoNumber, index } = payload
        if(infoNumber === 1){
            var _index = index===undefined ?  oldPlayinfo.index + 1 : index - 1
            const limit = oldPlayinfo.list.length

            if( _index > limit)
                return state
            else if(_index === limit)
                _index = 0
            else if(index <= 0)
                _index = limit - 1


            if(isPlaying === 2)
                loadAndPlay(oldPlayinfo, oldPlayinfo.list[_index].url, newPlayinfo)
            else
                loadAndPlay(oldPlayinfo, oldPlayinfo.list[_index].url, null )

            return {
                ...state,
                isPlaying: infoNumber,
                oldPlayinfo: {...oldPlayinfo, index: _index}
            }
        }else{
            var _index = index===undefined ?  newPlayinfo.index + 1 : index - 1
            const limit = newPlayinfo.list.length
            
            if(_index > limit)
                return state
            else if(_index === limit)
                _index = 0
            else if(index <= 0)
                _index = limit - 1

            if(isPlaying === 1)
                loadAndPlay(newPlayinfo, newPlayinfo.list[_index].url, oldPlayinfo)
            else
                loadAndPlay(newPlayinfo, newPlayinfo.list[_index].url, null )
            return {
                ...state,
                isPlaying: infoNumber,
                newPlayinfo: {...newPlayinfo, index: _index}
            }
        }

    },

    [JUMP]: (state, {payload})=>{
        const {infoNumber, ms} = payload
        const {oldPlayinfo, newPlayinfo, isPlaying} = state
        if(infoNumber === 1){
            oldPlayinfo.soundObject.setStatusAsync({ positionMillis: ms })
            return {
                ...state,
                oldTime: {...state.oldTime, ms}
            }
        }
        else if(infoNumber === 2){
            newPlayinfo.soundObject.setStatusAsync({ positionMillis: ms })
            return {
                ...state,
                newTime: {...state.newTime, ms}
            }
        }
        
    },
}, initialState)