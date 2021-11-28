const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

const cfg = {
    "host": "tai.db.elephantsql.com",
    "port": 5432,
    "database": "mcpmmvsl",
    "user": "mcpmmvsl",
    "password": "K_LVuII-weldhm-JqcqcCJkaDC9J8HGB"
}

let p = new Pool(cfg)

let folder = "";
const onedb_system = {
	query: p.query,
	setMyFolder(file){
		folder = path.dirname(file);
	},
	getType(type_id) {
		const file = path.isAbsolute(type_id) ? type_id : path.join(folder, type_id)
		const t = require(file)
		return t.code(this)
	}
}

module.exports = onedb_system



/* Test that actuall connection to db works */
if (!module.parent) {
	p.query('SELECT now()').then(r=>console.log(r.rows))
}
/*end test - above block can be deleted*/
