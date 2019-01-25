This project contains a client server app for handling printer queue.

 ### React + Redux and Resux Saga with NodeJs server with REST API and SocketIO integration.

 ## The Project
 - this project originally created for printers but can be used for any other subject.
 - the project built from scratch and has minimum depandecies.
 - we use react-script to run tha app but you also have webpack preperd folder.

 ## Getting started

You can view a live demo over at https://youtu.be/BsBYhcM4bDA

To get the frontend running locally:

- Clone this repo

- Running the client
- `npm install` or `yarn` to install all req'd dependencies
- `npm start` or `yarn start` to start the local server (this project uses create-react-app)

- Running the server
- under `/server` run `npm install` or `yarn` to install all req'd dependencies
- `npm start` or `yarn start` to start the local server (this project uses create-react-app)
- you can alse run it from base directory (client) with `npm run server` or `yarn server`
 Local web server will use port 4001 
 
### Making requests to the backend API
you will have open REST API at `http://localhost:4001/api/queue`
If you want to change the API URL to a local server, simply edit 
`src/config/secrets.js` and change `NODE_SERVER` to the local server's URL (i.e.)

**General functionality:**

- Get queue data `/api/queue`
- Add queue item `/api/queue/add`
- Delete queue item `/api/queue/delete`
- Cancel queue item `/api/queue/cancel`
- Reorder queue item `/api/queue/reorder`
- Load test items into queue data `/api/queue/test`

### Optional:  Persist Queue Data

- you can run your server in persist mode
  and all data will be stored localy and restored every wake up.

  just uncomment //queueDb.bindWithStorage(socket);
  on file `/server/services/socket.io.worker.js`

  *you maybe will need to add some adjusments and check for runtime bugs 


**Real World and production considerations:**
- Authentication between client and server
- Webpack integration for better bundle management
- Add more logs and test (Jest etc.)
- Use storybook (or else) for better ui and component tests.
- Code beutification
- Add local or remote DataBase for handle the queue data.


## Screenshots
![App Queue With Items](https://firebasestorage.googleapis.com/v0/b/dprintqueue.appspot.com/o/app_queue1.png?alt=media&token=88b7f890-c501-4220-9f32-ff2fd95cfc89)
<br><br>
![App Queue Completed Items](https://firebasestorage.googleapis.com/v0/b/dprintqueue.appspot.com/o/app_queue_completed.png?alt=media&token=5ad5efd3-d920-4e3e-ba59-94f7b178c13a)
<br><br>
![Add Queue Item Modal](https://firebasestorage.googleapis.com/v0/b/dprintqueue.appspot.com/o/app_queue_add.png?alt=media&token=ea5e0609-791b-4328-91a2-59efc1258a4c)
<br><br>
![Confirm Before Delete Items](https://firebasestorage.googleapis.com/v0/b/dprintqueue.appspot.com/o/app_queue_confirm%20delete.png?alt=media&token=c10f7caf-d039-48ef-9015-530d7fb74d74)
<br><br>
## Queue Json Data
![Empty Queue](https://firebasestorage.googleapis.com/v0/b/dprintqueue.appspot.com/o/empy_queue.png?alt=media&token=4869ff99-f336-4cd1-a1e7-0d55208fb722)
<br><br>
![Full Queue](https://firebasestorage.googleapis.com/v0/b/dprintqueue.appspot.com/o/full_queue.png?alt=media&token=4663f98b-336c-4530-92f3-034b2032e93c)
<br><br>

## Available Scripts
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
