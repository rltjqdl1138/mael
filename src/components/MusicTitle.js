import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'

export default class MusicTitle extends Component {
    render(){
        const {musicList} = this.props
        const title = musicList.map(item => {
            return (
                <MusicTitleItem
                    key={item} 
                    title={item}
                    link={item}
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
        const {title, link} = this.props
        return(
            <TouchableOpacity onPress={()=>{alert(link)}}
                style={styles.itemContainer}>
                <Text style={styles.itemText}>{title}</Text>
            </TouchableOpacity>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        margin:20
    },
    textContainer:{
        marginBottom:15
    },
    text:{
        fontSize:20,
        fontWeight:'bold'
    },
    itemContainer:{
        width:'100%',
        height:40,
        marginLeft: 10,

    },
    itemText:{
        fontSize:15,
        color:'gray'
    }
})