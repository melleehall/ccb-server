<h1>Clear Creek Broadband API<h1>

*Live*: https://ccb-app.now.sh/

## Description

This API supports the website for Clear Creek Broadband (CCB), a local internet service company dedicated to providing their neighbors in Eastern Clear Creek County, Colorado with access to a highspeed broadband connection.  The Signup view form is supported by this API, allowing users an easy channel to request internet service, volunteer to help CCB's effort, and/or join the mailing list to stay updated.

## Routes

<h2>POST <code>/api/contacts<code><h2>

* Inserts a new contact into the database and returns the new contact (type: object) and its location


// req.body with required fields
{
  firstname: String,
  lastname: String,
  email: String, 
  phone: String, 
  streetnum: Integer, 
  streetname: String, 
  city: String, 
  zip: String,
}

// req.body with optional fields
{
  firstname: String,
  lastname: String,
  email: String, 
  phone: String, 
  streetnum: Integer, 
  streetname: String, 
  city: String, 
  zip: String,
  request_service: Boolean,
  request_news: Boolean,
  volunteer: Boolean
}

## Screenshots

Landing Page Description:

![dashboard stats](Screengrabs/LandingPageDescription.png)

Mobile Navigation:

![navigation](Screengrabs/MobileNav.png)

Signup Form:

![signup page](Screengrabs/SignupPage.png)


## Technology

* Node.js
* Express
* JavaScript
* PostgreSQL
* Testing: Mocha / Chai / Supertest

