const _sys = require('../onedb/onedb_system') //

const myType = {
    code: async (onedb_system) => {
        //My Function body - my work    

        const fetchData = await onedb_system.getType("fetchData")
        // console.log('Here 1');



        async function TestTask(id) {
            return fetchData(id)
                .then(j =>
                    j['release-groups']
                        .filter(i => !i['secondary-types'].includes('Compilation'))
                        .map(i => { return { title: i.title, date: i['first-release-date'] } })
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                )
        }

        return TestTask

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