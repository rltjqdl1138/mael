import React, {Component} from 'react'
import {View, Text, ScrollView, StyleSheet, Animated, PanResponder, Dimensions} from 'react-native'


export default class PlayingPage extends Component{
    screenHeight = Dimensions.get('window').height
    headerPos = this.props.headerPos ? this.props.headerPos : 0
    isOpen = false
    minibarOpacity = 1
    translatedY = new Animated.Value(this.screenHeight*0.9)
    _panResponder = PanResponder.create({
        onStartShouldSetPanResponder: ({nativeEvent}, gestureState) =>{
            //if(gestureState.dy < 40 && gestureState.dy > -40) return false
            if(this.isOpen === false && nativeEvent.pageY > this.screenHeight * 0.8 )
                return true
            else if(this.isOpen=== true && nativeEvent.pageY < this.screenHeight * 0.5)
                return true
            return false
        },
        onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => false,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
        onPanResponderGrant: (evt, gestureState) => {},
        onPanResponderMove:({nativeEvent}, gestureState) => {
            if(this.isOpen)
                this.translatedY.setValue(gestureState.dy + this.screenHeight*0.1)
            else 
                this.translatedY.setValue(gestureState.dy + (this.screenHeight - this.headerPos)*0.9)
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (e, {vy, dy}) => {
            // The user has released all touches while this view is the
            // responder. This typically means a gesture has succeeded
            if(!this.isOpen && dy < 0){
                this.isOpen = true
                Animated.timing(this.translatedY, {
                    toValue: this.headerPos,
                    duration:200
                }).start()
            }else if(!this.isOpen){
                Animated.spring(this.translatedY, {
                    toValue: this.screenHeight * 0.9,
                    bounciness:12
                }).start()
            }
            else if(this.isOpen && dy > 0){
                this.isOpen = false
                Animated.timing(this.translatedY, {
                    toValue: this.screenHeight * 0.9,
                    duration:200
                }).start()
            }else if(this.isOpen){
                Animated.spring(this.translatedY, {
                    toValue: this.headerPos,
                    bounciness:12
                }).start()
            }
        },
        onPanResponderTerminate: (evt, gestureState) => {
          // Another component has become the responder, so this gesture
          // should be cancelled
            if(!this.isOpen){
                this.isOpen = true
                Animated.timing(this.translatedY, {
                    toValue: this.headerPos,
                    duration:200
                }).start()
            }else{
                this.isOpen = false
                Animated.spring(this.translatedY, {
                    toValue: this.headerPos,
                    bounciness:12
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
        return [
            styles.container, {transform: [{translateY: this.translatedY}]}
        ]
    }
    getMinibarStyle(){
        this.translatedY.
        return [style.mini, {opacity: this.minibarOpacity}]
    }
    render(){
        return(
            <Animated.View
                    style={this.getStyle()}
                    {...this._panResponder.panHandlers} >
                    <View style={styles.main}>
                        <View style={styles.mini} />
                    </View>
                    <View style={styles.bottomPadding} />
            </Animated.View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        position:'absolute',
        bottom: "-85%",
        left:0,
        width:'100%',
        height:'190%',
    },
    mini:{
        //display:'none',
        height:'12%',
        width:'100%',
        backgroundColor:'#00f'
    },
    main:{
        width:'100%',
        flex:1,
        backgroundColor:'#fff'
    },
    bottomPadding:{
        width:'100%',
        flex: 1
    }
    
})