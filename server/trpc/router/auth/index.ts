import { router } from '@/server/trpc';
import { loginProcedure } from './procedures/create';
import { checkPermissionProcedure, getExpiryProcedure } from './procedures/read';
import { extendSessionProcedure } from './procedures/update';
import { logoutProcedure } from './procedures/delete';

const authRouter = router({
  login: loginProcedure,
  logout: logoutProcedure,
  checkPermission: checkPermissionProcedure,
  getExpiry: getExpiryProcedure,
  extendSession: extendSessionProcedure,
});

export default authRouter;
