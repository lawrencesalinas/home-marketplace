# Honey Comb Homes

Find and list houses for sale or for rent. This is a React / Firebase v9 project.
<<<<<<< HEAD

## Tech stack

- Firebase9, React, Leaflet, Swiper

## User flows

As a user, I want to:
- view rental/for sale properties listings on the landing page
- view "rental properties" and "for sale properties" seperately
- log-in/sign-up  to use the web application and post a listing
- log-in/sign-up option using a Google account
- view a property's details(no. of bedrooms/bathrroms, address, for sale/ for rent,)
- view the property's address using a map interface
- post a house listing with option to rent or sell
- edit or delete  property listings.


## Usage

### Geolocation

The listings use Google geocoding to get the coords from the address field. You need to either rename .env.example to .env and add your Google Geocode API key OR in the **CreateListing.jsx** file you can set **geolocationEnabled** to "false" and it will add a lat/lng field to the form.

### Run

```bash
npm start
```
