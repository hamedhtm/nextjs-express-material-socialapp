import Router from "next/router";
const redirectUser = (res, path) => {
  if (res) {
    res.redirect(302, path);
    res.finished = true;
    return { props: {} };
  }
  Router.replace(path);
  return { props: {} };
};
export const authInitialProps = async isProtectedRoute => ({
  req,
  res,
  query: { userId }
}) => {
  const isAuth = Boolean(req.user);
  const isAuthorize = req && req.user && userId === req.user._id.toString();
  const currentPath = req ? req.url : window.location.pathname;
  if (isProtectedRoute && !isAuth && !isAuthorize && currentPath !== "/signin") {
    return redirectUser(res, "/signin");
  }
  return { props: { isAuth, isAuthorize, userId: userId ? userId : {} } };
};
