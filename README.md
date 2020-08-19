# TRZ (The Resident Zombie) - Frontend

## Problem Description

The world, as we know it, has fallen into an apocalyptic scenario. The "Influenzer T-Virus" (a.k.a. Twiter Virus) is transforming human beings into stupid beasts (a.k.a. Zombies), hungry to cancel humans and eat their limbs.

You, the last survivor who knows how to code, will help the resistance by deploying a system to connect the remaining humans. This system will be essential to detect new infections and share resources between the members.


## Technologies
This project was made using the follow technologies:

* [Javascript](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript)
* [Node](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [PostGIS](https://postgis.net/)
* [Sequelize ORM](https://sequelize.org/)
* [Jest](https://jestjs.io/)
* [Yup](https://github.com/jquense/yup)


## Installation

### Project
1.  Clone the git repository:

          git clone https://github.com/PedroFelli/backend-TRZ

2. In the folder you will find a `example.env` file, duplicate it and rename it to `.env` only.
3. In the new `.env` file, change the env variables to fit your environment `DB_*`.
4. Run `npm install` or `yarn` to install the packages.
5. Create a new database Postgres with PostGIS extension. I recomend  [kartoza/docker-postgis](https://github.com/kartoza/docker-postgis)
6. Run

        yarn sequelize sequelize db:migrate
   and

        yarn sequelize db:seed:all

   to install the migrations and seeders.
7. Run `npm run start` or `yarn start` to start the server.


## Run tests
1. Create a new database for tests.
2. In the `.env.test` file, change the variables to suit your test database
2. To run the tests(Linux only, to run on windows you need make manually) `npm test` or `yarn test`.


## Endpoints
This project was made using the follow technologies:


### Register survivor  [POST]
Register a new survivor on the system.
+ Request (application/json)
    + Body

            {
                "name": "Joaozin",
                "age": 18,
                "gender": "man",
                "latitude": "16.3287",
                "longitude":"48.9534",
                "items":
                  [
                    {
                      "item_id": 1,
                      "quantity": 0
                    },
                    {
                      "item_id": 2,
                      "quantity": 0
                    },
                    {
                      "item_id": 3,
                      "quantity": 3
                    },
                    {
                      "item_id": 4,
                      "quantity": 3
                    }
                  ]
            },
    + Schema

            {

              "type": "object",
                  "properties": {
                    "name": {
                      "type": "string"
                    },
                    "age": {
                      "type": "number"
                    },
                    "gender": {
                      "type": "string"
                    },
                    "latitude": {
                      "type": "number"
                    },
                    "longitude": {
                      "type": "number"
                    },
                    "password": {
                      "type": "string"
                    },
                    "items": {
                      "type": "array"
                        [
                          {
                            "item_id": {
                              "type": "int"
                            },
                            "quantity": {
                              "type": "int"
                            },
                            "item_id": {
                              "type": "int"
                            },
                            "quantity": {
                              "type": "int"
                            },
                            "item_id": {
                              "type": "int"
                            },
                            "quantity": {
                              "type": "int"
                            },
                          }


                        ]
                    },

                  }
            }
+ Response 204 (application/json)
