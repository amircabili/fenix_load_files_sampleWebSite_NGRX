 const jsonDAL = require('../DAL/jsonDAL');

 const getFiles = async function()
 {
     let resp = await jsonDAL.getFiles();
     let usersFromJson = resp; 
     return usersFromJson;
 }

 
const createFile = async function(obj)
{
    let resp = await jsonDAL.saveFile(obj)
    return "Created";
}

module.exports = {getFiles, createFile}
