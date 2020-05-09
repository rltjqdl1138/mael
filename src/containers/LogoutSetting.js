import React, {Component} from 'react'
import { View, StyleSheet, Text, Button, ScrollView, Image, TouchableOpacity } from 'react-native'
import deviceCheck from '../deviceCheck'

export default class LoginSetting extends Component{
    render(){
        const {  handleMainPush, handleWholePush, handleClose, handleCloseSetting } = this.props
        return(
            <View style={styles.container}>

                <TouchableOpacity style={styles.settingContainer}
                    onPress={()=>{handleCloseSetting()}}>
                    <Image
                        style={styles.settingImage}
                        source={require('../icon/setting.png')}
                    />
                </TouchableOpacity>
                <View style={styles.mainContainer}>

                    <TouchableOpacity style={styles.mainItem}
                        onPress={()=>{`
                            handleClose()
                            handleWholePush('')` }}>
                        <Text style={styles.mainItemText}>
                            플랜 안내
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.mainItem}
                        onPress={()=>{`
                            handleClose()
                            handleWholePush('')` }}>
                        <Text style={styles.mainItemText}>
                            이용안내 및 약관
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}



const styles= StyleSheet.create({
    container:{
        width:'100%',
        height:'100%'
    },

    topPadding:{
        marginTop:40,
        width:'100%',
        height:40,
        justifyContent:'center',
    },


    settingContainer:{
        height:40,
        margin:0,
        padding:0,
        marginTop:4,
        justifyContent:'flex-end',
        alignItems:'flex-end'
    },
    settingImage:{
        position:'absolute',
        right:-5,
        bottom:0,
        height:'100%',
        width:'18%',
        resizeMode:'contain',
    },


    mainContainer:{
        flex:1,
        backgroundColor:'#fff',
        paddingTop:100
    },
    mainItem:{
        height:50,
        paddingLeft: 30
    },
    mainItemText:{
        fontSize:16,
        color:'gray'
    }

})
