import React, {Component} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'

export default class MusicPlayList extends Component{
    render(){
        const { isPlaying, musiclist, handleOpenLyric, handleCloseLyric, totalHeight, isLogin, albumInfo, playingAlbumID, isLoaded } = this.props
        const {handleUpdate, handlePause, handleResume, handleNext} = this.props
        const nowIndex = this.props.index
        const musicItems = !musiclist ?
            (<Text> Blank </Text>):
            musiclist.map( item => {
                const {ID, index, title, lyric, lyricHeight, lyricLine} = item
                return (
                    <MusicItem
                        isLoaded={isLoaded}
                        musiclist={musiclist}
                        key={ID}
                        isLogin={isLogin}
                        index={index}
                        title={title}
                        lyric={lyric}
                        nowIndex={nowIndex}
                        lyricLine={lyricLine}
                        lyricHeight={lyricHeight}
                        handleOpenLyric={handleOpenLyric}
                        handleCloseLyric={handleCloseLyric}
                        handleUpdate={handleUpdate}
                        handleNext={handleNext}
                        handlePause={handlePause}
                        handleResume={handleResume}
                        albumInfo={albumInfo}
                        playingAlbumID={playingAlbumID}
                        isPlaying={isPlaying}
                        isCurrent={index === this.props.index && albumInfo.ID === playingAlbumID} />
                    )
            })
        
        const emptySet = ()=>{
            return (
                <Text style={{textAlign:'center', paddingTop:20, fontSize:20}}>
                    곡이 아직 없는 앨범입니다!
                </Text>)
        }
        return(
            <View style={[containerStyle.container], {height:totalHeight}}>
                { musiclist.length === 0? emptySet():musicItems }
            </View>
        )
    }
}
const containerStyle = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        backgroundColor:'#fff'
    }
})
const PlayButton = (index, isPlaying) =>{
    if(!isPlaying)
        return ( <Text style={itemStyle.indexText}> {index} </Text>)
    return (
        <Image style={itemStyle.indexImage}
            source={require('../icon/nowPlaying.png')}/>
    )
}
const MusicItem = (props)=>{
    const {isPlaying, isCurrent, isLogin, index, title, albumInfo, playingAlbumID, musiclist, nowIndex, isLoaded} = props
    const albumID=albumInfo.ID
    const {handleNext, handlePause, handleUpdate, handleResume} = props
    const lyricHeight = props.lyricHeight ? props.lyricHeight : 0
    return(
        <View style={[itemStyle.container,{height:(74+lyricHeight)}]}>

            <TouchableOpacity style={itemStyle.mainContainer}
                onPress={()=>{
                    if(!isLoaded&&isPlaying)
                        return
                    else if(playingAlbumID!==albumID)
                        return handleUpdate({albumID, index, list:musiclist, info:albumInfo.ID===0?null:albumInfo})
                    else if(nowIndex !== index)
                        return handleNext({index})
                    else if(isPlaying===false){
                        return handleResume()}
                    else{
                        return handlePause()}
                }}>
                <View style={itemStyle.indexContainer}>
                    {PlayButton(index, isCurrent)}
                </View>
                <View style={itemStyle.titleContainer}>
                    <Text style={isCurrent?itemStyle.chooseTitle:itemStyle.title}>
                        {title}
                    </Text>
                    <Text style={itemStyle.artist}>
                        Artist name
                    </Text>
                </View>
                <View style={itemStyle.openButtonContainer}>
                    <TouchableOpacity style={itemStyle.openButton}
                        onPress={()=>{
                            if(props.lyricHeight)
                                props.handleCloseLyric(props.index-1)
                            else
                                props.handleOpenLyric(props.index-1)
                        }}>
                        <Image style={itemStyle.openButtonImage} source={require('../icon/lyric.png')}/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            <View style={[itemStyle.lyricContainer, {height:lyricHeight,borderTopColor:'#EAE8E8', borderTopWidth:lyricHeight===0?0:1,}]}>
                <Text style={[itemStyle.lyric, {display: lyricHeight===0?'none':'flex'}]}
                    numberOfLines={props.lyricLine}>
                    {props.lyric}
                </Text>
            </View>
            <View style={itemStyle.bottomPadding} />
        </View>
    )
}

const itemStyle = StyleSheet.create({
    container:{
        width:'100%',
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:'#fff'
    },
    mainContainer:{
        flexDirection:'row',
        flex:1,
    },
    indexContainer:{
        height:'100%',
        width:30,
        justifyContent:'center',
        alignItems:'center'
    },
    indexText:{
        color:'#121111',
        fontSize:15,
        color:'#767171',
        textAlign:'center'
    },
    indexImage:{
        width:'50%',
        height:'50%',
        resizeMode:'contain'
    },
    titleContainer:{
        height:'100%',
        flex:1,
        paddingLeft:10,
        justifyContent:'center'
    },
    title:{
        fontSize:16,
        color:'#121111'
    },
    artist:{
        fontSize:14,
        color:'#767171',
        marginTop:1
    },
    chooseTitle:{
        fontSize:16,
        color:'#121111',
        fontWeight:'900'
    },
    openButtonContainer:{
        height:20,
        width:20,
        alignSelf:'center'
    },
    openButton:{
        width:'100%',
        height:'100%'
    },
    openButtonImage:{
        width:'100%',
        height:'100%',
        resizeMode:'contain'
    },

    lyricContainer:{
        width:'80%',
        justifyContent:"center",
    },
    lyric:{
        fontSize:13,
        textAlign:'center',
        lineHeight:20
    },
    topPaddingContainer:{
        width:'100%',
        height:1,
    },
    topPadding:{
        width:'100%',
        height:0,
        borderBottomColor:'#EAE8E8',
        borderBottomWidth:0.8
    },
    bottomPadding:{
        width:'100%',
        height:1,
        borderBottomColor:'#EAE8E8',
        borderBottomWidth:0.8
    }
})