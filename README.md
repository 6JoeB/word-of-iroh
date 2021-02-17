# word-of-iroh 

Social media web app built using the MERN stack

Sign up to start posting and connecting with the community

Live [here](https://wordofiroh.herokuapp.com)🖱️

Initial loading times may vary, Heroku unloads apps from server memory if they are not frequently visited so as to save server resources

## Tech stack

Built with:

- Node.js v12.16.0 ✔️
- React.js v17.0.1 ✔️
- MongoDB ✔️
- Mongoose v5.10.16 ✔️
- Express v4.17.1 ✔️
- React Redux v7.2.2 ✔️

Deployed using Heroku v7.47.6

## To run locally

Clone this repository
```
git clone https://github.com/6JoeB/word-of-iroh.git
```

Install the required npm packages for the backend
```
npm install
```

Install the required npm packages for the frontend
```
cd frontend
```
```
npm install
```
config/default.json will need to be populated with a mongoURI, and jwtSecret for full functionality, actual values were removed before pushing to a public git repo for security

Then run the project from the root directory
```
npm run dev
```

Redirect to http://localhost:3000

## Creator

Joe Ball [![alt text][1.1]][1]

[1.1]: http://i.imgur.com/9I6NRUm.png
[1]: http://www.github.com/6joeb
