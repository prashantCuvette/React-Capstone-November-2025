Change this to `Home.module.css`. The `M` should be in lower case `m` in Home component.

If you refresh the app might break so add the below lines of code

1. Create a `vercel.json` in root location and add the below code

```javascript
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Your localhost json-server should be running in order to work with login signup and creation of tasks.
Clear localstorage first. then start fresh.