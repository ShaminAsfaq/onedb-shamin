const _sys = require('../onedb/onedb_system');

const myType = {
    code: async (onedb_system) => {
        //  @author: Mr. Misa Simic
        const getDataType = (columns, columnName) => columns.find(col => col.column_name === columnName).data_type.replace(/serial/, 'integer')

        const getKeyArrayWithPrfix = (array, prefix) => {
            return array.map(col => `${prefix}.${col}`).join(',');
        }

        const generateCRUD = (sqlTableJSON) => {
            const { SchemaName: schemaName, TableName: tableName, columns, constraints } = sqlTableJSON;

            const keyArray = constraints
                .filter(cns => cns.type === 'PRIMARY KEY')[0].index_cols

            const keyWithT = getKeyArrayWithPrfix(keyArray, 't');
            const keyWithRow = getKeyArrayWithPrfix(keyArray, 'row');

            const key = keyArray.join(',');

            const columnArray = columns.map(col => col.column_name);

            let columnsWithCoalesce = columnArray.map(singleKey => `COALESCE(input.${singleKey}, existing.${singleKey}) as ${singleKey}`).join(',');
            columnsWithCoalesce = columnsWithCoalesce + ` FROM input LEFT JOIN ${schemaName}.${tableName} existing USING(${key})`;

            const value = keyArray.map(tempKey => {
                return "'${in_json." + tempKey + "}'::" + getDataType(columns, tempKey);
            }).join(',');

            const inJson = '${in_json}'
            const allColumNameSting = columns.map(col => col.column_name).join(',');

            const selectAll = `SELECT ${allColumNameSting} FROM ${schemaName}.${tableName}`;
            const selectOne = `${selectAll} WHERE (${key}) = (${value})`;
            const deleteOne = `DELETE FROM ${schemaName}.${tableName} where (${key}) = (${value})`;

            //  @author: Mr. Misa Simic
            const save = `WITH input (SELECT ${allColumNameSting} FROM json_populate_record(null::${schemaName}.${tableName}, '${inJson}')), row AS (SELECT ${columnsWithCoalesce}), deleted AS (DELETE FROM ${schemaName}.${tableName} t USING row WHERE (${keyWithT}) = (${keyWithRow})  RETURNING ${keyWithT},'update'::text AS _operation), inserted AS (INSERT INTO ${schemaName}.${tableName} SELECT ${columnWithRow} FROM row LEFT JOIN deleted USING (${key}) RETURNING ${key}) SELECT ${keyWithRow}, COALESCE(_operation, 'insert'::TEXT) AS _operation FROM row INNER JOIN inserted USING(${key}) LEFT JOIN deleted USING (${key})`;

            return {
                selectAll,
                selectOne,
                delete: deleteOne,
                save
            }
        }

        return generateCRUD;
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