import React, {Component} from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, Button, AsyncStorage, Constants } from 'react-native';
import { connect } from 'react-redux'
import { AuthenticationActions, AudioActions, MyPlaylistActions, ThemeActions  } from '../store/actionCreator'

import HeaderContainer from '../containers/HeaderContainer'
import SearchContainer from '../containers/SearchContainer'
import MainContainer from '../containers/MainContainer'
import AlbumContainer from '../containers/AlbumContainer';
import deviceCheck from '../deviceCheck'
import PlayingPage from './PlayingPage'
import MyPlaylistPage from './MyPlaylistPage'
import SidebarPage from './SidebarPage'
import {Route, Navigator} from '../navigator/navigator'
import {Audio} from 'expo-av'

import networkHandler from '../networkHandler'


const SHUFFLE = 0
const REPEAT = 1
const SEQUENTE = 2


class MainPage extends Component {
    constructor(props){
        super(props)
        this.state = {isLoaded:false, searchOpen:false}
    }
    componentDidMount(){
        this.loadMyPlaylist()
        this.loadAuthentication()
        this.loadThemeList()
        this.loadSoundObject()
        this.setState((state)=>({...state,isLoaded:true}))
    }
    loadSoundObject = async()=>{
        try{
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS:true,
                staysActiveInBackground:true,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX
            })
            const soundObject = new Audio.Sound()
            await soundObject.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
            await AudioActions.initialize({soundObject})
        }catch(e){
            console.warn(e)
        }
    }
    onPlaybackStatusUpdate = playbackStatus =>{
        if (!playbackStatus.isLoaded) {
            if (playbackStatus.error) {
                console.warn(`Encountered a fatal error during playback: ${playbackStatus.error}`);
            }
        } else if(playbackStatus.didJustFinish){
            switch(this.props.playOption.option){
                case SHUFFLE:
                    console.warn('shuffle')
                    AudioActions.next({})
                    break;
                case REPEAT:
                    console.warn('repeat')
                    AudioActions.jump({ms:0})
                    break
                case SEQUENTE:
                    console.warn('sequence')
                    AudioActions.next({})
            }
        }else if (playbackStatus.isPlaying){
            if(!this.props.isMusicLoaded) AudioActions.turnToPlay()
            AudioActions.timing({ms:playbackStatus.positionMillis, duration:playbackStatus.durationMillis})
            //AudioActions.newtiming({ms:playbackStatus.positionMillis, duration:playbackStatus.durationMillis})
            //newtiming({ms:playbackStatus.positionMillis, duration:playbackStatus.durationMillis})
            //store.dispatch(newtiming({ms:playbackStatus.positionMillis, duration:playbackStatus.durationMillis}))
        }
    }
    loadMyPlaylist = async() =>{
        const data = await networkHandler.music.getMusicList(1)
        if(!data || !data.musics || !data.album)
            console.warn(data)
        else
            MyPlaylistActions.load({list:data.musics})
    }

    loadMyPlaylist = async() =>{
        const data = await networkHandler.music.getMusicList(1)
        if(!data || !data.musics || !data.album)
            console.warn(data)
        else
            MyPlaylistActions.load({list:data.musics})
    }
    loadAuthentication = async() =>{
        const _result = await AsyncStorage.getItem('@MySuperStore:token')
        const result = JSON.parse(_result)
        if( result && result.token ){
            const data = await networkHandler.account.checkToken(result.token)
            if(data && data.success)
                AuthenticationActions.initialize(result)
        }
        return true
    }
    loadThemeList = async() =>{
        const data = await networkHandler.music.getMainThemeList()
        if(data && data.success && data.result){
            const {result} = data
            ThemeActions.update(result)
        }
    }
    screenHeight = Dimensions.get('window').height
    getMusicList = () =>{
        const {themeList} = this.props
        const themeTitle = themeList.map(dat=>({
            ID:dat.ID,
            title:dat.title
        }))
        const list = [...themeTitle]
        return list
    }
    handleSearch = (setting) =>{
        this.setState((state)=>({
            ...state,
            searchOpen: setting
        }))
    }
    handleLogin = async (id, password)=>{
        try{
            const data = await networkHandler.account.Login(id, password)
            const {success, token, username} = data
            if(success)
                await AuthenticationActions.login({token, username})
            
            return success
        }catch(e){
            return false
        }
    }
    handleLogout = ()=>{
        AuthenticationActions.logout()
    }


    handleWholePush = (name, config) => {
        const {navList} = this.props
        navList['App'].push(name, config)
    }
    handleWholePop = (name)=>{
        const {navList} = this.props
        navList['App'].pop(name)
    }


    handleMainPush = (name, config) =>{
        const {navList} = this.props
        if(!navList['mainPage'])
            console.warn('handleSidebar: navList null')
        else
            navList['mainPage'].push(name, {...config, token:this.props.token})
    }

    handleMainPop = (name)=>{
        const {navList} = this.props
        if(!navList['mainPage'])
            console.warn('handleSidebar: navList null')
        else{
            navList['mainPage'].pop(name)
        }
    }

    render(){
        const {isLogin, token, username, showPlaybar} = this.props
        const {handleMainPush, handleMainPop, handleWholePush, handleWholePop, getMusicList, handleSearch} = this
        const headerPos = 60+deviceCheck.getTopPadding()
        const musicList = getMusicList()
        return(
            <View style={styles.container}>
                <View style={[styles.mainscreenContainer,{top:headerPos}]}>
                    <Navigator id="mainPage">
                        <Route name="MainContainer" component={MainContainer} />
                        <Route name="MyPlaylistPage" component={MyPlaylistPage} />
                        <Route name="AlbumContainer" component={AlbumContainer} />
                    </Navigator>
                    <View style={showPlaybar? styles.bottomPadding:styles.hideBottomPadding} />
                </View>
                <View style={[styles.header,{height:headerPos}]}>
                    <View style={{borderColor:'#fff',borderWidth:1,height:deviceCheck.getTopPadding()}} />
                    <HeaderContainer
                        handleSidebar={this.props.handler.open}
                        handlePop={handleMainPop}
                        handleSearch={handleSearch}
                    />
                </View>
                <PlayingPage headerPos={headerPos} />
                <SearchContainer handler={handleSearch} searchOpen={this.state.searchOpen} headerPos={headerPos}/>
                <SidebarPage
                    isLogin={isLogin}
                    handleLogin={this.handleLogin}
                    handleLogout={this.handleLogout}
                    username={username}
                    token={token}
                    handleMainPush={handleMainPush}
                    handleWholePush={handleWholePush}
                    musicList={musicList}  />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    
    // HEADER
    header:{
        position:'absolute',
        top:0,
        width:'100%',
        backgroundColor:'#fff'
    },

    // MAIN SCREEN
    mainscreenContainer:{
        flex:1,
        width:'100%',
    },

    bottomPadding:{
        height:deviceCheck.ifTopbarless?215:180,
        width:'100%',
    },
    hideBottomPadding:{
        height:deviceCheck.ifTopbarless?100:20,
        width:'100%',
    },

});


