# CoffeeManagementSystem

Everyone knows this issue: You're sitting at R1 at CERN and it's coffee time. Your friend graciously goes to the coffee machine and buys a coffee for you. The next day, another friend buys a coffee for you. You buy a coffee for another friend. All overview is lost. Carnage ensues. 

This is where the Coffe Management System (CMS) comes in. This web application allows for easy tracking of who has bought coffees for whom, similar to money-tracking apps like [Splitwise](https://www.splitwise.com/).

## Installation

For a local installation, follow these steps.

1. **Setup a local PostgreSQL database**, see [here](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database).

2. **Clone this repository** and set up a `.env` file in the `backend` directory:
    ```sh
    SECRET_PASSWORD=put_a_password_here
    JWT_SECRET=put_a_JWT_secret_here
    DATABASE_URL=postgres://username:password@hostname:port/databasename
    IS_LOCAL=true
    ```

2. **Install dependencies and start the backend**
   ```sh
   cd backend
   npm install
   npx ts-node-dev src/index.ts
   ```

3. **Install dependencies and start the frontend**
   ```sh
   cd frontend
   npm install
   npm run dev
   ```

Upon entering the web application for the first time, you will be prompted to enter the ```SECRET_PASSWORD``` used above. A secure token will be saved in the browser for 90 days to allow access without entering the password.

For deployment to a hosting service, replace the appropiate HTTP endpoints in the frontend & backend and follow the necessary steps outlined by the hosting service.
The CMS is deployed to AWS with an API Gateway, serverless Lambda function, and PostgreSQL database. The frontend is hosted using GitHub Pages.

## Demo

https://github.com/user-attachments/assets/2485bee0-5415-42df-891f-c0ca16d52358



## Author

Ole Kuhlmann  
Email: [tim.ole.kuhlmann@cern.ch](mailto:tim.ole.kuhlmann@cern.ch)  
GitHub: [ThatTilux](https://github.com/ThatTilux)

Developed with ❤️ and ☕ at CERN.



## License

This project is licensed under the Unlicense License. See the [LICENSE](LICENSE) file for details.

Not affiliated with CERN or the CMS experiment at CERN.
