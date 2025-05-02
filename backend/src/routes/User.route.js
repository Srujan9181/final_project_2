import framework from "express";
import {
  Signin as registerUser,
  editProfile as modifyUser,
  Login as authenticateUser,
  Addteammember as insertMember,
  fetchTeammembers as retrieveTeam,
  deleteMember as removeMember
} from '../controllers/User.controller.js';

const userPathway = framework.Router();

userPathway.post('/signup', registerUser);
userPathway.put('/signup', modifyUser);

userPathway.post('/login', authenticateUser);
userPathway.post('/member', insertMember);
userPathway.delete('/member', removeMember);
userPathway.get('/fetchmembers/:id', retrieveTeam);

export default userPathway;
