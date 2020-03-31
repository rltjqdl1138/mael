import React, {Component} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'

export default class MusicPlayList extends Component{
    render(){
        const { musiclist, handleOpenLyric, handleCloseLyric, totalHeight } = this.props
        const musicItems = !musiclist ?
            (<Text> Blank </Text>):
            musiclist.map(
                item => {
                    const {index, title, lyric, lyricHeight} = item
                    return (
                        <MusicItem
                            key={title}
                            index={index}
                            title={title}
                            lyric={lyric}
                            lyricHeight={lyricHeight}
                            handleOpenLyric={handleOpenLyric}
                            handleCloseLyric={handleCloseLyric}
                            isPlaying={index-1 === this.props.index}
                        />
                    )
                }
            )
        return(
            <View style={[containerStyle.container], {height:totalHeight}}>
                { musicItems }
            </View>
        )
    }
}
const containerStyle = StyleSheet.create({
    container:{
        width:'100%'
    }
})
const MusicItem = (props)=>{
    const {isPlaying} = props
    const lyricHeight = props.lyricHeight ? props.lyricHeight : 0
    return(
        <View style={[itemStyle.container,{height:(74+lyricHeight)}]}>

            <View style={itemStyle.topPaddingContainer}>
                <View style={itemStyle.topPadding} />
            </View>
            <View style={itemStyle.mainContainer} >
                <View style={itemStyle.indexContainer}>
                    <Text style={itemStyle.indexText}>
                        {props.index}
                    </Text>
                </View>
                <View style={itemStyle.titleContainer}>
                    <Text style={isPlaying?itemStyle.chooseTitle:itemStyle.title}>
                        {props.title}
                    </Text>
                </View>
                <View style={itemStyle.openButtonContainer}>
                    <TouchableOpacity style={itemStyle.openButton}
                        onPress={()=>{
                            if(props.lyricHeight)
                                props.handleCloseLyric(props.index-1)
                            else
                                props.handleOpenLyric(props.index-1)
                        }}>
                        <Image style={itemStyle.openButtonImage} source={require('../icon/lyric.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[itemStyle.lyricContainer, {height:lyricHeight}]}>
                <Text style={itemStyle.lyric}>
                    {props.lyric}
                </Text>
            </View>
            <View style={itemStyle.bottomPadding} />
        </View>
    )
}
const itemStyle = StyleSheet.create({
    container:{
        width:'100%',
        justifyContent:"center",
        alignItems:'center'
    },
    mainContainer:{
        flexDirection:'row',
        flex:1,
    },
    indexContainer:{
        height:'100%',
        width:26,
        marginLeft:30,
        justifyContent:'center',
    },
    indexText:{
        color:'#121111',
        fontSize:15
    },
    titleContainer:{
        height:'100%',
        flex:1,
        justifyContent:'center'
    },
    title:{
        fontSize:15,
        color:'#121111'
    },
    chooseTitle:{
        fontSize:15,
        color:'#121111',
        fontWeight:'900'
    },
    openButtonContainer:{
        height:'100%',
        marginRight:20,
        width:50,
        
    },
    openButton:{
        width:'100%',
        height:'100%'
    },
    openButtonImage:{
        width:'100%',
        height:'100%',
        resizeMode:'contain'
    },

    lyricContainer:{
        width:'80%',
        //borderBottomColor:'#EAE8E8',
        //borderBottomWidth:1,

        justifyContent:"center",
    },
    lyric:{
        fontSize:13,
        textAlign:'center',
        lineHeight:20
    },
    topPaddingContainer:{
        width:'100%',
        height:1,
        paddingLeft:20,
        paddingRight:20
    },
    topPadding:{
        width:'100%',
        height:0,
        borderBottomColor:'#EAE8E8',
        borderBottomWidth:1
    },
    bottomPadding:{
        width:'100%',
        height:1,
        //borderBottomColor:'#EAE8E8',
        //borderBottomWidth:3
    }
})