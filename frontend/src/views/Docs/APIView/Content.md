# APIs

Kiki comes with a mockup backend, which is implemented with [MirageJS](https://miragejs.com/). The API calls made in view components are handled via [Axios](https://axios-http.com/).

## Mockup backend

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

## Making API calls

By default, Kiki uses `axios` from `src/utils/axios.js` to make API calls in view components. When the mockup backend is not disabled, any data requests sent to endpoints using relative paths are being intercepted by MirageJS.

If you have a live backend or a backend running locally for testing purpose, you will need to:

1. Modify the mockup backend to let data requests sent to the backend by pass the interception of MirageJS. See the last section on how to perform this step.
2. Use absoulte paths in API calls

```
const response = await axios.get("http://localhost:5000/api/projects");
...
```