export default connect(
    (state)  =>({
        themeList: state.theme.list,
        isLogin: state.authentication.isLogin,
        token: state.authentication.token,
        username: state.authentication.username,
        handler: state.sidebar.handler,
        navList: state.navigator.navList,
        showPlaybar: state.audio.showPlaybar,
        playOption: state.audio.playOption,
        isMusicLoaded: state.audio.isLoaded
    })
)(MainPage)
//export default MainPage




const lists = [
    {
        index:1,
        title:'Base 2 Base',
        lyric:faded,
        lyricLine:38,
        lyricHeight:0,
        url:'base2base'
    },
    {
        index:2,
        title:'Evans',
        lyric:shapeofyou,
        lyricLine:20,
        lyricHeight:0,
        url:'evans'
    },
    {
        index:3,
        title:'Flower',
        lyric:'Tree Under Stars 가사',
        lyricLine:1,
        lyricHeight:0,
        url:'flower'
    },
    {
        index:4,
        title:'Heavenly Moon',
        lyric:'Say Your Feelings 가사',
        lyricLine:1,
        lyricHeight:0,
        url:'heavenlymoon'
    },

    {
        index:5,
        title:'Far ease Nightbird',
        lyric:'Jungle Hunters 가사',
        lyricLine:1,
        lyricHeight:0,
        url:'nightbird'
    },

    {
        index:6,
        title:'Polaris',
        lyric:'We are Family 가사',
        lyricLine:1,
        lyricHeight:0,
        url:'polaris'
    }
]


const shapeofyou = `The club isn't the best place to find a lover
So the bar is where I go
Me and my friends at the table doing shots
Drinking fast and then we talk slow
Come over and start up a conversation with just me
And trust me I'll give it a chance now
Take my hand, stop, put Van the Man on the jukebox
And then we start to dance, and now I'm singing like
Girl, you know I want your love
Your love was handmade for somebody like me
Come on now, follow my lead
I may be crazy, don't mind me
Say, boy, let's not talk too much
Grab on my waist and put that body on me
Come on now, follow my lead
Come, come on now, follow my lead
I'm in love with the shape of you
We push and pull like a magnet do
Although my heart is falling too
I'm in love with your body
And last night you were in my room
And now my bedsheets smell like you
Every day discovering something brand new`

const faded = `You were the shadow to my light
Did you feel us
Another start
You fade away
Afraid our aim is out of sight
Wanna see us
Alive
Where are you now
Where are you now
Where are you now
Was it all in my fantasy
Where are you now
Were you only imaginary
Where are you now
Atlantis
Under the sea
Under the sea
Where are you now
Another dream
The monsters running wild inside of me
I'm faded
I'm faded
So lost
I'm faded
I'm faded
So lost
I'm faded
These shallow waters, never met
What I needed
I'm letting go
A deeper dive
Eternal silence of the sea
I'm breathing
Alive
Where are you now
Where are you now
Under the bright
But…`
