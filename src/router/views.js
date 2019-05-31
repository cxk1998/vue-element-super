// login
export const Login = () => import( '../views/login');
// layout
export const Layout = () => import( '../views/layout/index');
// error
export const Error403 = () => import( '../views/error/403');
export const Error404 = () => import( '../views/error/404');
// home
export const Admin = () => import( '../views/home/admin');
// sysmgr
export const User = () => import( '../views/sysmgr/user');
export const Role = () => import( '../views/sysmgr/role');
export const Test = () => import( '../views/sysmgr/test');

// monitor
export const LoginLog = () => import( '../views/monitor/login-log');
