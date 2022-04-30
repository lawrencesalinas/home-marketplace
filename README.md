<p align="center">
  <img width="600" height="400" src="./src/assets/jpg/houses.gif">
</p>

# Honey Comb Homes

Find and list houses for sale or for rent. Honey Comb Homesis a React / Firebase v9 project. a CRUD application that utilizes the firebase environment. React.js to create the front-end, firebase authentication to handle authentication and firebase store database.

## Tech stack

- Firebase9, React, Leaflet, Swiper

## User flows

As a user, I want to:
- view rental/for sale property listings on the landing page
- view "rental properties" and "for sale properties" seperately
- log-in/sign-up  to use the web application and post a listing
- log-in/sign-up option using a Google account
- view a property's details(no. of bedrooms/bathrroms, address, for sale/ for rent, price, discount amount, parking, furnished)
- view an offers page for discounted listings
- view the property's address using a map interface
- post a house listing with option to rent or sell
- edit or delete  property listings.


## Usage

### Geolocation

The listings use Google geocoding to get the coords from the address field. You need to either rename .env.example to .env and add your Google Geocode API key OR in the **CreateListing.jsx** file you can set **geolocationEnabled** to "false" and it will add a lat/lng field to the form.


- Fork this repo and in a terminal, clone this repo

```sh
git clone https://github.com/lawrencesalinas/honey-comb-homes.git
```

- Navigate to the repo folder

```sh
cd hooney-comb-homes
```

- Install the project dependencies:

```sh
npm install
```

- Deploy the project on your local machine

```sh
npm start
```

- On your browser, navigate to localhost3000 and the project automatically appears on your locally hosted web page,


## Cloud Deployment

The app repo is  deployed on Vercel [https://honey-comb-home.vercel.app/)]

## Contributors

- [Lawrence Salinas](https://github.com/lawrencesalinas)
