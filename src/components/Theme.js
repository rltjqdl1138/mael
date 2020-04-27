import React, {Component} from 'react'
import {StyleSheet, View, TouchableOpacity, ScrollView, Image, Text, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

class ThemeItem extends Component{
    render(){
        const {title, albumID, navigator} = this.props
        return(
            <TouchableOpacity style={itemStyle.container}
                onPress={()=>navigator.push('AlbumContainer',{title, albumID})}>

                <View style={itemStyle.imageContainer}>
                    <Image style={itemStyle.image}
                        source={require('../image/class.jpeg')}
                    />
                </View>

                <View style={itemStyle.titleContainer}>
                    <Text style={itemStyle.title}>
                        {this.props.title}
                    </Text>
                </View>

            </TouchableOpacity>
        )
    }
}

const itemStyle = StyleSheet.create({
    container:{
        width:width*0.5,
        height:width*0.6,
        paddingRight: 10,
        paddingLeft: 0,
        justifyContent:'center',
        alignItems:'center',
    },
    imageContainer:{
        flex:1
    },
    image:{
        width:width*0.45,
        height:width*0.45,
        resizeMode:'cover'
    },


    titleContainer:{
        height:60,
        paddingTop:12,
        width:'100%',
    },
    title:{
        fontSize: 14,
        color:'#121111',
        textAlign:'center'
    },
})



export default class Theme extends Component{
    render(){
        const {themeList, title, subTitle, navigator } = this.props
        const themeItems = !themeList ?
            (<Text> Loading... </Text>):
            themeList.map( theme => {
                const {ID, title} = theme
                return (
                    <ThemeItem
                        key={ID}
                        albumID={ID}
                        title={title}
                        navigator={navigator}
                    />)
            })

            return(
                <View style={containerStyle.container}>
                    <View style={containerStyle.titleContainer}>
                        <Text style={containerStyle.title}>
                            {title}
                        </Text>
                        <Text style={containerStyle.subTitle}>
                            {subTitle}
                        </Text>
                    </View>

                    <View style={containerStyle.themeContainer}>
                        <ScrollView style={containerStyle.scroll}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                            <View style={containerStyle.itemPadding}/>
                            { themeItems }
                            <View style={containerStyle.itemPadding}/>
                        </ScrollView>

                    </View>
                    <View style={containerStyle.bottomPaddingContainer}>
                        <View style={containerStyle.bottomPadding} />
                    </View>
                </View>
            )
    }
}



const containerStyle = StyleSheet.create({
    
    // CONTAINER

    container:{
        alignItems: 'center',
        width: '100%',
        height: width*0.72,
        marginTop:45
    },
    

    // TITLE

    titleContainer:{
        width: '100%',
        height:60,
    },title:{
        paddingLeft: 25,
        fontSize: 16,
        fontWeight: "bold",
        paddingBottom:3
    },
    subTitle:{
        color:'#767171',
        fontSize:10,
        paddingLeft:25,
    },


    // MAIN CONTENTS

    themeContainer:{
        flex: 1
    },


    //PADDING
    bottomPaddingContainer:{
        height:0,
        width:'100%',
        paddingLeft:20,
        paddingRight:20,
    },
    bottomPadding:{
        paddingTop:5,
        height: 22,
        width:'100%',
        borderBottomWidth:1,
        borderBottomColor:'#ccc'
    },

    itemPadding:{
        width:20,
        height:'100%'
    }
})
