const _sys = require('../onedb/onedb_system') //
const axios = require('axios')

const myType = {
    code: async (onedb_system) => {
        //My Function body - my work	

        const mainUrl = `http://musicbrainz.org/ws/2/`
        const fetchData = async function (suburl) {
            url = mainUrl + suburl
            return axios.get(url).then(r => r.data)
        }

        const service = {
            fetchData,
            artist_albums(id) {
                const suburl = 'artist/' + id + '?fmt=json&inc=release-groups'
                return fetchData(suburl)
            },
            artist_concerts(id) {
                const suburl = 'event?artist=' + id + '&fmt=json'
                return fetchData(suburl)
            }
        }
        return service
    }
}

module.exports = myType

/****This part of code is used just for testing purposes while we write our code****/
if (!module.parent) {
    async function performTests() {
        _sys.setMyFolder(__filename)
        const myTest = await _sys.getType(__filename)
        /*Here goes the testing code. Dpeends on what we are writing, but of we are writting some function... 
          the code should be:
          myTest(args)
        */
        // console.log(myTest)
        console.log(await myTest.fetchData('artist/83d91898-7763-47d7-b03b-b92132375c47?fmt=json&inc=release-groups'))
    }
    performTests()
}