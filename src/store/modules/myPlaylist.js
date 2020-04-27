import { createAction, handleActions } from 'redux-actions'

const LOAD = 'myPlaylist/LOAD'
const UPDATE = 'myPlaylist/UPDATE'
const DELETE_ITEM = 'myPlaylist/DELETE_ITEM'
const APPEND_ITEM = 'myPlaylist/APPEND_ITEM'
const REPLACE_ITEM = 'myPlaylist/REPLACE_ITEM'
const TURN_TO_LOAD = 'myPlaylist/TURN_TO_LOAD'
export const load = createAction(LOAD, value => value)
export const update = createAction(UPDATE, value => value)
export const deleteItem = createAction(DELETE_ITEM, value => value)
export const appendItem = createAction(APPEND_ITEM, value => value)
export const replaceItem = createAction(REPLACE_ITEM, value => value)
export const turnToLoad = createAction(TURN_TO_LOAD, value => value)

const initialState = {
    isLoaded:false,
    list:[]
}



export default handleActions({
    [LOAD]: (state, {payload})=>{
        const {list} = payload
        if( list )
            return {
                list,
                isLoaded:true
            }
        return { list:[], isLoaded:true }
    },
    [UPDATE]: (state, {payload}) =>{
        const {list} = payload
        if(!list)
            return state
        return {
            ...state,
            isLoaded:false,
            list
        }
    },
    [DELETE_ITEM]:(state, {payload}) => {
        const {index} = payload
        const {list} = state
        console.warn('delete')
        const frontList = list.slice(0,index)
        const backList = list.slice(index+1,list.length).map(item=>{
            return {...item, index:item.index-1}
        })
        return {
            ...state,
            isLoaded:false,
            list:[...frontList, ...backList]
        }
    },
    [APPEND_ITEM]:(state, {payload}) =>{
        const {list} = state
        const {items} = payload
        const itemlist = items.map((item,index)=>{
            const checkOverlap = (element) => element.ID === item.ID
            const isOverlap = list.findIndex(checkOverlap)
            if(isOverlap < 0)
                return {...item, index:list.length+index+1}
            return {...item, ID:Date.now() + ':' +item.ID, index:list.length+index+1}
            
        })
        return {
            ...state,
            isLoaded:false,
            list:[...list, ...itemlist]
        }
    },
    [REPLACE_ITEM]:(state,{payload})=>{
        const { list } = state
        const { ind1, ind2 } = payload
        
        const list1 = list.slice(0, ind1)
        const list2 = list.slice(ind1+1, ind2)
        const list3 = list.slice(ind2+1, list.length )
        console.warn('1:',list1)
        console.warn('2:',list2)
        console.warn('3:',list3)
        return {
            ...state,
            isLoaded:false,
            list:[...list1, list[ind2], ...list2, list[ind1], ...list3]
        }
    },
    [TURN_TO_LOAD]:(state)=>{
        return {
            ...state,
            isLoaded:true
        }
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

