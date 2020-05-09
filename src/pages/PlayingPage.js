import React, {Component} from 'react'
import { connect } from 'react-redux'
import {View, StyleSheet, Animated, PanResponder, Dimensions, TouchableOpacity, Image} from 'react-native'

import PlayingContainer from '../containers/PlayingContainer'
import MiniPlaybar from '../components/MiniPlaybar'
import { AudioActions  } from '../store/actionCreator'
import deviceCheck from '../deviceCheck'

const minibarSize = deviceCheck.ifTopbarless ? 120 : 100

class PlayingPage extends Component{
    constructor(props){
        super(props)
        this.state = {isOpen:false}
    }

    screenHeight = Dimensions.get('window').height
    //headerPos = this.props.headerPos ? this.props.headerPos : 0
    //headerPos = 67
    headerPos = -minibarSize

    scrollDownPos = deviceCheck.ifTopbarless ? this.screenHeight-125 :this.screenHeight - 100
    minibarOpacity = new Animated.Value(1)
    translatedY = new Animated.Value(this.scrollDownPos)
    _panResponder = PanResponder.create({
        onStartShouldSetPanResponder: ({nativeEvent}, gestureState) =>{
            const {isOpen} = this.state
            if(isOpen && nativeEvent.pageY < this.screenHeight * 0.2)
                return true
            
            else if(isOpen)
                return false
            
            return true
            
        },
        onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => {
            const {pageY} = evt.nativeEvent
            const {dy, vy} = gestureState
            const {isOpen} = this.state
            if( isOpen && dy > 50 && vy > 0.5 && pageY < this.screenHeight * 0.4 ) return true
            else if(isOpen) return false
            else if(dy < -10 && vy < -0.5)
                return true
            return false
        },
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
        onPanResponderGrant: (evt, gestureState) => {},
        onPanResponderMove:({nativeEvent}, gestureState) => {

            const {isOpen} = this.state
            if(gestureState.dy < 40 && gestureState.dy > -40) return false
            const height = Dimensions.get('window').height
            this.minibarOpacity.setValue(gestureState.moveY/height)
            if(isOpen)
                this.translatedY.setValue(gestureState.dy + this.headerPos)
            else 
                this.translatedY.setValue(gestureState.dy + this.scrollDownPos)
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        
        onPanResponderRelease: (e, {vy, dy}) => {
            const {isOpen} = this.state
            // The user has released all touches while this view is the
            // responder. This typically means a gesture has succeeded
            if(!isOpen && (dy < -400 || vy < -0.8)){
                Animated.timing(this.minibarOpacity,{
                    toValue:0
                }).start()
                Animated.timing(this.translatedY, {
                    toValue: this.headerPos,
                    duration:200
                }).start(()=>{
                    this.setState({isOpen:true})
                })
            }else if(!isOpen){
                Animated.timing(this.minibarOpacity,{
                    toValue:1
                }).start()
                Animated.timing(this.translatedY, {
                    toValue: this.screenHeight
                }).start(()=>{
                    //AudioActions.ending()
                    this.translatedY.setValue(this.scrollDownPos)
                })
            }


            else if(isOpen && dy > 100){
                this.setState({isOpen:false})
                Animated.timing(this.minibarOpacity,{
                    toValue:1
                }).start()
                Animated.timing(this.translatedY, {
                    toValue: this.scrollDownPos,
                    duration:200
                }).start()


            }else if(isOpen){
                Animated.timing(this.minibarOpacity,{
                    toValue:0
                }).start()
                Animated.spring(this.translatedY, {
                    toValue: this.headerPos,
                    bounciness:12
                }).start()
            }
        },
        onPanResponderTerminate: (evt, gestureState) => {
          // Another component has become the responder, so this gesture
          // should be cancelled
            const {isOpen} = this.state

            if(isOpen){
                this.setState({isOpen:false})
                Animated.timing(this.minibarOpacity,{
                    toValue:1
                }).start()
                Animated.timing(this.translatedY, {
                    toValue: this.scrollDownPos,
                    duration: 400
                }).start()
            }else{
                Animated.timing(this.minibarOpacity,{
                    toValue:1
                }).start()
                Animated.timing(this.translatedY, {
                    toValue: this.scrollDownPos,
                    duration:200
                }).start()
            }
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          // Returns whether this component should block native components from becoming the JS
          // responder. Returns true by default. Is currently only supported on android.
          return true;
        },
    })
    getStyle(){
        return [styles.container, {transform: [{translateY: this.translatedY}]}]
    }
    getMinibarStyle(){
        return [styles.mini, {opacity: this.minibarOpacity}]
    }
    render(){
        const {isPlaying, showPlaybar, playlist, albumID, playOption, index, isLogin, token, isLoaded, isUpdated } = this.props
        const albumInfo = this.props.albumInfo ? this.props.albumInfo : {ID:0, title:'My Playlist'}

        if(!showPlaybar)
            return (<View />)
        return(
            <Animated.View
                    style={this.getStyle()}
                    {...this._panResponder.panHandlers} >
                    <Animated.View style={this.getMinibarStyle()}>
                        <MiniPlaybar
                            minibarSize ={minibarSize}
                            handleResume={AudioActions.resume}
                            handlePause ={AudioActions.pause}
                            handleNext={AudioActions.next}
                            isLoaded={isLoaded}
                            isPlaying={isPlaying}
                            albumTitle={playlist[index].albumTitle?playlist[index].albumTitle:albumInfo.title}
                            title={playlist[index].title}
                            index={index}
                        />
                    </Animated.View>
                    <View style={styles.main} >
                        <View style={{height:deviceCheck.ifTopbarless?30:10, backgroundColor:'#fff'}}/>

                        <View style={{height:50, backgroundColor:'#fff', alignItems:'center'}}>
                            <Image style={{flex:1,resizeMode:'contain'}} source={require('../icon/scrollDown.png')} />
                        </View>
                       <PlayingContainer
                            handleResume={AudioActions.resume}
                            handlePause={AudioActions.pause}
                            handleNext={AudioActions.next}
                            handleUpdate={AudioActions.update}
                            handleChangeOption={AudioActions.changeOption}
                            isLogin={isLogin}
                            isLoaded={isLoaded}
                            index={index}
                            albumInfo={albumInfo}
                            playlist={playlist}
                            isPlaying={isPlaying}
                            playOption={playOption}
                            isUpdated={isUpdated}
                        />
                    </View>
                    <View style={styles.bottomPadding} />
            </Animated.View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        position:'absolute',
        left:0,
        width:'100%',
        height:'200%',
        borderColor:'black',
        borderWidth:1
        //display:'none'
    },
    mini:{
        height:minibarSize,
    },
    main:{
        width:'100%',
        height:'50%',
        backgroundColor:'#fff'
    },
    bottomPadding:{
        width:'100%',
        flex: 1,
        backgroundColor:'#fff'
    }
    
})




export default connect(
    (state)  =>({
        isPlaying: state.audio.isPlaying,
        showPlaybar: state.audio.showPlaybar,
        playlist: state.audio.playlist,
        albumID: state.audio.albumID,
        albumInfo: state.audio.playinfo,
        index: state.audio.index,
        playOption:state.audio.playOption,
        isLogin: state.authentication.isLogin,
        token: state.authentication.token,
        isLoaded: state.audio.isLoaded,
        isUpdated: state.audio.isUpdated
    })
)(PlayingPage)