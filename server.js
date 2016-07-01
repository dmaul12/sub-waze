'use strict'
const express         = require('express')
const logger          = require('morgan')
const path            = require('path')

const app             = express()
const issues          = require('./routes/issues')
const PORT            = process.env.PORT || process.argv[2] || 3000
const env             = process.env.ENV_PROD || 'dev'
// don't need below
const isProd          = env === 'Production'

// set up logging so that we can see what's happening
app.use( logger('dev') )
app.use('/issues', issues)

// set up ejs to render the views
app.set('view engine', 'ejs')

// setting out static assets directory
app.use(express.static(path.join(__dirname,'public')));


app.listen(PORT, function(){

  // can just console log
  if(!isProd){
    console.log("server up and running on port ", PORT)
  }

})

/* ROUTES */

// home
app.get('/', function(req,res){
  res.render('home',{exits:{new_issue:'/issues/new'}})
})

