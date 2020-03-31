import { createAction, handleActions } from 'redux-actions'
import { MyPlaylistActions } from '../actionCreator'

const LOAD = 'myPlaylist/LOAD'
const UPDATE = 'myPlaylist/UPDATE'
const DELETE_LIST = 'myPlaylist/DELETE_LIST'

export const load = createAction(LOAD, value => value)
export const update = createAction(UPDATE, value => value)
export const deleteList = createAction(DELETE_LIST, value => value)

const isLoaded={success:false}
const initialState = {
    isLoaded:isLoaded,
    list:[]
}
export default handleActions({
    [LOAD]: (state, {payload})=>{
        const {token} = payload
        setTimeout(()=>{
            isLoaded.success=true
            MyPlaylistActions.update(lists)
        },3000)

        return {
            ...state,
            isLoaded: state.isLoaded
        }
    },
    [UPDATE]: (state, {payload}) =>{
        const {list} = payload
        if(!state.isLoaded.success)
            return state
        return {
            ...state,
            list
        }
    },
    [DELETE_LIST]:(state, {payload}) => {
        return state
    }

}, initialState)





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

