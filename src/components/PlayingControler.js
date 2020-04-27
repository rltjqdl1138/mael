import React, {Component} from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import { AudioActions } from '../store/actionCreator'
import PlayingBar from './PlayingBar'

class PlayingControler extends Component{
    getButton = (props)=>{
        const { title, list } = props
        if(props.isPlaying === 1)
            return (
                <TouchableOpacity style={styles.buttonItem}
                    onPress={()=>{AudioActions.pause({infoNumber:1})}}>
                        <Image style={styles.buttonItemImage}
                            source={require('../icon/pause.png')} />
                </TouchableOpacity>
            )
        return (
            <TouchableOpacity style={styles.buttonItem}
                onPress={()=>{AudioActions.resume({infoNumber:1})}}>
                <Image style={styles.buttonItemImage}
                    source={require('../icon/play.png')} />
            </TouchableOpacity>
        )
    }
    getOptionText = (op)=>{
        switch(op){
            case 0:
                return '셔플재생'
            case 1:
                return '반복재생'
            case 2:
                return '순차재생'
        }
    }
    getPlayingBar = (playinfo, isPlaying)=>{
        if(this.isFirst)
            return(
                <View style={{height:30,width:'100%'}}>
                    <View style={{height:10}} />
                    <View style={styles.timeContainer}>
                        <Text style={styles.leftTimeText}>0:00</Text>
                        <Text style={styles.rightTimeText}>0:00</Text>
                    </View>
                </View>
            )
        return(<PlayingBar playinfo={playinfo} infoNumber={1} isPlaying={isPlaying} theme='gray'/>)
    }
    render(){
        const {newPlayinfo, isPlaying, getTime, index, playOption} = this.props
        const PLAYBACK_LIMIT = 5000
        return (
            <View style={styles.container}>
                <View style={styles.controlerContainer} >
                    {this.getPlayingBar(newPlayinfo, isPlaying)}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonItem}
                        onPress={()=>{AudioActions.changeOption()}}  >
                        <Image source={require('../icon/changeOption.png')}
                                style={styles.buttonItemImage} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonItem}
                        onPress={()=>{
                            if(getTime() < PLAYBACK_LIMIT)
                                AudioActions.replay()
                            else
                                AudioActions.next({infoNumber:1, index})
                        }}>
                        <Image style={styles.buttonItemImage}
                            source={require('../icon/previous.png')} />
                    </TouchableOpacity>

                    {this.getButton(this.props)}

                    <TouchableOpacity style={styles.buttonItem}
                        onPress={()=>{AudioActions.next({infoNumber:1}) }}>
                        
                        <Image style={styles.buttonItemImage}
                            source={require('../icon/next.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonItem}
                        onPress={()=>{alert(index)}}>
                        <Image source={require('../icon/add.png')}
                            style={styles.buttonItemImage} />
                        
                    </TouchableOpacity>
                </View>
                <View style={styles.optionContainer}>
                    <Text style={styles.optionText}>{this.getOptionText(playOption.option)}</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    controlerContainer:{
        height:30,
        width:'100%'
    },
    buttonContainer:{
        flex:1,
        flexDirection:'row',
        paddingLeft:25,
        paddingRight:25
    },
    buttonTestItem:{
        flex:1,
        height:'100%',
        borderWidth:1,
        borderColor:'#000',
        alignItems:'center',
        justifyContent:'center'
    },
    buttonItem:{
        flex:1,
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    buttonItemImage:{
        width:'70%',
        height:'70%',
        resizeMode:'contain'
    },

    timeContainer:{
        height:20,
        width:'100%',
        backgroundColor:'#fff',
        alignItems:'flex-end',
        flexDirection:'row'
    },
    leftTimeText:{
        flex:1,
        fontSize:10,
        textAlign:'left',
        paddingLeft:10
    },
  
    rightTimeText:{
        flex:1,
        fontSize:10,
        textAlign:'right',
        paddingRight:10
    },


    optionContainer:{
        height:40,
        width:'100%',
        justifyContent:'center'
    },
    optionText:{
        textAlign:'center',
        color:'#121111'
    },
    test1:{
        width:200,
        height:'100%',
        backgroundColor:'gray'
    },

    test2:{
        width:200,
        height:'100%',
        backgroundColor:'red'
    },

    test3:{
        width:200,
        height:'100%',
        backgroundColor:'blue'
    }
})
export default connect(
    ({audio})  =>({
        isPlaying: audio.isPlaying,
        newPlayinfo: audio.newPlayinfo,
        playOption: audio.playOption
    })
)(PlayingControler)