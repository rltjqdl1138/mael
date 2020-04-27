import React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity, Image, Text, Animated} from 'react-native'
import deviceCheck from '../deviceCheck'

export default class SimpleHeader extends Component {
    handleClose = () =>{
        Animated.timing(this.noticeY, {
            toValue: -43,
            duration: 200
        }).start()
    }
    handleOpen = () =>{
        Animated.timing(this.noticeY, {
            toValue: 0,
            duration: 200
        }).start()
    }
    noticeY = new Animated.Value(-43);
    getNoticeStyle = () => [styles.noticeStyle, {transform:[{translateY:this.noticeY}] }]
    
    render(){
        const {title, handler, notice, handleComplete, disableNotice} = this.props
        const WholeSize = deviceCheck.getTopPadding() + (disableNotice?60:103)

        if(notice === '') this.handleClose()
            else this.handleOpen()
        return (
            <View style={[styles.container,{height:WholeSize}]}>
                    
                <View style={{height:deviceCheck.getTopPadding()}}/>
                <View style={[styles.headerContainer,{height:disableNotice?60:103}]}>
                    <Animated.View style={[this.getNoticeStyle(),{display: disableNotice?'none':'flex'}]}>
                        <Text style={styles.noticeText}> {notice} </Text>
                    </Animated.View>

                    <View style={[styles.blank,{height:disableNotice?0:43}]} />
                    <View style={styles.mainContainer} >
                        <TouchableOpacity style={styles.backButtonContainer}
                            onPress={handler}  >
                            <Image style={styles.backButtonImage}
                                source={require('../icon/back.png')}  />
                        </TouchableOpacity>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>
                                {title}
                            </Text>
                        </View>
                        <TouchableOpacity style={[styles.completeButton, {display:handleComplete?'flex':'none'}]}
                            onPress={()=>{
                                    if(handleComplete) handleComplete()
                                    handler()
                                }}>
                            <Text style={{fontSize:16}}>완료</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>

            </View>
        )
    }   
}

const styles=StyleSheet.create({
    container:{
        width:'100%',
    },
    headerContainer:{
        width:'100%',
        flexDirection:'column-reverse',
    },
    mainContainer:{
        height:60,
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'#fff',
        flexDirection:'row',
        borderBottomColor:'#121111',
        borderBottomWidth:0.3,
    },
    noticeStyle:{
        position:'absolute',
        height:43,
        width:'100%',
        backgroundColor:'#f99',
        justifyContent:'center',
    },
    noticeText:{
        fontSize:14,
        textAlign:'center',
        color:'#fff'
    },

    backButtonContainer:{
        height:'100%',
        width:100,
        justifyContent:'center'
    },
    backButtonImage:{
        width:'80%',
        height:'80%',
        resizeMode:'contain'
    },

    titleContainer:{
        height: '100%',
        flex:1,
        paddingRight:100,
        justifyContent:'center',
    },
    title:{
        fontSize: 20,
        textAlign:'center',
        color:'#121111'
    },
    completeButton:{
        position:'absolute',
        width:50,
        height:'100%',
        justifyContent:'center',
        right:0,
    },
    blank:{
        height:43,
        width:'100%'
    }
})