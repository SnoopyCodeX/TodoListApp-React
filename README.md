# TODO List App

A simple PWA (Progressive Web Application) made using reactjs

### :wrench: Building the application

```bash
npm run build

# Run the app as production build
serve -s build
```

### :house: Starting the app locally:

Start json-server first:

```bash
json-server --watch src/tasks.json --port 3001
```
Then start the application:

```bash
npm start
```

### :link: Exposing localhost publicly using ngrok

```bash
ngrok http http://localhost:3000
```