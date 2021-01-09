
[![Build Status](https://semaphoreci.com/api/v1/saralundkvist86/planningpoker_client/branches/master/badge.svg)](https://semaphoreci.com/saralundkvist86/planningpoker_client)
[![Netlify Status](https://api.netlify.com/api/v1/badges/8b2f0325-ac6a-4a7c-8280-b60970595c13/deploy-status)](https://app.netlify.com/sites/epidemicplanningpoker/deploys)
[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

CI - Semaphore | CD -  Netlify | E2E Testing - Cypress
<br />
# [Planning Poker](https://epidemicplanningpoker.netlify.app/) 
The planning poker (also called scrum poker) technique is used by developers to estimate complexity of a feature. After the cards are revealed the team members vote are known to each other and they can discuss the estimates and agree to one point. Once a point is assigned to a feature, it cannot be changed
<br />
<br />
In this ReactJs application can users create features for polls. Images of lo-fis can be attached to provide broader information about what has to be done.
A url to the feature-poll is provided to be shared with the team. Visitors can also see all the polls created on the index-page of the application and sort them by category to easy find the feature to join. 
<br />
Team members can join the poll and hand in their votes. Each team member can only vote once but it is possible to change vote.
How many votes each points has got are displayed in real-time but not who voted. The name of tem-members can be shown though, but only after clicking on a button and are mainly supposed to be used by the scrum master to check that everyone of the team are joined. 
<br />
The ability to vote can be closed by anyone of the team, after an extra confirmation as this can not be un-done. A comments field are then open for users to discuss the estimates. When agreed on a point that corresponds to the scope of the feature the point can be assigned - and the poll is complete.
<br />
<br />

### Built with
React version 17.0.1 | Semantic-ui-react 2.0.1

### Tested with 
Cypress 4.0.2

### The Backend
This ReactJs client is hosted by a Ruby on Rails server: [Planning Poker api](https://github.com/Saralundkvist86/planningPoker_api)

#### Dependencies
- Yarn
- Cypress
- React, React-Redux, Semantic UI React
- Axios
- J-tockauth

#### Setup
To use this application, fork this repository to your own GitHub account and clone it to your local workspace.

Install all of the dependencies:

``` $ yarn install ```

Run tests using Cypress:

``` $ yarn cypress ```

Start the server (port: 3001) :

``` $ yarn start ```


