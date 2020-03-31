import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'

export default class MusicTitle extends Component {
    render(){
        const {musicList, handleMainPush, handleClose} = this.props
        const title = musicList.map(item => {
            return (
                <MusicTitleItem
                    key={item} 
                    title={item}
                    link={item}
                    handleMainPush={handleMainPush}
                    handleClose={handleClose}
                />
            )
        })
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Music</Text>
                </View>
                {title}
            </View>
        )
        
    }
}

class MusicTitleItem extends Component{
    render(){
        const {title, link, handleMainPush, handleClose} = this.props
        return(
            <TouchableOpacity onPress={()=>{
                    handleClose()
                    handleMainPush('AlbumContainer',{title:title})
                }}
                style={styles.itemContainer}>
                <Text style={styles.itemText}>{title}</Text>
            </TouchableOpacity>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        paddingTop:20,
        paddingLeft:30
    },
    textContainer:{
        paddingTop:10,
        paddingBottom:20
    },
    text:{
        fontSize:16,
        fontWeight:'bold'
    },
    itemContainer:{
        width:'100%',
        height:45,
        marginLeft: 5,
    },
    itemText:{
        fontSize:15,
        color:'gray'
    }
})