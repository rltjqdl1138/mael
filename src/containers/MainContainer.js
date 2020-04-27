import React, {Component} from 'react'
import { StyleSheet, ScrollView, View, Text, Animated } from 'react-native';

import ThemeContainer from './ThemeContainer'

export default class MainContainer extends Component{
    translatedY = new Animated.Value(0)
    closeNotice = ()=>{
        Animated.timing(this.translatedY,{
            toValue:-43,
            duration:200
        }).start()
    }
    openNotice = ()=>{
        Animated.timing(this.translatedY,{
            toValue:0,
            duration:100
        }).start()
    }
    getStyle = () => [ styles.noticeContainer, {transform: [{translateY: this.translatedY}]} ]

    render(){
        const {navigator, option} = this.props
        return(
            <View style={styles.container}>
                <ScrollView style={styles.scroll}
                    onMomentumScrollEnd={({nativeEvent})=>{
                        const {y} = nativeEvent.contentOffset
                        if(y==0) this.openNotice()}
                    }
                    onScrollBeginDrag={this.closeNotice} >
                        <View style={{height:20}}/>
                        <ThemeContainer navigator={navigator}/>
                </ScrollView>
                <Animated.View style={this.getStyle()}>
                    <Text style={styles.noticeText} allowFontScaling={false}>Welcome to megatream</Text>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        height:'100%',
        width:'100%',
    
    },
    noticeContainer:{
        position:'absolute',
        width:'100%',
        height:43,
        backgroundColor:'#f99',
        justifyContent:'center',
        top:0
    },
    noticeText:{
        fontSize:14,
        color:'#fff',
        textAlign:'center'
    },
    scroll:{
        width:'100%'
    }
})