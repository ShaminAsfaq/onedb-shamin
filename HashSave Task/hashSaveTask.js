const _sys = require('../onedb/onedb_system');

const myType = {
    code: async (onedb_system) => {
        const generateHashSave = (sqlTableJSON) => {
            const { SchemaName: schemaName, TableName: tableName, columns, constraints } = sqlTableJSON;

            const key = constraints
                .filter(cns => cns.type === 'PRIMARY KEY')[0].index_cols.join(',')
            
            const inJson = '${in_json}'
            const allColumNameSting = columns.map(col => col.column_name).join(',');


            const hashSave = `WITH input (SELECT ${allColumNameSting} FROM json_populate_record(null::${schemaName}.${tableName}, '${inJson}')), row AS (SELECT md5(input::text) AS row_id,${allColumNameSting} FROM input) INSERT INTO ${schemaName}.${tableName} SELECT row_id,${allColumNameSting} FROM input ON CONFLICT (row_id) DO NOTHING`;

            return {
                hashSave
            }
        }

        return generateHashSave;
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
        const tableDescription = {
            TableName: 'products',
            SchemaName: 'testbl1',
            columns: [
                {
                    column_name: 'product_no',
                    data_type: 'serial',
                    column_default: null,
                    is_nullable: 'NO'
                },
                {
                    column_name: 'name',
                    data_type: 'text',
                    column_default: null,
                    is_nullable: 'NO'
                }
            ],
            indexes: [],
            triggers: [],
            constraints: [
                {
                    name: 'products_pkey',
                    type: 'PRIMARY KEY',
                    index_cols: ['product_no', 'name'],
                    references: null
                }
            ]
        }

        console.log(myTest(tableDescription));
    }
    performTests()
}