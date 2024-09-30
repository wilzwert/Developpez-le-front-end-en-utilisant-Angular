# OlympicGamesStarter

My first Angular project :
- learn basics about Components and templates
- load data from a json with HttpClient
- display data in charts (piechart or line chart)
- learn about Interceptors, Services, HttpClient, error handling, routing, configuration

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

# Installation

Requirements : Node.js version 18.19 or above

Clone this repository, then install your node_modules before starting (`npm install`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Project structure

Key components and their usage are listed below : 

app
    core
        interceptors
            ErrorInterceptor : used to handle HTTP Client errors
            LoadingInterceptore : used to activate or deactivate loading indicator on HTTP requests
        models
            ChartEvent : interface used to force the type of ngx-charts click event on pie chart and avoid type 'any'
            Olympic and Participation : interfaces used to handle and type olympic data loaded from the json data
        services
            ErrorService : global service (injectable) used to handle errors
            LoadingService : global service (injectable) used to handle loading indicator
        GlobalErrorHandler : global error handler replacing default error handling for the app
    error
        ErrorComponent : used to show / hide an error using an Observable. This component is included in the AppComponent template so that it's available anywhere in the app.
    loading-indicator
        LoadingIndicatorComponent : used to show / hide the loading indicator. This component is included in the AppComponent template so that it's available anywhere in the app
    pages :
        country
            CountryComponent : display a country details with a line chart and number cards
        home
            HomeComponent : home page, with a pie chart and number cards to display data
        not-found
            NotFoundComponent : display "404" page when no route matches the URI
    AppComponent : global app component

assets
    mock
        olympic.json : app data, loaded with an HttpClient to mock a data API