# Help Desk:
Simple ticket-system dasboard using React/Redux, NodeJS, Express, and Mongo DB
---

With thanks to Brad Traversy and [his teaching.](https://www.udemy.com/course/react-front-to-back-2022/)

---

See the deployed project [here](https://mern-ticket-system-help-desk.herokuapp.com/).  The repo branch that is currently deployed to Heroku is `main`.  

---

To run:
1. Clone the repo - `main` branch

`git clone --banch main https://github.com/jonathanjacka/mern_ticket-system-help-desk.git`

2. Then, change directory into the project root folder:

`cd mern_ticket-system-help-desk`

3. Now that you're in the root directory, install all dependencies.  Note, that you'll have to do this in the root, /frontend, and /backend folders.  The steps below will get this done:
```
//in root
npm install

//once completed, cd into frontend folder, and run npm install again
cd frontend
npm install

//Now do the same thing in the backend folder
cd ../backend
npm install
```

4. Next, you'll need to get your Mongo DB database set up.  I'll won't go into how to do that here, but if this is relatively new to you, I would suggest completing [Brad's course](https://www.udemy.com/course/mern-ecommerce/).  You'll need to get your database URI and use it as an environment variable - `MONGO_URI` - for things to work correctly (See *** environment variables *** below).

5. You'll need to set up your environment variables.  

* Firstly, create a .env file in your root:
```
//from the root
touch .env
```
* Then, make sure to populate .env file with the variables according to the following list:
```

//for jwt
JWT_SECRET='your secret here'

//MongoDB
MONGO_URI='your db uri here'

//I used this to help manage the running of dev dependencies; if exluded, will default to 'development'
NODE_ENV=`development`

/* If port is not set, will default to 5000.  

Also, if you're on a Mac, you'll need to change port as 5000 is currently in use by AirPlay Receiver.  
Alternatively, and the thing I did, was just to turn off Airplay Receiver in my MacBook settings */
PORT=8000
```
10.  This should get you up and running.  I had a bunch of scripts to run the project, which are visible in the `package.json` file in the root directory:
```
//to run only the backend server with Node/Express WITHOUT Nodemon
npm start

//to run only the backend server with Node/Express WITH Nodemon
npm run server

//to run only the frontend
npm run client

//to run the entire project
npm run dev

```

---

Note that this project is largely unmaintained, and I'll probably only update anything if it no longer deploys.  
