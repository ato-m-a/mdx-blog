import { toast as t } from 'sonner';

const toast = {
  login_success: () => t.success('성공적으로 로그인했습니다.'),
  login_failed: () =>
    t.error('로그인에 실패했습니다.', { description: '패스워드가 올바르지 않습니다.' }),
  logout_success: () => t.success('성공적으로 로그아웃 했습니다.'),
  logout_failed: () => t.error('세션이 이미 만료되었습니다.'),
  extend_success: () => t.success('세션을 성공적으로 연장했습니다.'),
  extend_failed: () => t.error('세션 연장에 실패했습니다.'),
} as const;

export default toast;
