import React, {Component} from 'react'
import {View, StyleSheet, Text, Button, ScrollView, Image, TextComponent} from 'react-native'

export default class LoginSidebar extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.usernameContainer}>
                    <Text style = {styles.usernameText}>
                        {this.props.username ? this.props.username + "님" : "blank"}
                    </Text>
                    <Button title="logout" onPress={this.props.handleLogout}
                        style={{position:'absolute', right:0}}
                    />
                </View>
                <View style={styles.noticeContainer}>

                </View>
                <View style={styles.otherContainer}>
                    <ScrollView>
                        <View style={temp.main1}/>
                        <View style={styles.gotoPlaylistContainer}>
                            <Text> My playlist 바로가기 > </Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.settingContainer}>
                    <Image
                        style={styles.settingImage}
                        source={require('../image/owl.jpg')}
                    />
                </View>
                <View style={styles.bottomLine}>

                </View>
                <View style={styles.shopContainer}>
                    <Button
                        style={styles.shopButton}
                        title="SHOP >"
                    />
                </View>
            </View>
        )
    }
}


const temp = StyleSheet.create({
    main1:{
        width:'100%',
        height:200,
        backgroundColor:'#ff0'
    },main2:{
        width:'100%',
        height:200,
        backgroundColor:'#f0f'
    },main3:{
        width:'100%',
        height:200,
        backgroundColor:'#0ff'
    }
})


const styles= StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        paddingTop:40,
        paddingBottom:40
    },
    usernameContainer:{
        flex: 1,
        flexDirection:'row',
        paddingLeft:40,
        alignContent:'center',
        justifyContent:'center'
    },
    usernameText:{
        position:'absolute',
        fontSize:20,
        paddingLeft:20,
        left:0,
        top:'25%'
    },

    noticeContainer:{
        flex:2,
        borderWidth:2,
        backgroundColor:'#000'
    },

    otherContainer:{
        flex:8,
    },


    gotoPlaylistContainer:{
        height: 40,
        paddingLeft:10,
        justifyContent:'center'
    },
    gotoPlaylistText:{
        fontSize:12
    },
    

    settingContainer:{
        flex:1,
        margin:0,
        padding:0
    },
    settingImage:{
        position:'absolute',
        right:0,
        bottom:0,
        height:'90%',
        width:'20%',
        resizeMode:'contain',
    },


    bottomLine:{
        height:0,
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        marginLeft:10,
        marginRight:10
    },


    shopContainer:{
        flex:1,
        alignItems:'baseline',
        justifyContent:'center',
        paddingLeft:10
    },

    shopButton:{
        textAlign:'left',
        color:'#000'
    }
})