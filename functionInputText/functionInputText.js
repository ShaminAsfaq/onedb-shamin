const _sys = require('../onedb/onedb_system') //

const myType = {
    code: async (onedb_system) => {
        //My Function body - my work
        let sql = ""
        // for (let k in type.deploy.sql_tables) {
        //     const cfg = type.deploy.sql_tables[k]
        //     cfg.table_name = k
        //     const tbl = await onedb.getTypeInstance('74fd78e3-c2d3-56cc-9398-9aecc042f0fa', cfg)
        //     const tbl_sql = await tbl.apply()
        //     if (tbl_sql) {
        //         sql += ';' + tbl_sql
        //     }
        // }
        return 'Helo World';
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
        console.log(await myTest)
    }
    performTests()
}