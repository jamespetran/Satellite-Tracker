
# Satellite Tracker

![](https://img.shields.io/github/languages/top/jamespetran/satellite-tracker)

Satellite Tracker is an application that allows a user to track different satellites as they orbit the earth. Some of the spikes / learning goals in this full stack web app include integration of the [Google Maps API](https://developers.google.com/maps), an [API to grab satellite information](https://tle.ivanstanojevic.me/#/) (orbital elements encoded in a short text string called a TLE), a globe display library called [Cesium](https://cesium.com/platform/cesiumjs/) and an orbital mechanics library called [SatelliteJS](https://github.com/shashwatak/satellite-js). Without these tools, this app would not have been possible to create.

This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `satellite_tracker` and run the following command from within the root folder of the application to create the tables from ```database.sql``` file:

```psql -d satellite_tracker -f database.sql```

## Delpoyment Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
  
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`
