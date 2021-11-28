const _sys = require('../onedb/onedb_system') //


const myType = {
    code: async (onedb_system) => {
        //My Function body - my work	
              
        const fetchDataFromBrainz = await onedb_system.getType("fetchDataFromBrainz")
        

        return function(id) {
            const suburl = `event?artist=${id}&fmt=json`
            return fetchDataFromBrainz(suburl)
        }
        
        
    }

}



module.exports = myType




/****This part of code is used just for testing purposes while we write our code****/
if (!module.parent) {
	async function performTests(){
        _sys.setMyFolder(__filename)
		const myTest = await _sys.getType(__filename)
		console.log(await myTest('83d91898-7763-47d7-b03b-b92132375c47'))	
	}
	performTests()
} 


