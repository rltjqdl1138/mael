import React, {Component} from 'react'
import { View, StyleSheet, Text, Button, ScrollView, Image, TouchableOpacity } from 'react-native'
import deviceCheck from '../deviceCheck'

export default class LoginSetting extends Component{
    render(){
        const {  handleMainPush, handleWholePush, handleClose, handleCloseSetting } = this.props
        return(
            <View style={styles.container}>
                <View style={styles.topPadding}>
                    <TouchableOpacity style={styles.backButton}
                        onPress={handleCloseSetting} >
                            <Image style={styles.backButtonImage}
                                source={require('../icon/back.png')}
                            />
                    </TouchableOpacity>
                </View> 
                <View style={styles.settingContainer}>

                    <TouchableOpacity style={styles.settingItem}
                        onPress={()=>{`
                            handleClose()
                            handleWholePush('')` }}>
                        <Text style={styles.settingItemText}>
                            서비스 안내
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}
                        onPress={()=>{`
                            handleClose()
                            handleWholePush('')` }}>
                        <Text style={styles.settingItemText}>
                            이용 약관
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

    backButton:{
        marginLeft: 25,
        width:40,
        height:40
    },
    backButtonImage:{
        height:'100%',
        width:'100%',
        resizeMode:'contain'
    },
    settingContainer:{
        flex:1,
        backgroundColor:'#fff',
        paddingTop:80
    },
    settingItem:{
        padding: 20,
        paddingLeft: 40
    },
    settingItemText:{
        fontSize:15
    }

})
