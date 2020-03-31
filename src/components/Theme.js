import React, {Component} from 'react'
import {StyleSheet, View, TouchableOpacity, ScrollView, Image, Text, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')
class ThemeItem extends Component{
    render(){
        return(
            <TouchableOpacity style={itemStyle.container}>

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
        width:width*0.45+10,
        height:width*0.55,
        marginRight: 5,
        marginLeft: 5
    },
    imageContainer:{
        width:width*0.45,
        height:width*0.45
    },
    image:{
        width:width*0.45,
        height:width*0.45,
        resizeMode:'cover'
    },


    titleContainer:{
        flex:1,
        width:'100%',
        justifyContent:'center',
    },
    title:{
        fontSize: 14,
        color:'#121111',
        textAlign:'center'
    },
})



export default class Theme extends Component{
    render(){
        const {themeList, title} = this.props
        const themeItems = !themeList ?
            (<Text> Loading... </Text>):
            themeList.map(
                theme => {
                    const {TID, imageURL, title} = theme
                    return (
                        <ThemeItem
                            key={TID}
                            TID={TID}
                            imageURL={imageURL}
                            title={title}
                        />
                    )
                }
            )
            return(
                <View style={containerStyle.container}>
                    <View style={containerStyle.titleContainer}>
                        <Text style={containerStyle.title}>
                            {title}
                        </Text>
                        <Text style={containerStyle.subTitle}>
                            Occasionally when you feel
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
        marginTop:20
    },
    

    // TITLE

    titleContainer:{
        width: '100%',
        flex: 1,
    },title:{
        paddingLeft: 25,
        fontSize: 16,
        fontWeight: "bold"
    },
    subTitle:{
        color:'#767171',
        fontSize:10,
        paddingLeft:30,
    },


    // MAIN CONTENTS

    themeContainer:{
        flex: 5
    },


    //PADDING
    bottomPaddingContainer:{
        height:0,
        width:'100%',
        paddingLeft:20,
        paddingRight:20,
    },
    bottomPadding:{
        height: 0,
        width:'100%',
        borderBottomWidth:1,
        borderBottomColor:'#ccc'
    },

    itemPadding:{
        width:20,
        height:'100%'
    }
})
