import * as FileSystem from 'expo-file-system'
import { AsyncStorage } from 'react-native';
import networkHandler from './networkHandler'

const getMusicFromCache = async(uri) =>{
    const fileUri = FileSystem.cacheDirectory + uri +'.mp3'
    const CacheTable = await _getCacheTable()
    const file = await FileSystem.getInfoAsync(fileUri)
    if(file && file.exists){
        if(!CacheTable[uri])
            _appendNewItem({uri, fileUri})
        return {uri:file.uri,status:'old'}
    }
    const remoteUri = networkHandler.url + '/music/' + uri
    const downloadFile = await FileSystem.downloadAsync(remoteUri, fileUri)
    if(downloadFile.status === 200 || downloadFile.status === 201){
        _appendNewItem({uri, fileUri})
        return {uri:downloadFile.uri, status:'new'}
    }
    return {status:'fail'}
}

exports.music = {
    getMusicFromCache,
}

const _getCacheTable = async() =>{
    const value = await AsyncStorage.getItem('CACHE_TABLE@MUSIC')
    return JSON.parse(value)
}
const _appendNewItem = async({uri, fileUri}) =>{
    const data = {fileUri, date:Date.now()}
    const value = await _getCacheTable('MUSIC')
    if(value !== null){
        await AsyncStorage.mergeItem('CACHE_TABLE@MUSIC',JSON.stringify({[uri]:data}))
    }else{
        await AsyncStorage.setItem('CACHE_TABLE@MUSIC',JSON.stringify({[uri]:data}))
    }
    console.warn('success')

}
