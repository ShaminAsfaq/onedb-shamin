const _sys = require('../onedb/onedb_system') //

const myType = {
    code: async (onedb_system) => {
        //My Function body - my work	

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
    }
    performTests()
}