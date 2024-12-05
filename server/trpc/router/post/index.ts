import { router } from '@/server/trpc';
import { createPostProcedure } from './procedures/create';
import {
  getCountsByTagProcedure,
  getPostProcedure,
  getManyPostsProcedure,
} from './procedures/read';
import { updatePostProcedure } from './procedures/update';
import { deletePostProcedure } from './procedures/delete';

const postRouter = router({
  getCountsByTag: getCountsByTagProcedure,
  get: getPostProcedure,
  getMany: getManyPostsProcedure,
  create: createPostProcedure,
  update: updatePostProcedure,
  delete: deletePostProcedure,
});

export default postRouter;
