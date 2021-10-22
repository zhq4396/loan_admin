import router from "./index";
router.beforeEach((to, from, next) => {
  let path = to.path;
  if (path == "/login") {
    if (
      localStorage.getItem("sessionAdminId") ||
      localStorage.getItem("loanUserAdmin") ||
      localStorage.getItem("loanPageMenu")
    ) {
      next("/element");
    } else {
      next();
    }
  } else {
    next();
  }
});
