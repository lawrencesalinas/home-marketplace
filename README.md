# Honey Comb Homes

Find and list houses for sale or for rent. This is a React / Firebase v9 project.

## Tech stack

- Firebase9, React, Leaflet, Swiper

## User flows

As a user, I want to:
- view rental/for sale properties listings on the landing page
- view "rental properties" and "for sale properties" seperately
- log-in/sign-up  to use the web application and post a listing
- post a listing with option no. of bedrooms/bathrooms, 
- log-in/sign-up using a Google account
- view the properties address using a map interface
- edit or delete  property listings.

## Usage

### Geolocation

The listings use Google geocoding to get the coords from the address field. You need to either rename .env.example to .env and add your Google Geocode API key OR in the **CreateListing.jsx** file you can set **geolocationEnabled** to "false" and it will add a lat/lng field to the form.

### Run

```bash
npm start
```