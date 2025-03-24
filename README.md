# CoffeeManagementSystem

Everyone knows the struggle: You're sitting at R1 at CERN and it's coffee time. Your friend graciously goes to the coffee machine and buys a coffee for you. The next day, another friend buys a coffee for you. You buy a coffee for a third friend. All overview is lost. Carnage ensues. 

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

For deployment to a hosting service, set `IS_LOCAL` to `false`, replace the appropiate HTTP endpoints in the frontend & backend, and follow the necessary steps outlined by the hosting service.
The CMS is deployed to AWS with an API Gateway, serverless Lambda function, and PostgreSQL database. The frontend is hosted using GitHub Pages.

## Demo

https://github.com/user-attachments/assets/2485bee0-5415-42df-891f-c0ca16d52358

## Debt Simplification Algorithm
Inspired by Splitwise's debt simplification feature and [this article](https://medium.com/@mithunmk93/algorithm-behind-splitwises-debt-simplification-feature-8ac485e97688), the CMS uses a debt simplification algorithm to minimize the number of coffee transactions (i.e., <it>A owes B a coffee</it>) while maintaining net coffee balances. 

### Example
Let's consider the following coffee debts:
<div align="center">
   <img width="973" alt="before_both" src="https://github.com/user-attachments/assets/5289bbc2-0bf7-4a93-bc03-87d006bdc8b8" />

</div>

In the debt-graph above, Leon (L) owes both Vinni (V) and Nick (N) a coffee. V also owes N a coffee. These three transactions can be simplified to a single transaction of L owing two coffees to N while preserving the total net balance of coffees owed by each user, see below.

<div align="center">
    <img width="973" alt="after_both" src="https://github.com/user-attachments/assets/aee3cbfe-188c-4040-b809-76326f2a7c23" />
</div>

### Requirements
To ensure semantic correctness of the algorithm, we define three requirements:

1. **Preservation of Net Balances**: After simplification, the total net balance (coffees owed by others minus coffees owed to others) of each user remains unchanged.
2. **No Increased Debt**: After simplification, no user owes more coffees than they did originally.
3. **Reduced or Equal Edges**: After simplification, the number of transactions has reduced or remained unchanged.

Minimizing the number of transactions with the criteria above is equivalent to the [Sum of Subsets Problem](https://en.wikipedia.org/wiki/Subset_sum_problem), and thus [NP-complete](https://en.wikipedia.org/wiki/NP-completeness). To lift the NP-completeness of the task, we introduce the following requirement:

4. **No New Edges**: Users cannot owe debts to others they did not already owe before simplification.

This restriction allows for an efficient implementation, see below.

### Algorithm
The algorithm operates as follows.

1. **Graph Construction**:
   - Represent debts as a directed graph where an edge `(u, v) = n` indicates that user `u` owes user `v` `n` coffees.
   - Edges are asymmetric (i.e., no reciprocal debts).
2. **Iterative Simplification:**
   - **Select an Edge:** Pick a non-visited edge `(u, v)` from the graph.
   - **Run Max-Flow:** Compute the maximum flow of coffees from `u` to `v` using [Dinic's algorithm](https://en.wikipedia.org/wiki/Dinic%27s_algorithm).
   - **Update Residual Graph:** Create the residual graph with only the unused forward edges and add the edge `(u,v) = g`, where `g` is the max-flow computed in the previous step. 
   - Repeat the above steps using the residual graph of the previous iteration until all edges have been visited.

The last residual graph represents the simplified debt structure, with the minimum number of edges required to settle debts.

Dinic's algorithm has a complexity of `O(V^2E)`. Since we iterate over all edges, our algorithm has a complexity of `O(V^2E^2) = O(V^6)`.

## Author

Ole Kuhlmann  
Email: [ole.kuhlmann@rwth-aachen.de](mailto:ole.kuhlmann@rwth-aachen.de)  
GitHub: [ThatTilux](https://github.com/ThatTilux)

Developed with ❤️ and ☕ at CERN.



## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
For the implementation of Dinic's algorithm, we use the [@algorithm.ts/dinic](https://github.com/guanghechen/algorithm.ts/tree/@algorithm.ts/dinic@4.0.3/packages/dinic) package.

Not affiliated with CERN or the CMS experiment at CERN.
