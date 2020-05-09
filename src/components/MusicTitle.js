import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'

export default class MusicTitle extends Component {
    render(){
        const {musicList, handleMainPush, handleClose} = this.props

        const title = musicList.map(item => {
            return (
                <MusicTitleItem
                    key={item.ID}
                    ID={item.ID}
                    title={item.title}
                    handleMainPush={handleMainPush}
                    handleClose={handleClose}
                />
            )
        })
        return (
            <View style={styles.container}>
                <View style={[styles.textContainer,{paddingLeft:15, paddingTop:0, paddingBottom:10}]}>
                    <Text style={styles.text2}>KIDS</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>MUSIC</Text>
                </View>
                <View style={{paddingLeft:20}}>
                    {title}
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>BOOK</Text>
                </View>
                <View style={{paddingLeft:20}}>
                    {title}
                </View>
            </View>
        )
        
    }
}

class MusicTitleItem extends Component{
    render(){
        const {ID, title, handleMainPush, handleClose} = this.props
        return(
            <TouchableOpacity onPress={()=>{
                    handleClose()
                    handleMainPush('AlbumContainer',{albumID:ID, title})
                }}
                style={styles.itemContainer}>
                <Text style={styles.itemText}>{title}</Text>
            </TouchableOpacity>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        paddingTop:15,
    },
    textContainer:{
        paddingLeft:20,
        paddingBottom:15,
    },
    text2:{
        fontSize:16,
        fontWeight:'700'
    },
    text:{
        fontSize:16,
        fontWeight:'400'
    },
    itemContainer:{
        width:'100%',
        height:35,
        marginLeft: 7,
    },
    itemText:{
        fontSize:16,
        color:'gray'
    }
})