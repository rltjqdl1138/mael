import React, {Component} from 'react'
import { StyleSheet, Image, Text, View, TouchableOpacity,ScrollView,Dimensions } from 'react-native';
const {width} = Dimensions.get('window')


class MostlyItem extends Component {
    render(){
        const conf = {
            title:this.props.title,
            temp:'aaa'
        }
        const {navigator} = this.props
        return(
            <TouchableOpacity style={itemStyle.container}
                onPress={()=>{navigator.push('AlbumContainer',conf)}}>

                <View style={itemStyle.imageContainer}>

                    <Image style={itemStyle.image}
                        source={require('../image/owl2.jpg')}
                    />
                    <Image style={itemStyle.circle}
                        source={require('../image/circle.png')}
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
        paddingLeft: 10,
        justifyContent:'center',
        alignItems:'center'
    },

    imageContainer:{
        flex:5,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    circle:{
        position:'absolute',
        width:'100%',
        height:'100%',
        resizeMode:'contain',
    },
    image:{
        position:'absolute',
        width:'50%',
        resizeMode:'contain',
    },


    titleContainer:{
        width:'100%',
        flex:1,
    },
    title:{
        fontSize: 14,
        color:'#121111',
        textAlign:'center'
    }
})

export default class Mostly extends Component{
    render(){
        const {mostlylist, navigator} = this.props
        const mostlyItems = !mostlylist ?
            (<Text> Blank </Text>):
            mostlylist.map(
                mostly => {
                    const {MID, imageURL, title} = mostly
                    return (
                        <MostlyItem
                            key={MID}
                            MID={MID}
                            imageURL={imageURL}
                            title={title}
                            navigator={navigator}
                        />
                    )
                }
            )
            return(
                <View style={containerStyle.container}>
                    <ScrollView style={containerStyle.scroll}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>

                    <View style={containerStyle.itemPadding}/>
                        { mostlyItems }

                        <View style={containerStyle.itemPadding}/>
                    </ScrollView>
                </View>
            )
    }
}

const containerStyle = StyleSheet.create({
    container:{
        height:'100%',
        width:'100%'
    },
    scroll:{
        height:'100%'
    },
    itemPadding:{
        width:20,
        height:'100%'
    }
})