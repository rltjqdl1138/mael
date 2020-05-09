import React, {Component, useRef} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, Animated, PanResponder, Dimensions } from 'react-native'
import { MyPlaylistActions } from '../store/actionCreator'
import myPlaylist from '../store/modules/myPlaylist';

const screenWidth = Dimensions.get("window").width;
const BOX_POS = screenWidth - 150
const BOX_SIZE = 120
export default class MusicPlayList extends Component{
    render(){
        const { isPlaying, musiclist, handleOpenLyric, handleCloseLyric, totalHeight, isLogin, playingAlbumID, isLoaded, isMusicLoaded } = this.props
        const {handleUpdate, handlePause, handleResume, handleNext} = this.props
        const { handleDeleteItem } = this.props
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
                        playingAlbumID={playingAlbumID}
                        isPlaying={isPlaying}
                        isCurrent={index === this.props.index && 0 === playingAlbumID}
                        handleDeleteItem={handleDeleteItem}
                        isMusicLoaded={isMusicLoaded}
                        />
                    )
            })
        
        const emptySet = ()=>{
            return (
                <Text style={{textAlign:'center', paddingTop:20, fontSize:20}}>
                    곡이 아직 없습니다!
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
class MusicItem extends Component{
    
    isOpen = false
    translateX = new Animated.Value(screenWidth);
    _panResponder = PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderMove: (e, {dx})=>{
            if(this.isOpen){
                if(dx < -70) return true
                this.translateX.setValue(dx+BOX_POS)
            }
            else{

                if(dx < -170) return true
                this.translateX.setValue(dx+screenWidth)
            }
        },
    
        onPanResponderRelease: (e, {vx, dx}) => {

            if(this.isOpen){
                if ( vx >= 0.2 || dx >= 0.2 * screenWidth) {
                    Animated.timing(this.translateX, {
                        toValue: screenWidth,
                        duration: 200
                    }).start(this.props.onDismiss);
                    this.isOpen = false
                }else{
                    Animated.spring(this.translateX, {
                        toValue: BOX_POS,
                        bounciness: 10
                    }).start();
                }

            }else if ( vx <= -0.5 || dx <= -0.2 * screenWidth) {
                    Animated.timing(this.translateX, {
                        toValue: BOX_POS,
                        duration: 200
                    }).start(this.props.onDismiss);

                    this.isOpen = true
            }else {
                Animated.spring(this.translateX, {
                    toValue: screenWidth,
                    bounciness:10
                }).start(this.props.onDismiss);
            }
        },
        onPanResponderTerminate: (e, {vx, dx}) =>{
            if(this.isOpen){
                if ( vx >= 0.2 && dx >= 0.2 * screenWidth) {
                    Animated.timing(this.translateX, {
                        toValue: screenWidth,
                        duration: 200
                    }).start(this.props.onDismiss);
                    this.isOpen = false
                }else{
                    Animated.spring(this.translateX, {
                        toValue: BOX_POS,
                        bounciness: 10
                    }).start();
                }

            }else if ( vx <= -0.5 && dx <= -0.2 * screenWidth) {
                    Animated.timing(this.translateX, {
                        toValue: BOX_POS,
                        duration: 200
                    }).start(this.props.onDismiss);

                    this.isOpen = true
            }else {
                Animated.spring(this.translateX, {
                    toValue: screenWidth,
                    bounciness:10
                }).start(this.props.onDismiss);
            }
        }
    });

    render(){
        //transform: [{translateX: this.translateX}]

        const {isPlaying, isCurrent, isLogin, index, title, playingAlbumID, musiclist, nowIndex, isLoaded, isMusicLoaded} = this.props
        const albumID=0
        const {handleNext, handlePause, handleUpdate, handleResume} = this.props
        const {handleDeleteItem} = this.props
        const lyricHeight = this.props.lyricHeight ? this.props.lyricHeight : 0
        
        return(
            <View style={[itemStyle.container,{height:(74+lyricHeight)}]}
                {...this._panResponder.panHandlers}>

                <View style={itemStyle.topPaddingContainer}>
                    <View style={itemStyle.topPadding} />
                </View>
                <TouchableOpacity style={itemStyle.mainContainer}
                    onPress={()=>{
                        if(this.isOpen){
                            this.isOpen = false
                            return Animated.timing(this.translateX, {
                                toValue: screenWidth,
                                duration: 200
                            }).start(this.props.onDismiss);
                        }
                        else if(!isMusicLoaded&&isPlaying)
                            return;
                        else if(playingAlbumID!==albumID)
                            return handleUpdate({albumID, index, list:musiclist })
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
                    </View>
                    <View style={itemStyle.openButtonContainer}>
                        <TouchableOpacity style={itemStyle.openButton}
                            onPress={()=>{
                                if(this.props.lyricHeight)
                                    this.props.handleCloseLyric(this.props.index-1)
                                else
                                    this.props.handleOpenLyric(this.props.index-1)
                            }}>
                            <Image style={itemStyle.openButtonImage} source={require('../icon/lyric.png')}/>
                        </TouchableOpacity>
                    </View>
                        <Animated.View style={[itemStyle.animationContainer,{transform: [{translateX: this.translateX}]} ]}>
                            <View style={{width:40, height:'100%'}}>
                                <TouchableOpacity style={{flex:1}}>
                                    
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex:1}}>

                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={()=>{
                                    handleDeleteItem(index-1)
                                }}
                                style={{flex:1,backgroundColor:'#FF6E43', justifyContent:'center'}}>
                                    <Text style={{textAlign:'center',fontSize:13, color:'white'}}>Delete</Text>

                            </TouchableOpacity>
                        </Animated.View>
                    </TouchableOpacity>
                    <View style={[itemStyle.lyricContainer, {height:lyricHeight}]}>
                        <Text style={[itemStyle.lyric, {display: lyricHeight===0?'none':'flex'}]}
                            numberOfLines={this.props.lyricLine}>
                            {this.props.lyric}
                        </Text>
                    </View>
                <View style={itemStyle.bottomPadding} />
            </View>
    )}
}
const itemStyle = StyleSheet.create({
    container:{
        width:'100%',
        justifyContent:"center",
        alignItems:'center',
        backgroundColor:'#fff',
        paddingLeft:20,
        paddingRight:20
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
        fontSize:15,
        color:'#121111'
    },
    chooseTitle:{
        fontSize:15,
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
        //borderBottomColor:'#EAE8E8',
        //borderBottomWidth:1
    },
    bottomPadding:{
        width:'100%',
        height:1,
        //borderBottomColor:'#EAE8E8',
        //borderBottomWidth:3
    },



    animationContainer:{
        width:120,
        height:'100%',
        position:'absolute',
        backgroundColor:'#fff',
        flexDirection:'row',
        borderColor:'black',
        borderWidth:1
    }
})