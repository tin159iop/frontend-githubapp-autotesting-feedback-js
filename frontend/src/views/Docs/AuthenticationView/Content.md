# Authentication

The authentication system of Kiki is implemented with [JSON Web Token](https://jwt.io/).

## JSON Web Token

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

## How authentication works in Kiki

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
