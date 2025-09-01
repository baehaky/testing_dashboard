import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/auth/LoginView.vue"),
    },
    {
      path: "/dashboard",
      component: () => import("../layouts/admin/DashboardLayout.vue"),
      meta: { requiresAuth: true, roles: ["SuperAdmin"] },
      children: [
        {
          path: "",
          name: "dashboard",
          component: () => import("../views/admin/DashboardView.vue"),
        },
        {
          path: "addproject",
          name: "addproject",
          component: () => import("../views/admin/TambahProject.vue"),
        },
        {
          path: "reportlist",
          name: "reportlist",
          component: () => import("../views/admin/ReportList.vue"),
        },
        {
          path: "reportview",
          name: "reportview",
          component: () => import("../views/admin/ReportView.vue"),
        },
        {
          path: "detailproject",
          name: "detailproject",
          component: () => import("../views/admin/DetailProject.vue"),
        },
        {
          path: "allproject",
          name: "allproject",
          component: () => import("../views/admin/AllProjectView.vue"),
        },
        {
          path: "alluser",
          name: "alluser",
          component: () => import("../views/admin/ListSemuaPengguna.vue"),
        },
        {
          path: "editproject/:id",
          name: "editproject",
          component: () => import("../views/admin/EditProject.vue"),
        },
      ],
    },
    {
      path: "/kontraktordashboard",
      name: "kontraktordashboard",
      meta: { requiresAuth: true, roles: ["Kontraktor"] },
      component: () => import("../views/users/KontraktorDashboard.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

// Guard untuk proteksi route
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  console.log("Navigating to:", to.name, "from:", from.name);

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return next({ name: "login" });
  }

  if (to.name === "login" && auth.isLoggedIn) {
    return next({ name: "dashboard" });
  }

  if (to.meta.roles && !to.meta.roles.includes(auth.userRole)) {
    return next({ name: "notfound" }); // atau redirect ke halaman "403 Forbidden"
  }

  next();
});

export default router;
