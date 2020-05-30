import React, {Component} from 'react'
import {View, Image} from 'react-native'
import networkHandler from '../networkHandler'
const frams = [
    require('../icon/frames/0.png'),
    require('../icon/frames/1.png'),
    require('../icon/frames/2.png'),
    require('../icon/frames/3.png'),
]
export default class AlbumArt extends Component{

    render(){
        const styles = this.props.style ? this.props.style : {flex:1}
        const type = this.props.type ? this.props.type : 0
        const url = this.props.url ? this.props.url : 'class'
        const imgStyle = {resizeMode:'contain', width:'100%', height:'100%', position:'absolute'}
        return (
            <View style={styles}>
                <Image source={{uri: networkHandler.url+'/image/'+url}}
                    style={[imgStyle, {borderWidth:1}]} />
                <Image source={frams[0]}
                    style={imgStyle} />
            </View>
        )
    }
}
