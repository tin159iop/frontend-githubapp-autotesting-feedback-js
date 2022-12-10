# Kiki: A lightweight React admin template

[![License](https://img.shields.io/:license-mit-blue.svg?style=flat)](https://opensource.org/licenses/MIT)

Kiki is a React admin template bootstraped with Create-React-App. You can check out the features of Kiki at [https://kiki-admin-template.web.app/](https://kiki-admin-template.web.app/).

📚 [Documentation](#documentation) - 🚀 [Getting Started](#getting-started)

### Documentation

* [Getting started](#getting-started)
* [Routing](#routing)
* [Authentication](#authentication)
* [Theming](#theming)
* [API](#apis)
* [Deployment](#deployment)

### Getting started

You can follow two steps to run Kiki in the development server:

#### Install the dependencies

To install dependencies, please navigate into this folder, and run `npm install` in your terminal:

```
cd kiki-admin-template
npm install
```

#### Run the development server

After installing all the dependencies, you can run the admin template by running `npm start` in the terminal.

```
npm start
```

You will see something as follows:

```
Compiled successfully!

You can now view kiki in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.86.54:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

### Routing

The routing system of Kiki is implemented with the `react-router-dom` V6.

#### Adding new routes or updating routes

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

#### Protecting routes

There are only two types of guard: `authGuard` and `GuestGuard`. 

When unauthenticated users attempt to visit such pages, `authGuard` will redirect the users to the login page. Vice versa, when authenticated users attempt to visit the login page, `GuestGuard` will redirect the users to the dashboard page.

### Authentication

The authentication system of Kiki is implemented with [JSON Web Token](https://jwt.io/).

#### JSON Web Token

JSON Web Token (JWT) is used to generate, sign and verify authentication tokens. JWT tokens can serve the encryption purpose. JWT tokens can also pack and deliver data, such as the user data. We use the package `jsonwebtoken` to implement all the needed functionalities.

To use `jsonwebtoken` without any issues, we have configured our admin template. The configureation is in the `config-overrides.js` file as well as `package.json` file. In short, the issues were due to that some of the dependencies used by `jsonwebtoken` don't work with Webpack 5

Kiki is boostraped with Create React App, which uses Webpack 5. Prior to version 5, Webpack automatically polyfilled many Node APIs, which may pull giant libraries into your project by accident. Webpack 5 no longer does that. Many third-party libraries were built to work with Webpack 4 and haven’t caught up with this change in their update yet. 

In short, you need to keep the `config-overrides.js` file and make sure not to update the npm scripts in `package.json` file:

```
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
  },
```

#### How authentication works in Kiki

Several pages of Kiki, such as the dashboard and account pages, are only accessible to authenticated users. When unauthenticated users attempt to visit such pages, they will be be redirected to the login page. Vice versa, when authenticated users attempt to visit the login page, they will be redirected to the dashboard page.

To make this work, we implemented the authentication system using both React Context and redirection. In the `src/App.js` file, we imported the Authentication Context Provider, and use it to wrap up all routes:

```
import { AuthProvider } from "contexts/AuthContext";
...
const App = () => {
  ...
  return (
    ...
    <AuthProvider>
      <Routes>{renderRoutes(routes)}</Routes>
    </AuthProvider>
    ...
  );
}
```

By doing so, we can guarantee that every view component will have access to the authentication information via the `useAuth` hook, which is implemented via the `useContext()` method.

Additionally, we prepared a set of two types of `Guard` that is responsible for redirecting users based on their authentication status. `Guard` is designed to be a part of the routing system that can be plugged in for any individual or group of routes.

### Theming

The theming system of Kiki is implemented with the [Material UI](https://mui.com/).

#### Theme overview

We prepared two themes in the theming system, light and dark. You can check out the essential elements of both themes in [the theme overview](https://kiki-admin-template.web.app/theme), including colors and typography.

Particularly, there are three types of colors that were definined in both themes, including the general color, text color, and background color.

#### Updating themes

All theme configurations are contained in the `src/theme` folder. If you need to make updates to the style or palette that applies to both themes, you can update the `base` object. If you need to update updates to one of the two themes, you can update the `themeOptions` object.

### APIs

Kiki comes with a mockup backend, which is implemented with [MirageJS](https://miragejs.com/). The API calls made in view components are handled via [Axios](https://axios-http.com/).

#### Mockup backend

The mockup backend is configured in the `src/__mocks__` folder. The configuration includes mockup of data, endpoints, and controller functions corresponding to the endpoints. MirageJS powers the backend by intercepting and responding to data requests sent to the backend.

When you are working on adapting Kiki as well as connecting Kiki to a live backend, you will either need to disable the mockup backend totally or modify the mockup backend to let those data requests reach the backend.

To disable the mockup backend, you need to remove or comment out the 4th line in `src/index.js`:

```
import "__mocks__";
```

After that, you can uninstall MirageJS as an dependency.

To modify the mockup backend to let certain data requests reach the backend, you need to use the passthrough() method of MirageJS. You can refer to the 1st line underneath routes() method:

```
createServer({
  routes() {
    this.passthrough("/static/**");
    ...
  }
});
```
For example, when you are testing your backend locally at the 5000 port, you can let all data requests sent to the backend passthrough by updating the mockup backend as follows:

```
createServer({
  routes() {
    this.passthrough("http://localhost:5000/**");
    ...
  }
});
```

#### Making API calls

By default, Kiki uses `axios` from `src/utils/axios.js` to make API calls in view components. When the mockup backend is not disabled, any data requests sent to endpoints using relative paths are being intercepted by MirageJS.

If you have a live backend or a backend running locally for testing purpose, you will need to:

1. Modify the mockup backend to let data requests sent to the backend by pass the interception of MirageJS. See the last section on how to perform this step.
2. Use absoulte paths in API calls

```
const response = await axios.get("http://localhost:5000/api/projects");
...
```

### Deployment

Kiki does not handle backend logic or databases, and you can use it with any server technologies that you want. 

#### Build for deployment

You can creates a `build` directory with a production build of Kiki by running the following command in your terminal:

```
npm run build
```

This command will bundle React in production mode and optimize the build for the best performance. The build is minified and the filenames include the hashes. After that, Kiki will be ready to be deployed.
