import React, {Component} from 'react'
import {StyleSheet, View, TouchableOpacity, ScrollView, Image, Text } from 'react-native'

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
        width:200,
        height:'100%',
        paddingRight: 20,
        paddingLeft: 20
    },
    imageContainer:{
        padding:10,
        flex: 5
    },
    image:{
        width:'100%',
        height:'100%',
        resizeMode:'cover'
    },


    titleContainer:{
        flex:1,
        width:'100%',
        height:'100%'
    },
    title:{
        fontSize: 15,
        color:'#777',
        textAlign:'center'
    }
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
                    </View>

                    <View style={containerStyle.themeContainer}>
                        <ScrollView style={containerStyle.scroll}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                            { themeItems }
                        </ScrollView>

                    </View>
                    <View style={containerStyle.bottomPadding}>

                    </View>
                </View>
            )
    }
}



const containerStyle = StyleSheet.create({
    
    // CONTAINER

    container:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 250,
        paddingTop: 15
    },
    

    // TITLE

    titleContainer:{
        width: '100%',
        flex: 1,
    },title:{
        paddingLeft: 40,
        fontSize: 16,
        fontWeight: "bold"
    },


    // MAIN CONTENTS

    themeContainer:{
        flex: 7
    },


    //PADDING

    bottomPadding:{
        height: 10,
        width:'80%',
        borderBottomWidth:1,
        borderBottomColor:'#ccc'
    }
})
