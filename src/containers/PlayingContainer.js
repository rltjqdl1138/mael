import React, {Component} from 'react'
import { View, TouchableOpacity, StyleSheet, Text, Image, ScrollView, Dimensions, PixelRatio } from 'react-native'

import MusicPlayList from '../components/MusicPlayList'
import PlayingControler from '../components/PlayingControler'
const {height, width} = Dimensions.get('window')

export default class PlayingContainer extends Component {
    constructor(props){
        super(props)
        const { playinfo } = props
        const length = playinfo.list ? playinfo.list.length*74 : 0
        this.state = {musicPlaylist:playinfo.list, totalHeight:length}
    }
    handleOpenLyric = (index)=>{
        const {musicPlaylist, totalHeight} = this.state
        if( index > musicPlaylist.length || index < 0)
            return 0
        const newList = [...musicPlaylist]
        const length = newList[index].lyricLine * 20 * PixelRatio.getFontScale() + 42
        newList[index].lyricHeight = length
        this.setState({
            musicPlaylist: newList,
            totalHeight:totalHeight + length
        })
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
    render(){
        const {handleOpenLyric, handleCloseLyric} = this
        const {musicPlaylist, totalHeight} = this.state

        const { isPlaying, playinfo, index, getTime  } = this.props
        const { list } = playinfo
        const { title } = list ? list[index] : 'none'

        return (
            <View style={styles.container}>
                <View style={styles.playbarContainer}>
                    <PlayingControler 
                            list={musicPlaylist}
                            getTime={getTime}
                            index={index} />
                </View>
                <ScrollView style={styles.scroll}>
                    <View style={styles.albumContainer}>
                        <View style={styles.albumArtContainer}>
                            <Image style={styles.circle}
                                source={require('../image/circle2.jpg')}
                            />
                            <Image style={styles.albumArt}
                                source={require('../image/owl2.jpg')}
                            />
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.info}>
                                Mostly Series > Mostly Animals
                            </Text>
                            <Text style={styles.title}>
                                {title}
                            </Text>
                        </View>
                    </View>
                    <MusicPlayList
                        musiclist={musicPlaylist}
                        index={index}
                        totalHeight={totalHeight}
                        handleOpenLyric={handleOpenLyric}
                        handleCloseLyric={handleCloseLyric}
                    />
                    <View style={{width:'100%',height:40}}/>
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
    playbarContainer:{
        height:height*0.15,
        width:'100%',
        backgroundColor:'#fff',
        borderColor:'#f00',
        borderWidth:1
    },

    // ALBUM ART
    albumContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        height:width*0.7,
        backgroundColor:'#c0c0c0',
        width:'100%',
    },
    albumArtContainer:{
        width:'100%',
        height:width*0.45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle:{
        position:'absolute',
        width:'100%',
        height:'100%',
        resizeMode:'contain'
    },
    albumArt:{
        position:'absolute',
        width:'50%',
        height:'50%',
        resizeMode:'contain',
    },

    // TITLE
    titleContainer:{
        width:'100%',
        height:80,
        alignContent:'center',
        justifyContent:'center'
    },
    info:{
        textAlign:'center',
        fontSize:12,
        color:'#767171'
        
    },
    title:{
        textAlign:'center',
        fontSize:20
    },

})