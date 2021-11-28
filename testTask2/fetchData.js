const _sys = require('../onedb/onedb_system') //
const axios = require('axios')


const myType = {
    code: async (onedb_system) => {
        //My Function body - my work    

        const fetchData = async function (id) {
            // const fetch = (await import("node-fetch")).default //this line added just because of NodeJS - in browsers - not needed
            const api_url = `http://musicbrainz.org/ws/2/artist/${id}?fmt=json&inc=release-groups`;
            return axios.get(api_url).then(r => r.data)
        }

        return fetchData

    }

}



module.exports = myType




/****This part of code is used just for testing purposes while we write our code****/
if (!module.parent) {
    async function performTests() {
        _sys.setMyFolder(__filename)
        const myTest = await _sys.getType(__filename)
        console.log(await myTest('83d91898-7763-47d7-b03b-b92132375c47'))
    }
    performTests()
}