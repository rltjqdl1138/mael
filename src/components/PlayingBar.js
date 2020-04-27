import React, {Component} from 'react'
import { connect } from 'react-redux'
import {View, StyleSheet, PanResponder, Dimensions, Text, ProgressViewIOS, ProgressBarAndroid, TimePickerAndroid} from 'react-native'
const {width} = Dimensions.get('window')
import { AudioActions } from '../store/actionCreator'
import deviceCheck from '../deviceCheck'

class PlayingBar extends Component {
    constructor(props) {
      super(props);
      this.state = { progress: 0, isMoving: false }
      this.isMoving=false
      
      this._panResponder = PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => {
          const {time} = this.props
          this.setState({progress:0, isMoving:true })
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
            const progress = gestureState.moveX / width
            this.setState({progress, isMoving:true })
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: ({nativeEvent}, gestureState) => {
          // The user has released all touches while this view is the
          // responder. This typically means a gesture has succeeded
          const duration = this.props.time.duration
          let progress = gestureState.moveX ? this.state.progress : (nativeEvent.pageX / width)
          progress = progress < 0 ? 0 : progress
          progress = progress > 1 ? 1 : progress

          AudioActions.jump({
            ms: progress * duration
          })
          this.setState({progress, isMoving:false})
        },
        onPanResponderTerminate: (evt, gestureState) => {
          // Another component has become the responder, so this gesture
          // should be cancelled
          const duration = this.props.time.duration
          AudioActions.jump({
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
    getProgressBar = (time) =>{
      const {ifIOS} = deviceCheck
      if(ifIOS)
        return (<View style={{width:'100%',height:10,backgroundColor:'#fafafa'}}>
            <ProgressViewIOS progress={ this.state.isMoving || !time.ms ? this.state.progress : time.ms/time.duration }/>
          </View>)
      else
        return (<View style={{width:'100%',height:10, backgroundColor:color}}>
          <ProgressBarAndroid 
                  progress={ this.state.isMoving ? this.state.progress : time.ms/time.duration }
                  styleAttr="Horizontal"
                  indeterminate={false}/>
          </View>)
    }
    getStyle = (theme) =>{
      if(theme === 'gray')
        return [styles.downSideContainer, {backgroundColor:'#F2EFEF'}]
      return [styles.downSideContainer, {backgroundColor:'#fff'}]
    }
    render(){
      let {time} = this.props
      time = time.ms && time.duration ? time : {ms:0, duration:1000}
      //const progress = this.state.isMoving ? this.progress : time.ms/time.duration
      return(
      <View style={styles.container} {...this._panResponder.panHandlers}>
        {this.getProgressBar(time)}
      </View>)
    }
  }


const styles= StyleSheet.create({
    container:{
        width:'100%',
        height:10
    },
    subContainer:{
      width:'100%',
      height:'100%',
      left:5,
      paddingLeft:10,
      paddingRight:10,
      position:'absolute'
    },
    downSideContainer:{
        position:'relative',
        height:20,
        width:'100%',
        backgroundColor:'#F2EFEF',
        alignItems:'flex-end',
        flexDirection:'row'
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
      time:audio.time
  })
)(PlayingBar)