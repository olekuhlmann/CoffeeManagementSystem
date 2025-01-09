// src/services/coffeeDebtSimplificationService.ts

import { User } from "../models";
import { Dinic } from '@algorithm.ts/dinic'

/**
 * Edge object
 */
interface Edge {
    from: number,
    to: number,
    count: number
}

/**
 * Simplifies coffee debts between users to minimize the number of transactions needed to settle all debts.
 * @param users - Array of users with coffee counts
 * @returns {Array<{senderId: number, receiverId: number, count: number}>} Array of simplified coffee debts
 */
export const simplifyCoffeeDebts = (users: Array<User>): Array<{ senderId: number; receiverId: number; count: number; }> => {

    // Construct array of edges from users array
    let edges = edgesFromUsers(users);

    // Get the highest id of all users
    const maxUserId = Math.max(...users.map(user => user.id));

    edges = simplifyEdges(edges, maxUserId);

    // convert edges to CoffeeCountSimplified format
    const simplifiedCoffeeCounts = edges.map(edge => {
        return {
            senderId: edge.from,
            receiverId: edge.to,
            count: edge.count
        };
    });

    return simplifiedCoffeeCounts;
};

/**
 * Simplifies edges by iteratively applying max-flow algorithms to minimize transactions.
 * @param edges - Array of edges representing debts
 * @param maxUserId - The highest user ID to determine graph size
 * @returns {Array<{from: number, to: number, count: number}>} Simplified array of edges
 */
export const simplifyEdges = (edges: Array<{ from: number; to: number; count: number; }>, maxUserId: number): Array<{ from: number; to: number; count: number; }> => {

    // Create hash map of visited edges
    const visitedEdges = new Set<string>();

    let nextEdge = getNextEdge(edges, visitedEdges);

    // Visit all edges and simplify debts by applying max-flow to that edge
    while (nextEdge) {
        // Create a graph with all the edges
        const graph = new CustomDinic();
        graph.init(nextEdge.from, nextEdge.to, maxUserId + 1);
        edges.forEach(edge => {
            graph.addEdge(edge.from, edge.to, edge.count);
        });

        // Get max-flow for the edge
        const maxflow = graph.maxflow();

        // Create residual graph only with forward edges
        const new_edges = graph.residualGraphForward();

        // Add a new edge with the maxflow value
        if (maxflow > 0)
            new_edges.push({ from: nextEdge.from, to: nextEdge.to, count: maxflow });

        // Update the edges array for next iteration
        edges = new_edges;

        // Get next edge for next iteration
        nextEdge = getNextEdge(edges, visitedEdges);
    }

    return edges;
};


/**
 * Processes the user data into an array of edges of an asymmetric graph.
 * @param users - Array of users with coffee counts
 * @returns {Array<Edge>} Array of edges with processed counts
 * 
 * This function processes the raw coffee data of users into an array of edges of an asymmetric graph.
 */
const edgesFromUsers = (users: Array<User>): Array<Edge> => {
    // Convert user data to edges 
    const edgeMap = new Map();

    users.forEach(user => {
        const userId = user.id;

        // Process coffees sent by this user
        user.sentCoffeesRaw?.forEach(coffee => {
            const receiverId = coffee.receiver?.id;
            if (receiverId !== null) {
                const edgeKey = getEdgeId({ from: userId, to: receiverId!, count: coffee.count });
                edgeMap.set(edgeKey, (edgeMap.get(edgeKey) || 0) + coffee.count);
            }
        });

        // Process coffees received from other users
        user.receivedCoffeesRaw?.forEach(coffee => {
            const senderId = coffee.sender?.id;
            if (senderId !== null) {
                const edgeKey = getEdgeId({ from: userId, to: senderId!, count: coffee.count });
                edgeMap.set(edgeKey, (edgeMap.get(edgeKey) || 0) - coffee.count);
            }
        });
    });

    // Convert edgeMap to an array of edges
    const edges = Array.from(edgeMap.entries()).map(([key, count]) => {
        const edge = getEdgeFromId(key);
        edge.count = count;
        return edge;
    });

    // Filter out edges with count <= 0 
    const filteredEdges = edges.filter(edge => edge.count > 0);

    return filteredEdges;
}

/**
 * Get the next unvisited edge from the array of edges
 * @param edges - Array of edges
 * @param visitedEdges - Set of visited edges
 * @returns {Edge | null} Next unvisited edge or null if there is none.
 */
const getNextEdge = (edges: Array<Edge>, visitedEdges: Set<string>): Edge | null => {
    for (const edge of edges) {
        const edgeKey = getEdgeId(edge);
        if (!visitedEdges.has(edgeKey)) {
            visitedEdges.add(edgeKey);
            return edge;
        }
    }
    return null;
}

/**
 * Get hashed edge id from edge object. Does not consider `cap` property.
 * @param edge - Edge object with from, to, and cap properties
 * @returns Hashed edge id
 */
const getEdgeId = (edge: Edge): string => {
    return '' + edge.from + '->' + edge.to;
}

/**
 * Get edge object from hashed edge id
 * @param edgeID - Hashed edge id
 * @returns Edge object
 */
const getEdgeFromId = (edgeID: string): Edge => {
    const [from, to] = edgeID.split('->').map(Number);
    return { from, to, count: 0 };
}

/**
 * Class that extends Dinic class from @algorithm.ts/dinic to add residual graph functionality.
 */
class CustomDinic extends Dinic {

    /**
     * Get the residual graph with only forward edges. Must be called after `maxflow` function.
     * @returns {Array<Edge>} Array of forward edges in the residual graph
     */
    public residualGraphForward(): Array<Edge> {
        const residualNetwork = [];
        const { _edges } = this;

        for (const e of _edges) {
            // filter out all "backward" edges added by Dinic algorithm (where cap is 0)
            if (e.cap > 0) {
                // compute residual cap after subtracting flow
                const forwardResidualCap = e.cap - e.flow;
                // add to new network if residual cap is positive
                if (forwardResidualCap > 0) {
                    residualNetwork.push({
                        from: e.from,
                        to: e.to,
                        count: forwardResidualCap,
                    });
                }
            }
        }

        return residualNetwork;
    }

}