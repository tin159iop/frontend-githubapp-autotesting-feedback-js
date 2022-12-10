# Deployment

Kiki does not handle backend logic or databases, and you can use it with any server technologies that you want. 

## Build for deployment

You can creates a `build` directory with a production build of Kiki by running the following command in your terminal:

```
npm run build
```

This command will bundle React in production mode and optimize the build for the best performance. The build is minified and the filenames include the hashes. After that, Kiki will be ready to be deployed.