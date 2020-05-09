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
                    <Text style={itemStyle.title}
                        numberOfLines={1}>
                        {this.props.title}
                    </Text>
                </View>

                <View style={itemStyle.subtitleContainer}>
                    <Text style={itemStyle.subtitle}
                        numberOfLines={1}>
                        artist name
                    </Text>
                </View>

            </TouchableOpacity>
        )
    }
}


const itemStyle = StyleSheet.create({
    container:{
        width:width*0.45,
        height:'100%',
        marginLeft:10,
        justifyContent:'center',
        alignItems:'center',
    },
    imageContainer:{
        width:width*0.45,
        height:width*0.45,

        borderColor:'blue',
        borderWidth:3,
        marginTop:10
    },

    image:{
        width:0,
        height:0,
        resizeMode:'contain'
    },


    titleContainer:{
        width:'100%',
        paddingTop:5
    },
    title:{
        fontSize: 16,
        color:'#121111',
        fontWeight:'400'
    },

    subtitleContainer:{
        flex:1,
        width:'100%',
        paddingTop:0
    },
    subtitle:{
        fontSize: 14,
        color:'#8d8989'
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
                        <Text style={containerStyle.title}
                            numberOfLines={1}>
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
        height: width*0.7,
        marginTop:40
    },
    

    // TITLE

    titleContainer:{
        width: '100%',
        height:45,
    },title:{
        paddingLeft: 20,
        fontSize: 18,
        fontWeight: "bold",
        paddingBottom:3
    },
    subTitle:{
        color:'#767171',
        fontSize:10,
        paddingLeft:20,
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
        width:10,
        height:'100%'
    }
})
