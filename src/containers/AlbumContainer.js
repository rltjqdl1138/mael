import React, {Component} from 'react'
import { View, TouchableOpacity, StyleSheet, Text, Image, ScrollView, Dimensions } from 'react-native'
import {connect} from 'react-redux'
import networkHandler from '../networkHandler'
import CacheManager from '../CacheManager'
import {AudioActions, MyPlaylistActions} from '../store/actionCreator'
import MusicPlayList from '../components/MusicPlayList'
const {height, width} = Dimensions.get('window')
export default class AlbumContainer extends Component{
    render(){
        return <Album_Container title={this.props.config.title} albumID={this.props.config.albumID}/>
    }
}
class album_Container extends Component {
    constructor(props){
        super(props)
        this.state = {musicPlaylist: [], totalHeight: 60, albumInfo:{}}
    }
    handleAddPlaylist(items){
        const {myPlaylist} = this.props
        const itemlist = items.map((item,index)=>{
            const albumTitle = this.state.albumInfo ? this.state.albumInfo.title : undefined
            const checkOverlap = (element) => element.ID === item.ID
            const isOverlap = myPlaylist.findIndex(checkOverlap)
            if(isOverlap < 0)
                return {...item, index:myPlaylist.length+index+1, albumTitle}
            return {...item, ID:Date.now() + ':' +item.ID, index:myPlaylist.length+index+1,
                albumTitle}
        })
        const result = [...myPlaylist, ...itemlist]
        MyPlaylistActions.update({list:result})
        if(this.props.playingAlbumID===0)
            AudioActions.update({albumID:0, list:result, index:this.props.index})
    }
    componentDidMount(){
        const {albumID} = this.props;
        (async()=>{
            const data = await networkHandler.music.getMusicList(albumID)
            if(!data || !data.musics || !data.album)
                console.warn(data)
            else{
                this.setState(state=>({
                    ...state,
                    albumInfo: data.album,
                    musicPlaylist: data.musics,
                    totalHeight: data.musics.length*74 + 60 }))
                }
                data.musics.map( async (item) => {
                    if(!item.uri) return;
                    return await CacheManager.music.getMusicFromCache(item.uri)
                })
        })()

    }
    handleOpenLyric = (index)=>{
        const {musicPlaylist} = this.state
        if( index > musicPlaylist.length || index < 0)
            return
        const newList = [...musicPlaylist]
        const length = newList[index].lyricLine*21 + 42
        newList[index].lyricHeight = length
        this.setState(state=>({
            ...state,
            musicPlaylist: newList,
            totalHeight:state.totalHeight + length
        }))
    }
    handleCloseLyric = (index)=>{
        const {musicPlaylist, totalHeight} = this.state
        if( index > musicPlaylist.length || index < 0)
            return
        const newList = [...musicPlaylist]
        const length = musicPlaylist[index].lyricHeight
        newList[index].lyricHeight = 0

        this.setState(state=>({
            ...state,
            musicPlaylist: newList,
            totalHeight: totalHeight - length
        }))
    }
    getAlbumArt = (title,) =>{
        return (
            <View style={styles.albumContainer}>
                <View style={styles.albumArtContainer}>
                    <Image style={styles.circle}
                        source={require('../image/circle.jpg')}
                    />
                    <Image style={styles.albumArt}
                        source={require('../image/owl2.jpg')}
                    />
                </View>
                <View style={styles.titleContainer}>
                        
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <Text style={styles.artist}>
                        Artist name here
                    </Text>
                    <TouchableOpacity style={{flex:1}}
                        onPress={()=>{this.handleAddPlaylist(this.state.musicPlaylist); alert('리스트에 추가되었습니다') }}
                        >
                        <Image style={{width:50,height:50,resizeMode:'contain', alignSelf:'flex-end'}}
                            source={require('../icon/add.png')} />
                    </TouchableOpacity>
                </View>
                
            </View>)
    }
    render(){
        const {handleOpenLyric, handleCloseLyric} = this
        const {musicPlaylist, totalHeight, albumInfo} = this.state
        const { title, isLogin, index, albumID, playingAlbumID, isPlaying, isLoaded } = this.props
        const isDisabled = playingAlbumID === albumID
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scroll}
                    showsHorizontalScrollIndicator={false}>
                    {this.getAlbumArt(title)}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.playButtonContainer,{opacity:isDisabled?0.5:1}]}
                            disabled={isDisabled}
                            onPress={()=>{
                                AudioActions.update({albumID, index:1, list:musicPlaylist, info:albumInfo}) }}>
                            <Image source={require('../icon/playbutton.png')}
                                style={styles.playButton}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shffleButtonContainer}
                            onPress={()=>{
                                AudioActions.pause()
                            }}
                            >
                            <Image source={require('../icon/shufflebutton.png')}
                                style={styles.shffleButton}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.paddingContainer}>
                        <Text style={styles.paddingText}>Song List</Text>
                    </View>
                    <MusicPlayList
                        isLogin={isLogin}
                        musiclist={musicPlaylist}
                        albumInfo={albumInfo}
                        playingAlbumID={playingAlbumID}
                        index={index+1}
                        totalHeight={totalHeight}
                        handleOpenLyric={handleOpenLyric}
                        handleCloseLyric={handleCloseLyric}
                        handleNext={AudioActions.next}
                        handleResume={AudioActions.resume}
                        handlePause={AudioActions.pause}
                        handleUpdate={AudioActions.update}
                        isPlaying={isPlaying}

                        isLoaded={isLoaded}
                    />
                </ScrollView>
            </View>
        )
    }
}




export const Album_Container = connect(
    ({audio, authentication, myPlaylist})  =>({
        isPlaying: audio.isPlaying,
        playingAlbumID: audio.albumID,
        index: audio.index,
        isLogin: authentication.isLogin,
        token: authentication.token,
        isLoaded: audio.isLoaded,
        myPlaylist: myPlaylist.list
    })
  )(album_Container)

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#fff',
        alignItems: 'center',
        paddingLeft:20,
        paddingRight:20
    },
    scroll:{
        width:'100%',
        height:'100%'
    },

    // ALBUM ART
    albumContainer:{
        height:width*0.5,
        backgroundColor:'#fff',
        width:'100%',
        flexDirection:'row'
    },
    albumArtContainer:{
        width:width*0.5,
        height:width*0.5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight:20,
        paddingTop:20
    },
    circle:{
        position:'absolute',
        width:'100%',
        height:'100%',
        resizeMode:'contain',
        borderColor:'black',
        borderWidth:1,
    },
    albumArt:{
        position:'absolute',
        width:'50%',
        height:'50%',
        resizeMode:'contain',
    },

    // TITLE
    titleContainer:{
        flex:1,
        paddingTop:20,
        paddingBottom:20,
        paddingLeft:10
    },
    artist:{
        fontSize:13,
        color:'#767171'
    },
    title:{
        fontSize:18,
        fontWeight:'600'
    },
    buttonContainer:{
        height:width/6,
        width:'100%',
        flexDirection:'row',
        justifyContent:'center'
    },
    playButtonContainer:{
        flex:1,
        paddingLeft:20,
        paddingRight:10
    },
    shffleButtonContainer:{
        flex:1,
        paddingRight:20,
        paddingLeft:10
    },
    playButton:{
        height:'100%',
        width:'100%',
        resizeMode:'contain'
    },
    shffleButton:{
        height:'100%',
        width:'100%',
        resizeMode:'contain'

    },
    paddingContainer:{
        padding:10,
        height:40
    },
    paddingText:{
        fontWeight:'normal',
        color:'#121111',
        //color:'#767171'
    }
})
