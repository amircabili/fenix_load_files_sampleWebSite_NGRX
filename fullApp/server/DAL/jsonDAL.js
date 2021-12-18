const jsonfile = require('jsonfile')

const getFiles = function()
 {
     return new Promise((resolve,reject) =>
     {
        jsonfile.readFile(__dirname + "/files.json", (err, data) =>
         {
             if(err)
             {
                 reject(err);
             }
             else
             {
                 resolve(data)
             }
         })
     })
 }


 const saveFile = function(obj)
{
    return new Promise((resolve,reject) =>
    {

        jsonfile.writeFileSync(__dirname + "/files.json",obj, function(err)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve("Created");
            }
        })
    })
    
}

module.exports = {getFiles,saveFile}

