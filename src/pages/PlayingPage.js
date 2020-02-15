import React, {Component} from 'react'
import {View, Text, ScrollView, StyleSheet, Animated, PanResponder, Dimensions} from 'react-native'


export default class PlayingPage extends Component{
    screenHeight = Dimensions.get('window').height
    headerPos = this.props.headerPos ? this.props.headerPos : this.screenHeight * 0.1
    isOpen = false
    translatedY = new Animated.Value(this.screenHeight*0.93)
    _panResponder = PanResponder.create({
        onStartShouldSetPanResponder: ({nativeEvent}, gestureState) =>{
            if(this.isOpen === false && nativeEvent.pageY > this.screenHeight * 0.9 )
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
                this.translatedY.setValue(gestureState.dy)
            else 
                this.translatedY.setValue(gestureState.dy + gestureState.y0)
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
                    toValue: this.screenHeight*0.93,
                    bounciness:12
                }).start()
            }
            else if(this.isOpen && dy > 0){
                this.isOpen = false
                Animated.timing(this.translatedY, {
                    toValue:this.screenHeight*0.93,
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
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          // Returns whether this component should block native components from becoming the JS
          // responder. Returns true by default. Is currently only supported on android.
          return true;
        },
    })
    getStyle(){
        return [
            styles.temp, {transform: [{translateY: this.translatedY}]}
        ]
    }
    render(){
        return(
            <Animated.View
                    style={this.getStyle()}
                    {...this._panResponder.panHandlers}
                    >
                    <View style={styles.mini}>

                    </View>
                    <View>

                    </View>
                    <View style={styles.main} />
                    <ScrollView style={styles.main}>
                        <View style={styles.cont}/>
                        <View style={styles.cont}/>
                        <View style={styles.cont}/>
                        <View style={styles.cont}/>
                        <View style={styles.cont}/>
                    </ScrollView>
            </Animated.View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%'
    },
    temp:{
        position:'absolute',
        bottom: 0,
        left:0,
        width:'100%',
        height:'120%',
        backgroundColor:'#aaa'
    },
    mini:{
        height:'10%',
        backgroundColor:'#00f'
    },
    main:{
        flex:1,
        backgroundColor:'#fff'
    },
    cont:{
        height:200,
        borderWidth:3
    }
    
})