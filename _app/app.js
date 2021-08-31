var express = require('express')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var fs = require('fs');

var app = express()
app.set('view engine', 'ejs');

app.get('/photo', function (req, res) {
  var lfiles = [];
  var lm2il = [];
  var lm2ila = [];
  var lm2cyber = [];
  var lm2rsh = [];
  var lm2ccn = [];

  fs.readdirSync('../public/img/IL/').forEach(f => {
    lm2il.push({file: f, name : f.replace('.png','')})
    lfiles.push({file: '/public/img/IL/'+f, name : f.replace('.png','')})
  })
  fs.readdirSync('../public/img/ILA/').forEach(f => {
    lm2ila.push({file: f, name : f.replace('.png','')})
    lfiles.push({file: '/public/img/ILA/'+f, name : f.replace('.png','')})
  })
  fs.readdirSync('../public/img/Cyber/').forEach(f => {
    lm2cyber.push({file: f, name : f.replace('.png','')})
    lfiles.push({file: '/public/img/Cyber/'+f, name : f.replace('.png','')})
  })
  fs.readdirSync('../public/img/RSH/').forEach(f => {
    lm2rsh.push({file: f, name : f.replace('.png','')})
    lfiles.push({file: '/public/img/RSH/'+f, name : f.replace('.png','')})
  })
  fs.readdirSync('../public/img/CCN/').forEach(f => {
    lm2ccn.push({file: f, name : f.replace('.png','')})
    lfiles.push({file: '/public/img/CCN/'+f, name : f.replace('.png','')})
  })

  res.render('pages/M2IL',{ files: lfiles, m2il:lm2il,m2ila:lm2ila,m2cyber:lm2cyber,m2rsh:lm2rsh,m2ccn:lm2ccn});
});

app.post('/photo', upload.single('imageData'), function (req, res, next) {
  
 
  var b64string =  req.body.imageData.substring(22);
  var buf = Buffer.from(b64string, 'base64'); // Ta-da

  fs.writeFile('../public/img/'+req.body.spe+ '/' + req.body.lastname + '_' +req.body.firstname  + '.png' , buf, function(err) {
    if(err) {
        return console.log(err);
    }
  }); 

  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
    res.redirect('/photo');
})

app.listen(3002, function () {
  console.log('Example app listening on port 3000!')
})
