
# Mongobongo-Social   [![License](https://img.shields.io/static/v1?label=License&message=MIT&color=blueviolet&style=for-the-badge)](https://opensource.org/licenses/MIT)
  
## Description
The following repo is to implement a RESTful API for a social network using MongoDB using Mongoose. Will execute CRUD methods.


## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Features](#features)
- [How to Contribute](#contributing)
- [Tests](#tests)
- [Questions](#questions)
  

## Installation
You will need the following in order to run this correctly:
- NodeJS already installed.
- MongoDB already installed.
- Once those are installed, download the repo, on the terminal run npm install and it will install all the dependencies needed.

## Usage
In order to use it, the best and easiest would be to download an api platform like postman and create the routes to GET, POST PUT and DELETE. To start, do an "npm start" in the terminal. 

Then create the following routes on postman:
- http://localhost:3001/api/users
  - Use this one to view users GET and to do POST requests 
  - http://localhost:3001/api/users/"insert userid"
    - Use it to GET a specific user, PUT to update a user and DELETE to delete a user.
- http://localhost:3001/api/thoughts
    - Use this one to view thoughts GET and to do POST requests 
    - http://localhost:3001/api/thoughts/"insert thoughtid"
        - Use it to GET a specific user's thoughts, PUT to upd
- http://localhost:3001/api/thoughts/:thoughtId/reactions
    - Use this to POST a reaction to a thought.
    - Use DELETE to delete a reaction.


## License
Copyright (c) lrpineda. All rights reserved.
Licensed under the [MIT](https://opensource.org/licenses/MIT) license.
  

## Features

- When you delete a user, it will delete their thought posts as well as removing the user from any other users friends list.
- When adding a user as a friend it will add each user to it's respective friends list.
- Users can add reactions to thought posts.

## Contributing
Feel free to fork to this repo and if you have any suggestions to improve it, definitely reach out!

## Tests

- Attempt to create different users.
- Create many thoughts for one user and then proceed to delete the user, it should delete all the thoughts.
- Follow the instructions provided which is basically testing steps.



## Questions
If you have any questions about the repo, open an issue or contact [via email](mailto:luicks212@gmail.com). or [on GitHub](https://github.com/lrpineda).
  