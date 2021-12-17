const express = require('express');
const router = express.Router();
const filesBL = require('../models/filesBL');
 

router.get('/',async (req, res)=> {
      let files = await filesBL.getFiles();
      return res.json(files)
     // res.send('Created');
})

router.post('/addFile', async function(req, res, next) {
debugger;

 
      let status = await filesBL.createFile(req.body)
      console.log(status);
      res.send('File Created');
  
  });

  
module.exports = router;