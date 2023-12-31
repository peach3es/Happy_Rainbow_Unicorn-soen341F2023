# Real Estate Web Application: 5FtApart

Project Title: Happy_Rainbow_Unicorn-soen341F2023

## Technologies Used & Approach

- [Next.js 13](https://nextjs.org/docs/getting-started): Web development framework used with React that provides Server Side Rendering
- [NextUI v2](https://nextui.org/): CSS library built on top of tailwind to add extra stylings to website
- [Tailwind CSS](https://tailwindcss.com/): CSS library that helps styling the website
- [Tailwind Variants](https://tailwind-variants.org): CSS library extension for tailwind
- [ReactJS](https://www.typescriptlang.org/): Frontend library to facilitate creation of website
- [ExpressJS](https://expressjs.com/): Backend
- [Mongoose](https://mongoosejs.com/docs/): Backend database used to store different values for users, properties, etc.

## Methodologies

- Agile methodologies such as Scrum and CI/CD

## How to Use

### Clone this repo

Run the following command:

```bash
git clone https://github.com/arcazeus/Happy_Rainbow_Unicorn-soen341F2023
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

## Description.

A real estate web application is a digital platform designed to facilitate the buying, selling, and renting, of real estate properties. These applications offer a wide range of features and functionalities to streamline the entire real estate transaction process, making it more convenient and efficient for users.

We identify four primary users: Homebuyers, Property renters, system administrator(s), and (real-state) brokers. Homebuyers search for properties to buy. They can request a visit to the broker managing the unit. They have different criteria to search for properties, including filtering by price range; the number of rooms; living and lot area dimensions; time in the market; building type; year built, etc. They can also search for brokers, or use a calculator to estimate the monthly payment of a property of their interest. Property renters are individuals or families seeking rental accommodations. They can use similar search criteria as homebuyers, and they can also request visits to a property.
The system administrator is responsible for adding/removing brokers. The brokers manage their own property listings. Brokers can also make purchase offers to properties listed by other brokers.

List of main use cases organized by user type.

### Homebuyer

- Search for a property: The homebuyer can search for properties based on specific criteria such as location, price range, number of bedrooms, and amenities.
- Save favorites: Homebuyers can save properties they are interested in, creating a list of favorites for easy access and comparison.
- Request a visit to a property: Once interested in a property, the homebuyer can request a viewing appointment through the system
- Search for brokers
- Mortgage Calculator: The system can include a mortgage calculator to help homebuyers estimate monthly payments based on loan amount and interest rate

### Property renter

- Similar features as Homebuyer except has an additional mortgage calculator

### Broker

- Submit Offers: Brokers can submit offers for buying properties on behalf of their clients, and track the status of their offers.
- Request a visit to a property on behalf of their clients
- CRUD operations on property listings
- Matching Properties: Brokers can use the system to match properties with potential buyers based on their preferences and requirements.
- Offer Management: Brokers can review and manage offers submitted by homebuyers for properties they represent.
- Manage visits ((re)Schedule, cancel).

### System administrator

- CRUD operations on brokers

## Team Members and Role

| Name                  | Role                 | ID       |
| --------------------- | -------------------- | -------- |
| Alexander Smagorinski | Full-Stack Developer | 40190986 |
| Patrick Cimpean       | Back-end Developer   | 40211106 |
| Charles Atanacio      | Back-end Developer   | 40176314 |
| Thomas Kamil Brochet  | Front-end Developer  | 40121143 |
| Peizhe Tian           | Front-end Developer  | 40191463 |
| Zhan Jun Cheung       | Front-end Developer  | 40212301 |

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).
