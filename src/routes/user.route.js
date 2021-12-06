const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');


router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin));
router.get('/app/user/:userId',auth(), awaitHandlerFactory(userController.getAllUsers));
router.get('/app/user/profile/:id', auth(), awaitHandlerFactory(userController.getUserById));
router.get('/app/dashboard/:id', auth(), userController.getDashboard); 


router.post('/app/register', createUserSchema, awaitHandlerFactory(userController.createUser)); 
router.patch('/app/user/update/:id', auth(), updateUserSchema, awaitHandlerFactory(userController.updateUser)); 
router.delete('/app/user/:id', auth(), awaitHandlerFactory(userController.deleteUser)); 
router.get('/app/agent/list/',auth(),awaitHandlerFactory(userController.getAgentinfo))
router.delete('/app/agent/:id',auth(),awaitHandlerFactory(userController.deleteAgent))
router.post('/app/agent/',auth(),awaitHandlerFactory(userController.createAgent))
router.post('/app/agent/login',auth(),awaitHandlerFactory(userController.agentlogin))
router.get('/app/report/:id',auth(),awaitHandlerFactory(userController.report))
router.post('/app/did/buy',auth(),awaitHandlerFactory(userController.createDID))
router.get('/app/did/:type',auth(),awaitHandlerFactory(userController.DIDList))
//router.get('/me', auth(), awaitHandlerFactory(userController.getCurrentUser))
module.exports = router;