# Routing

The routing system of Kiki is implemented with the `react-router-dom` V6.

## Adding new routes or updating routes

Both the routing function and routing data can be found in the `src/routes.js`. The design to separate routing data and routing function is delibrate. When it comes to updating the routes, you only need to understand how the routing data is prepared.

The are five fields of routing data that you need to understand:

* layout: the layout used by the view component
* routes: the child routes that share the same layout
* path: the path of the parent or child route
* component: the view component
* guard: the authentication redirection

When you update or add new routes, please try your best to group those routes that share the same layout together. For example, if several routes share the same layout, you can group them as follows:

```
  {
    layout: MainLayout,
    routes: [
      {
        path: "/",
        component: LandingView,
      },
      {
        path: "/login",
        component: lazy(() => import("views/LoginView")),
        guard: GuestGuard,
      },
      {
        path: "/register",
        component: lazy(() => import("views/RegisterView")),
        guard: GuestGuard,
      },
    ],
  },
```
All child routes are grouped in the `routes` as an array. You may notice that we used lazy loading to load most of the view components except for the landing page. 

Sometimes several routes may share the same layout and the namespace. In such a case, you can add a path field underneath the layout:

```
  {
    layout: DashboardLayout,
    path: "/projects",
    guard: AuthGuard,
    routes: [
      {
        component: lazy(() => import("views/ProjectsView")),
      },
      {
        path: "create",
        component: lazy(() => import("views/ProjectCreateView")),
      },
      {
        path: ":projectId",
        component: lazy(() => import("views/ProjectView")),
      },
    ],
  },
```

There are two things that are worth noting. First, all children routes will start with the namespace path `/projects`; The `path` of all child routes are relative, and only define the ending part. For example, the full path of the child route `create` is `/projects/create`. Similarly, the first child route has no relative path defined, so its full path is `/projects`. Second, when a group of routes happen to share the same authentication redirection, it can be applied to the layout so that you won't need to add it to every child route.


## Protecting routes

There are only two types of guard: `authGuard` and `GuestGuard`. 

When unauthenticated users attempt to visit such pages, `authGuard` will redirect the users to the login page. Vice versa, when authenticated users attempt to visit the login page, `GuestGuard` will redirect the users to the dashboard page.


