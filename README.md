# Board Game Buddy

A full stack web application for discovering, reviewing, and collecting board games. 

Users can browse through over 140,000 board games. Games can be sorted and filtered as desired. Users can leave reviews and like their favourite ones as well. Games can also be added to collections such as 'Wishlist' or 'Want To Play'.

## How It's Made

**Tech used:** TypeScript, React, Redux, Node.js, Express, MongoDB, Mongoose, MUI (Material UI)

The front end (in development) and back end (completed) are entirely coded in TypeScript to reduce the chance of runtime errors.

The RESTful back end uses Express and MongoDB. Zod is used to validate and infer the type of request data. Pagination is performed on the back end of the application since there are many thousands of entries in the database. Board game information is requested from the external Board Game Atlas API. When a user makes a request for board game data, the 3rd party information is reformatted and integrated with the review and collection data already present in the database.

User authentication is accomplished using JSON web tokens and password encryption is done using bcrypt.

The front end uses MUI (Material UI) to provide a cohesive look. Skeleton (placeholder) components are used during API requests to reduce the perceived load time.

## Lessons Learned

Working with the Board Game Atlas (BGA) API was convenient for getting board game data since the data set was large and not convenient to recreate. However it provided some challenges as well. I chose to only store the Board Game Atlas ID on the database along with my custom review and collection data. When my API was queried it would then request the most up to data from BGA. Since the data frequently changes I thought that this would be the best method. However, this meant that I was required to use the BGA API in order to sort and filter the games by any properties not stored in my database.


