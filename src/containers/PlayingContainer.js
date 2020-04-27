import React, {Component} from 'react'
import { View, TouchableOpacity, StyleSheet, Text, Image, ScrollView, Dimensions, PixelRatio, Animated } from 'react-native'

import MusicPlayList from '../components/MusicPlayList'
import PlayingControler from '../components/PlayingControler'
import deviceCheck from '../deviceCheck'
import { AudioActions } from '../store/actionCreator'
const {height, width} = Dimensions.get('window')
const minibarSize = deviceCheck.ifTopbarless?100:60
const minibarPos = deviceCheck.ifTopbarless?height-180: height-60

export default class PlayingContainer extends Component {
    constructor(props){
        super(props)
        const { playlist, isLoaded, albumInfo } = props
        const length = playlist ? playlist.length*74 : 0
        this.state = {musicPlaylist:playlist, totalHeight:length, albumID:albumInfo.ID}
    }
    componentDidUpdate(){
        if( !this.props.isUpdated || this.props.albumInfo.ID !== this.state.albumID){
            console.warn('Playing Container 업데이트')
            this.updateList()
            AudioActions.turnToLoad()
        }
    }
    updateList = ()=>{
        const {playlist, albumInfo} = this.props
        if(!playlist)
            return;
        this.setState({
            musicPlaylist:playlist,
            totalHeight:playlist.length * 74,
            albumID:albumInfo.ID
        })
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
            return;
        const newList = [...musicPlaylist]
        const length = musicPlaylist[index].lyricHeight
        newList[index].lyricHeight = 0

        this.setState({
            musicPlaylist: newList,
            totalHeight: totalHeight - length
        })
    }
    handleOpenMinibar = ()=>{
        Animated.timing(this.translatedY, {
            toValue: minibarPos,
            duration: 400
        }).start()
    }
    handleCloseMinibar = ()=>{
        Animated.timing(this.translatedY, {
            toValue: height,
            duration: 200
        }).start()
    }
    getAlbumArt = (title, artist) =>{
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
                </View>
            </View>)
    }
    // TODO: 구형 iphone 세팅
    translatedY = new Animated.Value(minibarPos)

    render(){
        const {handleOpenLyric, handleCloseLyric} = this
        const {musicPlaylist, totalHeight} = this.state
        const { playlist, isLoaded, albumInfo, isPlaying, index, isLogin, handleChangeOption, handlePause, handleResume, handleNext, handleUpdate, playOption  } = this.props        
        const title = playlist[index] ? playlist[index].title : 'none'

        return (
            <View style={styles.container}>
                <ScrollView style={styles.scroll}
                    onScrollBeginDrag={this.handleCloseMinibar}
                    onScrollEndDrag={this.handleOpenMinibar} >

                    {this.getAlbumArt(title) }
                    <View style={styles.paddingContainer}>
                        <View style={styles.paddingTitleContainer}>
                            <Text style={styles.albumText}>
                                {(albumInfo.title?albumInfo.title:'none' )+ ' >'}
                            </Text>
                            <Text style={styles.paddingText}>Song List</Text>
                        </View>
                        <View style={styles.optionContainer}>
                            <TouchableOpacity style={[styles.optionButtonContainer, {backgroundColor:playOption.option===0?'red':'#fff'}]}
                                onPress={()=>{handleChangeOption({option:0})}}
                            >
        
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.optionButtonContainer, {backgroundColor:playOption.option===1?'red':'#fff'}]}
                                onPress={()=>{handleChangeOption({option:1})}}
                                >

                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.optionButtonContainer, {backgroundColor:playOption.option===2?'red':'#fff'}]}
                                onPress={()=>{handleChangeOption({option:2})}}
                            >

                            </TouchableOpacity>
                        </View>
                    </View>
                    <MusicPlayList
                        isLogin={isLogin}
                        musiclist={musicPlaylist}
                        albumInfo={albumInfo}
                        playingAlbumID={albumInfo.ID}
                        index={index+1}
                        totalHeight={totalHeight}
                        handleOpenLyric={handleOpenLyric}
                        handleCloseLyric={handleCloseLyric}
                        handleNext={handleNext}
                        handleResume={handleResume}
                        handlePause={handlePause}
                        handleUpdate={handleUpdate}
                        isPlaying={isPlaying}
                        isLoaded={isLoaded}
                    />
                    <View style={{width:'100%',height:40}}/>
                </ScrollView>
                <Animated.View
                    style={[styles.minibarContainer, {transform: [{translateY: this.translatedY}]}]}>
                    <View style={{height:60, width:'100%', flexDirection:'row'}}>
                        <TouchableOpacity style={styles.minibarImageContainer}
                            onPress={()=>{handleNext({index})}}>
                            <Image style={styles.minibarImage}
                                source={require('../icon/previous.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.minibarImageContainer}
                            onPress={()=>{handlePause()}}>
                            <Image style={styles.minibarImage}
                                source={require('../icon/pause.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.minibarImageContainer}
                            onPress={()=>{handleNext({})}}>
                            <Image style={styles.minibarImage}
                                source={require('../icon/next.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        flex:1,
        backgroundColor:'#fafafa',
        alignItems: 'center',
        paddingLeft:20,
        paddingRight:20
    },
    scroll:{
        width:'100%',
        height:'100%'
    },
    playbarContainer:{
        height:140,
        width:'100%',
    },

    // ALBUM ART
    albumContainer:{
        height:width*0.3,
        width:'100%',
        flexDirection:'row'
    },
    albumArtContainer:{
        width:width*0.3,
        height:width*0.3,
        alignItems: 'center',
        justifyContent: 'center'
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
        paddingLeft:20
    },
    artist:{
        fontSize:13,
        color:'#767171'
    },
    title:{
        fontSize:18,
        fontWeight:'700'
    },

    paddingContainer:{
        width:'100%',
        height:60,
        flexDirection:'row',
    },
    paddingTitleContainer:{
        flex:3,
        justifyContent:'center'
    },
    albumText:{
        color:'#121111',
        fontSize:13
    },
    paddingText:{
        color:'#121111',
        fontSize:13
    },
    optionContainer:{
        flex:2,
        flexDirection:'row'
    },
    optionButtonContainer:{
        flex:1,
        borderColor:'#000',
        borderWidth:1
    },
    minibarContainer:{
        position:'absolute',
        paddingLeft:'20%',
        paddingRight:'20%',
        width:width,
        height:minibarSize,
        flexDirection:'row',
        alignItems:'center'
    },
    minibarImageContainer:{
        flex:1,
        height:'70%'
    },
    minibarImage:{
        resizeMode:'contain',
        flex:1
    }
})