import React, {Component} from 'react'
import { connect } from 'react-redux'
import {View, StyleSheet, PanResponder, Dimensions, Text, ProgressViewIOS} from 'react-native'
const {width} = Dimensions.get('window')
import { AudioActions } from '../store/actionCreator'

class PlayingBar extends Component {
    constructor(props) {
      super(props);
      const { playinfo, isPlaying, infoNumber, theme } = props
      this.state = { progress: 0, isMoving: false }
      this.infoNumber = infoNumber
      this.isMoving=false
      
        
      this._panResponder = PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => {
          const time = this.infoNumber === 1 ? this.props.oldTime : this.props.newTime
          const progress = time.ms / time.duration
          this.setState({progress:progress, isMoving:true })
          console.warn('onStart) progress:', progress)
          return true
        },
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => {

          // The gesture has started. Show visual feedback so the user knows
          // what is happening!
          // gestureState.d{x,y} will be set to zero now
        },
        onPanResponderMove: (evt, gestureState) => {
            this.setState({progress:(gestureState.moveX / width), isMoving:true })
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: ({nativeEvent}, gestureState) => {
          // The user has released all touches while this view is the
          // responder. This typically means a gesture has succeeded
          const duration = this.infoNumber === 1 ? this.props.oldTime.duration : this.props.newTime.duration
          const progress = gestureState.moveX ? this.state.progress : (nativeEvent.pageX / width)
          AudioActions.jump({
            infoNumber: this.infoNumber,
            ms: progress * duration
          })
          this.setState({progress:0, isMoving:false})
        },
        onPanResponderTerminate: (evt, gestureState) => {
          // Another component has become the responder, so this gesture
          // should be cancelled
          const duration = this.infoNumber ? this.props.oldTime.duration : this.props.newTime.duration
          AudioActions.jump({
            infoNumber: this.infoNumber,
            ms: this.state.progress * duration
          })
          this.setState({progress:(gestureState.moveX / width), isMoving:false})
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          // Returns whether this component should block native components from becoming the JS
          // responder. Returns true by default. Is currently only supported on android.
          return true;
        },
      });
    }
    componentDidMount() {

    }
    getLeftStyle = ()=>{
        const percent = String(this.state.progress) + '%'
        return [styles.leftLine, {width:percent}]
    }
    getRightStyle = ()=>{
        const percent = String(100 - this.state.progress) + '%'
        return [styles.rightLine, {width:percent}]
    }
    getCircleStyle= ()=>{
        const percent = String(this.state.progress) + '%'
        return [styles.circle, {left:percent}]
    }
    mstoTime = (ms) => {
      
      const min = Math.floor(ms / 1000)
      const sec = min%60 > 9 ? (min%60).toString() : '0'+(min%60).toString()
      return Math.floor(min/60).toString() + ':' + sec 
    }
    getStyle = (theme) =>{
      if(theme === 'gray')
        return [styles.downSideContainer, {backgroundColor:'#ddd'}]
      return [styles.downSideContainer, {backgroundColor:'#fff'}]
    }
    render(){
      const _time = this.infoNumber === 1 ? this.props.oldTime : this.props.newTime
      const time = _time.ms ? _time : {ms:0, duration:100}
      //const progress = this.state.isMoving ? this.progress : time.ms/time.duration
      return(
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <ProgressViewIOS progress={ this.state.isMoving ? this.state.progress : time.ms/time.duration }/>

        <View style={this.getStyle(this.props.theme)}>
              <Text style={styles.leftTimeText}>{this.mstoTime(time.ms)}</Text>
              <Text style={styles.rightTimeText}>{this.mstoTime(time.duration)}</Text>
        </View>
      </View>)
    }
  }


const styles= StyleSheet.create({
    container:{
        width:'100%',
        height:20,
    },
    subContainer:{
      width:'100%',
      height:'100%',
      left:5,
      paddingLeft:10,
      paddingRight:10,
      position:'absolute'
    },
    upSideContainer:{
        position:'relative',
        height:5,
        width:'100%'
    },
    downSideContainer:{
        position:'relative',
        height:20,
        width:'100%',
        backgroundColor:'#c0c0c0',
        alignItems:'flex-end',
        flexDirection:'row'
    },
    lineContainer:{
        position:'absolute',
        width:'100%',
        marginTop:2.5,
        height:5,
        flexDirection:'row'
    },
    leftLine:{
        height:'100%',
        backgroundColor:'#777'
    },
    rightLine:{
        height:'100%',
        backgroundColor:'#ddd'
    },
    leftTimeText:{
      flex:1,
      fontSize:10,
      textAlign:'left',
      paddingLeft:10
    },

    rightTimeText:{
      flex:1,
      fontSize:10,
      textAlign:'right',
      paddingRight:10
    },
    circle:{
        position:'absolute',
        width:10,
        height:10,
        backgroundColor:'#777',
        borderRadius:4
    }

})




export default connect(
  ({audio})  =>({
    newTime:audio.newTime,
    oldTime:audio.oldTime
  })
)(PlayingBar)