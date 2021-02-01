# GTSOL Frontend

This is a very small basic REST API for frontend developers. It features 6 routes for functionality.


## Instructions

Please create a frontend for this API. The frontend should be able to interact with all API endpoints exposed. Furthermore, the data should be presented in a nice and user friendly way.

For basic functionality:

* You need to be able to create Users
* You need to be able to display Users
* You need to be able to view the Times of a User
* You need to be able to create Times for Users

Additional Functionality:

* Sorting, Filtering of displayed Data
* Using some kind of graphical presentation would be nice

Technical Restrictions:

* HTML / CSS / JavaScript

As far as frontend frameworks go, you can choose. Keep in mind that the focus lies on user experience.

If you want to change something on the backend side, clone the repo and make it available for us for testing purposes.

## API Documentation

### GET /users

Lists all users

### POST /users

Creates a new user and responds with a UUIDv4 which is used as the unique ID of the new created user object

Request Body:

* email: Required
* first_name: Required
* last_name: Required


###  GET /users/:uid

Fetches a single User by given UID, responds with full user object

Params:

* uid: UUIDv4 of the user you want to retrieve

### GET /users/:uid/times

Fetches all Times for the given User

Params:

* uid: UUIDv4 of the user

### POST /users/:uid/times

Creates a new time object for the given user and responds with the UUIDv4 of the new Time entry

Params:

* uid: UUIDv4 of the user

Request Body:

* start: Date
* end: Date

### GET /users/:uid/times/:id

Fetches a single time entry, responds with full time entry

Params:

* uid: UUIDv4 of the user
* id: UUIDv4 of the time

### Testing URL

This API is available on Heroku on the EU Region for Testing. However, this App doesnt run all day and if a request is made while it is offline, please allow for some cold start time. And keep in mind it doesnt user persistant storage.

https://morning-harbor-70967.herokuapp.com/

### Further Info

Check out the test folder for example requests
