const _sys = require('../onedb/onedb_system') //

const myType = {
    code: async (onedb_system) => {
        //My Function body - my work	

        return await onedb_system.getType('brainzService');

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


        await myTest.artist_albums('83d91898-7763-47d7-b03b-b92132375c47')
            .then(
                j => j['release-groups'].filter(i => !i['secondary-types'].includes('Compilation'))
                    .map(i => { return { title: i.title, date: i['first-release-date'] } })
                    .sort((a, b) => a.date < b.date ? -1 : 1)
            ).then(r => console.log(r))
            .then(r => console.log('---'))

        await myTest.artist_concerts('83d91898-7763-47d7-b03b-b92132375c47')
            .then(
                j => j['events'].filter(i => i['type'] === 'Concert')
                    .map(i => { return { name: i.name, time: i.time, begin: i['life-span'].begin, end: i['life-span'].end } })
            )
            .then(r => console.log(r))
            .then(r => console.log('---'))

    }
    performTests()
}

