const database = require("./index")
module.exports = class musicDB extends database {
    constructor(location, host='localhost', port=2424){
        super(location, host, port);
    }
    async getAlbumGroupList(){
        const {dbSession} = this
        try{
            const result = await dbSession.query("Select * from AlbumGroup").all()
            return result
        }catch(e){
            console.log(e)
            return []
        }
    }
    async getAlbumTitle(){
        const {dbSession} = this
        try{
            const result = await dbSession.query("Select ID, title, groupID from Album").all()
            return result
        }catch(e){
            console.log(e)
            return []
        }
    }
    async getAlbumListByGroupID(groupID){
        const {dbSession} = this
        try{
            const result = await dbSession.query("Select * from Album where groupID=:groupID",{params:{groupID}}).all()
            return result
        }catch(e){
            console.log(e)
            return []
        }
    }

    async getMusicListByAlbumID(albumID){
        const {dbSession} = this
        try{
            const album = await dbSession.query("Select * from Album where ID=:albumID",{params:{albumID}}).one()
            const musics = await dbSession.query("Select * from Music where albumID=:albumID",{params:{albumID}}).all()
            return {album,musics}
        }catch(e){
            console.log(e)
            return { album:{}, musics:[] }
        }
    }

    async getMusicTitlesByAlbumID(albumID){
        const {dbSession} = this
        try{
            const result = await dbSession.query("Select MID, title, index from Music where albumID=:albumID",{params:{albumID}}).all()
            return result
        }catch(e){
            console.log(e)
            return []
        }

    }
    async findMusicByTitle(title){
        const {dbSession} = this
        try{
            const result = await dbSession.query('Select * from Music where title=:title', {params:{title}}).one()
            return result
        }catch(e){
            console.log(e)
            return []
        }
    }
    async registerMusic(payload){

        const {albumID, index, title, info, type, artImg, lyric} = payload;
        const {dbSession} = this
        try{
            const _albumID = albumID ? albumID : 0
            const _index = index ? index : 0
            const _type = type ? type : 0
            const _info = info ? info : ''
            const _lyric = lyric ? lyric : ''
            const _artImg = artImg ? artImg : ''
            
            const len = await dbSession.query('Select MID from Music').all()
            const result = await dbSession.command('Insert into Music set MID=:MID, albumID=:albumID, index=:index, title=:title, info=:info, type=:type, artImg=:artImg, lyric=:lyric',
                                        {params:{ MID: len.length + 1, albumID: _albumID, index: _index, title, info: _info, type: _type, artImg:_artImg, lyric:_lyric  }})
            console.log(result)
        }catch(e){
            console.log(result)
        }
    }

    
}