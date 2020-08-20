# TRZ (The Resident Zombie) - Frontend

## Problem Description

The world, as we know it, has fallen into an apocalyptic scenario. The "Influenzer T-Virus" (a.k.a. Twiter Virus) is transforming human beings into stupid beasts (a.k.a. Zombies), hungry to cancel humans and eat their limbs.

You, the last survivor who knows how to code, will help the resistance by deploying a system to connect the remaining humans. This system will be essential to detect new infections and share resources between the members.


## Technologies
This project was made using the follow technologies:

* [Javascript](https://developer.mozilla.org/pt-BR/docs/Aprender/JavaScript)
* [Node](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
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
5. Create a new database PostgreSQL with PostGIS extension. I recomend  [kartoza/docker-postgis](https://github.com/kartoza/docker-postgis)
6. Run

        yarn sequelize sequelize db:migrate
   and

        yarn sequelize db:seed:all

   to install the migrations and seeders.
7. Run `npm start` or `yarn start` to start the server.


## Run tests
1. Create a new database for tests.
2. In the `.env.test` file, change the variables to suit your test database
3. To run the tests(Linux only) `npm test` or `yarn test`.

   3.1 To run on windows you need to change the .env with your test database variables and run `npm testwin` or `yarn testwin`



# Survivor

## Register a new survivor on the system.

+ Request (application/json)

  `POST /survivors/`
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

+ Response 204 (application/json)

## List all registered survivors

+ Request (application/json)

  `GET /survivors/`
    + Body (No body)

+ Response 200 (application/json)

              [
                {
                  "id": "5659d4be-9e93-4fc8-b41e-7980f9d1e786",
                  "name": "Joaozin",
                  "age": 24,
                  "gender": "man",
                  "lonlat": "POINT (54.87987,25.7777)",
                  "infected": false,
                  "createdAt": "2020-08-17T12:22:30.285Z",
                  "updatedAt": "2020-08-17T12:22:30.285Z"
                },
                {
                  "id": "ba56b539-dce4-4623-8c27-e4ef85a04411",
                  "name": "Alvaro",
                  "age": 20,
                  "gender": "man",
                  "lonlat": "POINT (2112.04545,-878.545)",
                  "infected": false,
                  "createdAt": "2020-08-17T12:52:52.393Z",
                  "updatedAt": "2020-08-17T12:52:52.393Z"
                },
              ]

## List a specific survivor

+ Request (application/json)

  `GET /survivors/$id`

    + Body (No body)

+ Response 200 (application/json)

             {
              "id": "5bd1e912-420d-45c1-aec3-ba173cb76257",
              "name": "Pedro Fellipe",
              "age": 24,
              "gender": "man",
              "lonlat": "POINT (-90.4545,25.333)",
              "infected": false,
              "createdAt": "2020-08-17T12:15:13.831Z",
              "updatedAt": "2020-08-18T18:44:12.739Z"
            }

## List a specific survivor items

+ Request (application/json)

  `GET /survivors/$id/properties`
    + Body (No body)

+ Response 200 (application/json)

        [
          {
            "quantity": 2,
            "Item": {
              "name": "Fiji Water",
              "value": 14
            }
          },
          {
            "quantity": 7,
            "Item": {
              "name": "Campbell Soup",
              "value": 12
            }
          },
          {
            "quantity": 4,
            "Item": {
              "name": "First Aid Pouch",
              "value": 14
            }
          },
          {
            "quantity": 4,
            "Item": {
              "name": "AK47",
              "value": 14
            }
          }
        ]


## Update survivor information.

+ Request (application/json)

  `PUT /survivors/$id`
    + Body

            {
                "name": "Joaozin",
                "age": 18,
                "gender": "man",
                "latitude": "16.3287",
                "longitude":"48.9534",
            },

+ Response 204 (application/json)


# Flag

## Flag some survivor.

+ Request (application/json)

  `POST /report/$id`
    + Body

            {
                "infected_id": "5659d4be-9e93-4fc8-b41e-7980f9d1e786",
            },

+ Response 204 (application/json)

# Reports

## Percentage of infected survivors.

+ Request (application/json)

  `GET report/infected`
    + Body

+ Response 200 (application/json)

      {
        "report": {
        "description": "Average of infected people",
        "average_infected": 0
        }
      }

## Percentage of non-infected survivors.

+ Request (application/json)

  `GET report/non-infected`
    + Body

+ Response 200 (application/json)

      {
        "report": {
        "description": "Average of non-infected (healthy) people",
        "average_healthy": 1
         }
      }

## The average amount of each kind of resource by the survivo.

+ Request (application/json)

  `GET report/people-inventory`
    + Body

+ Response 200 (application/json)

      {
        "report": {
        "description": "Average of the quantity of items per person (total and just non-infected) and of each item",
        "average_items_quantity_per_person": 21.5,
        "average_items_quantity_per_healthy_person": 21.5,
        "average_quantity_of_each_item_per_person": {
            "Fiji Water": 9,
            "Campbell Soup": 6,
            "AK47": 3.5,
            "First Aid Pouch": 3
          }
        }
      }
