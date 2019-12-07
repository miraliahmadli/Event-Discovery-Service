# Event Management System
 
- Event management: System users can view the list of events, make a booking, and modify or cancel an existing event.  
- User management: System users can view their profile and activity log (history). Users can also update their personal details such as email and password.

**Register for a event creator account to access all features above.**

## Getting started
### Prerequisites
Download Node.js and npm here: https://nodejs.org/en/
### Installation
1. `npm install`
2. Create a .env file in root project folder
```
SESSION_SECRET=XXXXXX
DB_URI=XXXXXX
```  
- SESSION_SECRET can be a random string to secure the session.
- DB_URI is the connection string to MongoDB server (check out [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)). Here is an example connection string `mongodb+srv://<username>:<password>@cluster123-tnkmj.gcp.mongodb.net/test`, where `username` and `password` should be substituted with your own user credentials, `test` is the name of the database selected.
3. `npm start` 
4. Go to http://localhost:3000 to see your app.

