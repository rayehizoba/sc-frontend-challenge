<center>
  <h2>Software Engineer Challenge - Front-End</h2>
</center>

**How to run:**
- Clone this repo
- install dependencies `$ yarn install`
- `$ yarn start`

**How to run tests**
- `$ yarn test`
NOTE: Ensure dependencies have been installed first

**How to build the image and fire up the container**
- `$ docker-compose up -d --build`
- `$ docker-compose stop` to bring down the container

**Assignment:**

Design and implement a customer management system for the Fancy Broker Agency.

1.  Rules:

- You have four (4) hours to complete the tasks. Be careful with your time, and make sure that you understand the requirements correctly.
- Try not to over-optimize. An MVP with good documentation counts more than a single polished component.

2.  User stories:

- The broker Tom, would like to see a list of his customers.
- The broker Tom, should be able to search in customer data.
- The broker Tom, should be able to see basic statistics over his data.

3.  Specifications:

- The front page should have this structure:

```
[ Home | Contacts | Search | Help ]

[ Content ]

[ Footer ]
```

- **Home** should render some statistical information about the customers:

  1.  customer count,
  2.  average age,
  3.  [Standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) of the amount they owe to the Fancy Broker Agency, and
  4.  Google Maps with the locations of contacts.

- **Contact** section should render a view with ten (10) customers per page, and users are able to paginate trough the data.

- **Search** Search section should be capable of a full text search through the data and display the results.
