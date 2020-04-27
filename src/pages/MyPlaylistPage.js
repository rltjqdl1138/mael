import React, {Component} from 'react'
import {connect} from 'react-redux'
import { View, TouchableOpacity, StyleSheet, Text, Image, ScrollView, Dimensions } from 'react-native'
import { MyPlaylistActions, AudioActions } from '../store/actionCreator'


import MyPlaylistLyric from '../components/MyPlaylistLyric'
const {height, width} = Dimensions.get('window')

export default class MyPlaylist extends Component{
    render(){
        return ( <MyPlaylistPage /> )
    }
}

class myPlaylistPage extends Component{
    constructor(props){
        super(props)
        this.state = {musicPlaylist: props.list, totalHeight: props.list.length*74 + 60 }
    }
    componentDidUpdate(){
        if(!this.props.isLoaded){
            const {list} = this.props
            if(!list)
                return;
            this.setState({
                musicPlaylist:list,
                totalHeight:list.length * 74
            }, MyPlaylistActions.turnToLoad  )
        }
    }
    handleOpenLyric = (index)=>{
        const {musicPlaylist} = this.state
        if( index > musicPlaylist.length || index < 0)
            return
        const newList = [...musicPlaylist]
        const length = newList[index].lyricLine*21 + 42
        newList[index].lyricHeight = length
        this.setState(state=>({
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

        this.setState({
            musicPlaylist: newList,
            totalHeight: totalHeight - length
        })
    }
    handleDeleteItem = (index)=>{
        const {musicPlaylist} = this.state
        const backsideList = musicPlaylist.slice(index+1, musicPlaylist.length).map(item=>{
            return {...item, index:item.index-1}
        })
        const result = [
            ...musicPlaylist.slice(0,index),
            ...backsideList
        ]
        MyPlaylistActions.update({list:result})
        if(this.props.playingAlbumID===0)
            AudioActions.update({albumID:0, list:result, index})
    }
    getAlbumArt = (title,artist) =>{
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
                        {artist?artist:'No name'}
                    </Text>
                </View>
            </View>)
    }
    render(){
        const {handleOpenLyric, handleCloseLyric} = this
        const {musicPlaylist, totalHeight, albumInfo} = this.state
        const { isLoaded, playingAlbumID, isLogin, index, isPlaying, isMusicLoaded } = this.props
        const isDisabled = playingAlbumID === 0
        const title='My Playlist'
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scroll}
                    showsHorizontalScrollIndicator={false}>
                    {this.getAlbumArt(title)}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.playButtonContainer,{opacity:isDisabled?0.5:1}]}
                            disabled={isDisabled}
                            onPress={()=>{
                                AudioActions.update({ albumID:0, index:1, list:musicPlaylist}) }}>
                            <Image source={require('../icon/playbutton.png')}
                                style={styles.playButton}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shffleButtonContainer}
                            onPress={()=>{
                                // TODO: config
                                 AudioActions.pause()
                            }}>
                            <Image source={require('../icon/shufflebutton.png')}
                                style={styles.shffleButton}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.paddingContainer}>
                        <Text style={styles.paddingText}>Song List</Text>
                    </View>
                    <MyPlaylistLyric
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
                        handleDeleteItem={this.handleDeleteItem}
                        isMusicLoaded={isMusicLoaded}
                    />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#fff',
        alignItems: 'center',
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
        flexDirection:'row',
        paddingLeft:20,
        paddingRight:20
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
        justifyContent:'center',
        paddingLeft:20,
        paddingRight:20
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
        height:40,
        paddingLeft:30,
        paddingRight:20
    },
    paddingText:{
        fontWeight:'normal',
        color:'#121111',
        //color:'#767171'
    }
})

const MyPlaylistPage = connect(
    ({myPlaylist, audio, authentication})  =>({
        list: myPlaylist.list,
        isLoaded: myPlaylist.isLoaded,
        isMusicLoaded: audio.isLoaded,
        isPlaying: audio.isPlaying,
        playingAlbumID: audio.albumID,
        index: audio.index,
        isLogin: authentication.isLogin,
        token: authentication.token,
    })
)(myPlaylistPage)


