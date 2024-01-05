# React + TypeScript + Vite + MSW

#enable msw service worker for a specific component, not the entire app

MSW mocks Rest and GraphQl endpoint

https://mswjs.io/docs/api/setup-worker/start/
https://github.com/iodigital-com/vite-plugin-msw/tree/main/examples/with-vite-browser/mocks

# Create the service worker script in the public directory

https://mswjs.io/docs/cli/init/

### To create the service worker (mockServiceWorker.js) : Run the command

```bash
npx msw init ./public
```

### Go to the /chat page to see the service worker mock/fake an api

localhost:5173/chat
