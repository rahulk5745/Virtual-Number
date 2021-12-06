const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
//const Role = require('../controllers/userRoles.utils');
class UserModel {
    tableName = 'users';
    tableName1 = 'user_details'
    tableName2 = 'user_roles'
    tableName3 = 'agents'

    proc_data = async (params)=>{
        const { columnSet, values } = multipleColumnSet(params)
        let sql= `call proc_dashboard(?)`
        const result = await query(sql, [...values]);
        return result[0]
    }



    proc_create = async (params)=>{
        const { values } = multipleColumnSet(params)
        let sql= `call proc_createUser (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
        const result = await query(sql, [...values]);
        return result    

    }
    proc_Agent = async (params)=>{
        const { values } = multipleColumnSet(params)
        let sql= `call proc_createAgent (?,?,?,?,?,?,?,?)`
        const result = await query(sql, [...values]);
        return result    

    }

    // proc_delete = async (params)=>{
    //     const { values } = multipleColumnSet(params)
    //     let sql= `call proc_deleteUser(?,?,?,?)`
    //     const result = await query(sql, [...values]);
    //     return result    

    // }
    find = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        let sql = `SELECT * FROM user_details WHERE ${columnSet}`;

        const result = await query(sql, [...values]);
        //return await query(sql);
        return result;
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM users
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }
    findRole = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM user_roles
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }


    findAgents = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM agents
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    findagentDept = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        
        const sql = `SELECT * FROM departments
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }
    findproile = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = ` SELECT * FROM user_details
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }
    
    
    findAgent = async () => {
        let sql = `SELECT * FROM agents`;

        
        return await query(sql);
        
    }
    findAgentproile = async (agentID,agentStatus) => {
        //const { columnSet, values } = multipleColumnSet(params)

        
        //const sql = `UPDATE users_details SET ${columnSet} WHERE user_id = ?`;
        ///UPDATE some_table SET an_int_value = (an_int_value==1 ? 0 : 1);
        const sql = `UPDATE agents SET status = IF(status=1, 0, 1) WHERE  agent_id = ? AND status = ?`

        const result = await query(sql, [agentID,agentStatus]);

        // return back the first row (user)
        return result;
    }

 
    createAgent = async ({agent_name, country_code , phone_no }) => {
        const sql = `INSERT INTO agents
        (user_id,agent_name, country_code, phone_no) VALUES (?,?,?)`;

        const result = await query(sql, [agent_name, country_code, phone_no,]);
        const affectedRows = result ? result.affectedRows : 0;
        //return result, affectedRows
        return affectedRows;
    }
    findreport = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM attempts
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result;
    }
    createDID = async ({ id,did,type}) => {
        const sql = `INSERT INTO dids
        (id,did,type) VALUES (?,?,?)`;

        const result = await query(sql, [id,did,type]);
        const affectedRows = result ? result.affectedRows : 0;
        //return result, affectedRows
        return affectedRows;
    }
    findDID = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM dids
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result;
    }
    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE user_details SET ${columnSet} WHERE user_id = ?`;

        const result = await query(sql, [...values, id]);
                return result;
    }

    delete = async (id,parent) => {
        const sql = `DELETE FROM user_details
        WHERE user_id = ? AND parent = ? `;
        const result = await query(sql, [id,parent]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
    deleteAgent = async (id) => {
        const sql = `DELETE FROM agents
        WHERE agent_id = ? `;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new UserModel;