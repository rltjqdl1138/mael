import React, {Component} from 'react'
import { View, TouchableOpacity, StyleSheet, Text, Image, ScrollView, Dimensions } from 'react-native'
import {connect} from 'react-redux'

import MusicPlayList from '../components/MusicPlayList'
import AlbumControler from '../components/AlbumControler'
const {height, width} = Dimensions.get('window')


const shapeofyou = `The club isn't the best place to find a lover
So the bar is where I go
Me and my friends at the table doing shots
Drinking fast and then we talk slow
Come over and start up a conversation with just me
And trust me I'll give it a chance now
Take my hand, stop, put Van the Man on the jukebox
And then we start to dance, and now I'm singing like
Girl, you know I want your love
Your love was handmade for somebody like me
Come on now, follow my lead
I may be crazy, don't mind me
Say, boy, let's not talk too much
Grab on my waist and put that body on me
Come on now, follow my lead
Come, come on now, follow my lead
I'm in love with the shape of you
We push and pull like a magnet do
Although my heart is falling too
I'm in love with your body
And last night you were in my room
And now my bedsheets smell like you
Every day discovering something brand new`

const faded = `You were the shadow to my light
Did you feel us
Another start
You fade away
Afraid our aim is out of sight
Wanna see us
Alive
Where are you now
Where are you now
Where are you now
Was it all in my fantasy
Where are you now
Were you only imaginary
Where are you now
Atlantis
Under the sea
Under the sea
Where are you now
Another dream
The monsters running wild inside of me
I'm faded
I'm faded
So lost
I'm faded
I'm faded
So lost
I'm faded
These shallow waters, never met
What I needed
I'm letting go
A deeper dive
Eternal silence of the sea
I'm breathing
Alive
Where are you now
Where are you now
Under the bright
But…`


const lists = [
    {
        index:1,
        title:'Base 2 Base',
        lyric:faded,
        lyricLine:38,
        lyricHeight:0,
        url:'base2base'
    },
    {
        index:2,
        title:'Evans',
        lyric:shapeofyou,
        lyricLine:20,
        lyricHeight:0,
        url:'evans'
    },
    {
        index:3,
        title:'Flower',
        lyric:'Tree Under Stars 가사',
        lyricLine:1,
        lyricHeight:0,
        url:'flower'
    },
    {
        index:4,
        title:'Heavenly Moon',
        lyric:'Say Your Feelings 가사',
        lyricLine:1,
        lyricHeight:0,
        url:'heavenlymoon'
    },

    {
        index:5,
        title:'Far ease Nightbird',
        lyric:'Jungle Hunters 가사',
        lyricLine:1,
        lyricHeight:0,
        url:'nightbird'
    },

    {
        index:6,
        title:'Polaris',
        lyric:'We are Family 가사',
        lyricLine:1,
        lyricHeight:0,
        url:'polaris'
    }
]
export default class AlbumContainer extends Component{
    render(){
        return <Album_Container title={this.props.config.title}/>
    }
}
class album_Container extends Component {
    constructor(props){
        super(props)
        if(props.list)
            this.state = {musicPlaylist: props.list, totalHeight: props.list.length*74}
        else
            this.state = {musicPlaylist:lists, totalHeight:lists.length*74}
    }
    handleOpenLyric = (index)=>{
        const {musicPlaylist, totalHeight} = this.state
        if( index > musicPlaylist.length || index < 0)
            return
        const newList = [...musicPlaylist]
        const length = newList[index].lyricLine*20 + 42
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
    getTime = () =>{
        const {newTime} = this.props
        if(newTime && newTime.ms)
            return newTime.ms
        return 0
    }
    getAlbumArt = (title) =>{
        if(title === 'MyPlaylist')
            return(<View style={styles.titleContainer}>
                <Text style={styles.title}>
                    MyPlaylist
                </Text>
            </View>)
        return (
            <View>
                <View style={styles.albumArtContainer}>
                    <Image style={styles.circle}
                        source={require('../image/circle.jpg')}
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
            </View>)
    }
    render(){
        const {handleOpenLyric, handleCloseLyric} = this
        const {musicPlaylist, totalHeight} = this.state

        const { isPlaying, playinfo, newTime, title } = this.props
        const { list, index } = playinfo
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.playbarContainer}>
                        <AlbumControler 
                            title={title}
                            list={musicPlaylist}
                            getTime={this.getTime}
                            index={index}
                        />
                    </View>
                    {this.getAlbumArt(title)}
                    
                    <MusicPlayList
                        musiclist={musicPlaylist}
                        index={index}
                        totalHeight={totalHeight}
                        handleOpenLyric={handleOpenLyric}
                        handleCloseLyric={handleCloseLyric}
                    />
                </ScrollView>
            </View>
        )
    }
}




export const Album_Container = connect(
    ({audio})  =>({
        playinfo: audio.newPlayinfo,
        isPlaying: audio.isPlaying,
        newTime: audio.newTime
    })
  )(album_Container)

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
        height:120,
        width:'100%',
        backgroundColor:'#fff'
    },

    // ALBUM ART
    albumContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        height:width*0.7,
        backgroundColor:'#fff',
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
