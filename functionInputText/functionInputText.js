const _sys = require('../onedb/onedb_system') //

const myType = {
    code: async (onedb_system) => {
        //My Function body - my work
        
        return (args) => {
            // RegEx to find onedb.methodName(args)
            const regex = "onedb.[a-zA-Z]*\\(\\'[a-z0-9\\-\\']*, cfg\\)";

            let outputArray = [];
            [...args.matchAll(regex)].forEach(item => {
                // console.log(item)
                const methodHeader = item[0];
                let method = methodHeader.split('onedb.')[1].split('(')[0];
                let args = methodHeader.split('(')[1].split(')')[0];

                const arrayOfLines = item.input.split('\n');

                let count = 0;
                arrayOfLines.forEach(line => {
                    ++count;    //  counting line number
                    if (line.includes(methodHeader)) {
                        outputArray.push({
                            line_id: count,
                            method, args
                        });
                    }
                })
            })
            return outputArray;
        };
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
        const someString = `let sql = ""
        for (let k in type.deploy.sql_tables) {
            const cfg = type.deploy.sql_tables[k]
            cfg.table_name = k
            const tbl = await onedb.getTypeInstance('74fd78e3-c2d3-56cc-9398-9aecc042f0fa', cfg)
            const tbl = await onedb.getTypeOnly('76fd89e3-c2d3-56cc-9398-9aecc042f0fa', cfg)
            const tbl_sql = await tbl.apply()
            if (tbl_sql) {
                sql += ';' + tbl_sql
            }
        }`;

        console.log(await myTest(someString));
    }
    performTests()
}