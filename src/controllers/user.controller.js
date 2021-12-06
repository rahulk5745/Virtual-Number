const UserModel = require('../models/user.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const dotenv = require('dotenv');
//dotenv.config();

class UserController {
    getAllUsers = async (req, res, next) => {
        let userList = await UserModel.find({ parent: req.params.userId });
        if (!userList.length) {
            throw new HttpException(404, 'Users not found');
        }

        userList = userList.map(user => {
            return user;
        });
        const users = userList
        res.send({users});
    };

    getUserById = async (req, res, next) => {
        const parent = req.body.parent
        const user = await UserModel.findproile({ user_id: req.params.id });
        console.log(req.params.parent)
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;

        res.send(userWithoutPassword);
    };
    getDashboard = async (req, res, next) => {
        const user = await UserModel.findOne({ user_id: req.params.id});
        //console.log(req.params.id)
        if (!user) {
            throw new HttpException(404, 'User not found');
        }
        const id = user.user_id
        const data = await UserModel.proc_data({ id })
        //console.log(data)
        const data1 = data[0]
        //console.log(res)
        res.send({data1});
    };
    // deleteUser = async (req, res, next) => {
    //     const id = req.params.id
    //     const parent = req.body.parent
    //     const out_code = '@out_code'
    //     const out_str = '@out_str'
    //     const user = await UserModel.proc_delete({id,parent,out_code,out_str});
    //     //console.log(req.params.id)
    //     if (!user) {
    //         throw new HttpException(404, 'User not found');
    //     }
    //     // const id = user.user_id
    //     // const data = await UserModel.proc_data({ id })
    //     // //console.log(data)

    //     res.send({message:Deleted});
    // };
    // getAgentinfo = async (req, res, next) => {
    //     const user = await UserModel.findAgent();
    //     console.log(req.params.id)
    //     if (!user) {
    //         throw new HttpException(404, 'User not found');
    //     }

    //     //const { password, ...userWithoutPassword } = user;
    //     const id = user.dept_id
    //     console.log(id)
    //     const user1 = await UserModel.findagentDept({ dept_id: id })
        
    //     const deptname = user1.dept_name
    //     console.log(deptname)
    //     res.send({user});
        
    // };
    getAgentinfo = async (req, res, next) => {
        let agentList = await UserModel.findAgent();
        if (!agentList.length) {
            throw new HttpException(404, 'Users not found');
        }

        agentList = agentList.map(user => {
            return user;  
        });
        let list = []
        const agents = agentList
        res.send(agents);
        list = agents[0]

}
    
    getUserByuserName = async (req, res, next) => {
        const user = await UserModel.findOne({ username: req.params.username });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;

    }
    getCurrentUser = async (req, res, next) => {
        const { password, ...userWithoutPassword } = req.currentUser;

        res.send(userWithoutPassword);
    };


    createUser = async (req, res, next) => {
        
        await this.hashPassword(req);

        const username = req.body.username
        const password = req.body.password
        const packid = req.body.packid
        const parent = req.body.parent
        const name = req.body.name
        const number = req.body.number
        const emailid = req.body.emailid
        const address = req.body.address
        const pin = req.body.pin
        const company = req.body.company
        const flag = req.body.flag
        const logo = req.body.logo
        const domain = req.body.domain
        const service = req.body.service
        const out_code = '@out_code'
        const out_str = '@out_str'
        //console.log(req.body.name)
        //console.log(req.body)

        const user = await UserModel.proc_create({username,password,packid,parent,name,number,emailid,address,pin,company,flag,logo,domain,service,out_code,out_str });
        if (!user) {
                throw new HttpException(500, 'User Creation Failed');   
            }
        const data = await UserModel.findRole({username:username})
       //console.log(data.user_id)
       const id = data.user_id
        res.status(201).send({userId: id,message:'User Created Successfully'});
    };

    createAgent = async (req, res, next) => {

        const in_userid = req.body.in_userid
        const in_agentname = req.body.in_agentname
        const in_agentno = req.body.in_agentno
        const in_agentemail = req.body.in_agentemail
        const in_lc = req.body.in_lc
        const in_cc = req.body.in_cc
        const out_code = '@out_code'
        const out_str = '@out_str'
        
        const user  = await UserModel.proc_Agent({in_userid,in_agentname,in_agentno,in_agentemail,in_lc,in_cc,out_code,out_str});
        

        // const result = await UserModel.createAgent(req.body);
        if (!user) {
            throw new HttpException(500, 'Something went wrong');   
        }
        res.status(201).send({message:'Agent Configured Successfully'});
        };

    updateUser = async (req, res, next) => {
        //this.checkValidation(req);

        // await this.hashPassword(req);

        // const { confirm_password, ...restOfUpdates } = req.body;

        // do the update query and get the result
        // it can be partial edit
        const result = await UserModel.update(req.body, req.params.id);
        console.log(result)
        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;
        
        const message = !affectedRows ? 'Parameters Incorrect' :
        affectedRows && changedRows ? 'User Updated Successfully' : 'User Creation Failed';
    const user_id = req.params.id
    //console.log(user_id)
    res.send({ user_id:user_id,message:message });
        
    };

    deleteUser = async (req, res, next) => {
        const parent = req.body.parent
        const result = await UserModel.delete(req.params.id,parent);
        console.log(req.params.id)
        if (!result) {
            throw new HttpException(404, 'User not found');
        }
        res.send({message:"User Deleted Successfully"});
    };
    deleteAgent = async (req, res, next) => {
        const result = await UserModel.deleteAgent(req.params.id);
        console.log(req.params.id)
        if (!result) {
            throw new HttpException(404, 'User not found');
        }
        res.send({message:"Agent Deleted Successfully"});
    };

    userLogin = async (req, res, next) => {
        this.checkValidation(req);

        const { username, password: pass } = req.body;

        const user = await UserModel.findOne({ username });

        if (!user) {
            throw new HttpException(401, 'Unable to login!');
        }

        const isMatch = await bcrypt.compare(pass, user.password);

        if (!isMatch) {
            throw new HttpException(401, 'Bad credentials');
        }

        // user matched!
        const secretKey = "supersecret";
        const token = jwt.sign({ user_id: user.user_id.toString() }, secretKey, {
        //    const token = jwt.sign({id: user.id.toString() }, secretKey, {
            expiresIn: '96h'
        });
        const id = user.user_id
        const ID = id.toString()
        console.log(id)
       const a = await UserModel.findRole({user_id:id})
       console.log(a.ROLE)
        const { password, ...userWithoutPassword } = user;

        res.send({"message":"success",  "token":token,"userid":ID, "role":[a.ROLE] });
        res.status
    };


    agentlogin = async (req, res, next) => { 
    const result = await UserModel.findAgentproile(req.body.agentId,req.body.agentStatus);
    
    if (!result) {
        throw new HttpException(404, 'something went wrong');
    }

        const { affectedRows, changedRows, info } = result;
        

        const message = !affectedRows ? 'incorrect detsils entered' :
        affectedRows && changedRows ? 'User Updated Successfully' : 'Updated faild';
//     const user_id = req.params.id
//    console.log(result)     
//res.send({message:message});    
    

     if(affectedRows && changedRows == true) {
        const a = await UserModel.findAgents({agent_id:req.body.agentId},{status:req.body.agentStatus})
        //console.log(a)
           const status = a.status
           //console.log(status)
           if(a.agent_id == req.body.agentId){
               if(req.body.agentStatus == 0) {
                   res.send({message:"Agent logout Successfuly"})
                   console.log('logout')
               }
               else {
                   res.send({message:"Agent login Successfuly"})
                   console.log('login')
               }
               //console.log('match')
           }
           
       else{
           console.log('match')
       }
       
     }
     
     res.send({message:message})
    }
    
    report = async (req, res, next) => {
        const user = await UserModel.findreport({user_id:req.params.id });
        
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        res.send(user);
    };
    createDID= async (req, res, next) => {
   
        

        const result = await UserModel.createDID(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');   
        }

        res.status(201).send({message:'DID Bought Successfully'});
    };

    DIDList = async (req, res, next) => {
        const user = await UserModel.findDID({type:req.params.type });
        console.log(user)
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        res.send(user);
    };


    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

    // hash password if it exists
    hashPassword = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 6);
        }
    
}
}



module.exports = new UserController;