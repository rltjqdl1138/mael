

module.exports = (app, fs) => {
    app.get('/api',(req,res)=>{
        res.send('Hello World~')

    });
    app.use('/api/account',         require('./account'))
    app.use('/api/authentication',  require('./authentication'))
    app.use('/api/category',        require('./category'))
    app.use('/api/media',           require('./media'))
    app.use('/api/notice',          require('./notice'))
    app.use('/api/payment',         require('./payment'))
    app.use('/api/plan',            require('./plan'))
    app.use('/music',               require('./music'))

}