import { simplifyEdges } from "../coffeeDebtSimplificationService";

/** Helper functions for validation */

// Calculates the total debts for all users in the graph
const calculateTotalDebts = (edges: Array<{ from: number; to: number; count: number }>) => {
    const balance = new Map<number, number>();
    edges.forEach(({ from, to, count }) => {
        balance.set(from, (balance.get(from) || 0) - count);
        balance.set(to, (balance.get(to) || 0) + count);
    });
    return Array.from(balance.entries()).sort((a, b) => a[0] - b[0]);
};

// Ensures all edges in simplifiedEdges exist in originalEdges
const allEdgesSubsetOf = (
    simplifiedEdges: Array<{ from: number; to: number; count: number }>,
    originalEdges: Array<{ from: number; to: number; count: number }>
) => {
    return simplifiedEdges.every((sEdge) =>
        originalEdges.some((oEdge) => sEdge.from === oEdge.from && sEdge.to === oEdge.to)
    );
};

// Checks if the sum of all outgoing edge weights for any user is greater than before simplification
const anyOwesMore = (
    simplifiedEdges: Array<{ from: number; to: number; count: number }>,
    originalEdges: Array<{ from: number; to: number; count: number }>
) => {
    const originalDebts = new Map<number, number>();
    originalEdges.forEach(({ from, count }) => {
        originalDebts.set(from, (originalDebts.get(from) || 0) + count);
    });

    const simplifiedDebts = new Map<number, number>();
    simplifiedEdges.forEach(({ from, count }) => {
        simplifiedDebts.set(from, (simplifiedDebts.get(from) || 0) + count);
    });

    return Array.from(simplifiedDebts.entries()).some(([user, total]) => {
        return total > (originalDebts.get(user) || 0);
    });
};

describe("Coffee Debt Simplification Service", () => {
    const testCases = [
        {
            description: "Simple graph with one edge",
            edges: [{ from: 0, to: 1, count: 5 }],
            maxUserId: 1,
        },
        {
            description: "Graph with multiple edges",
            edges: [
                { from: 0, to: 1, count: 5 },
                { from: 1, to: 2, count: 3 },
                { from: 2, to: 3, count: 4 },
            ],
            maxUserId: 3,
        },
        {
            description: "Graph with indirect relationships",
            edges: [
                { from: 0, to: 1, count: 5 },
                { from: 1, to: 2, count: 10 },
                { from: 2, to: 3, count: 15 },
            ],
            maxUserId: 3,
        },
        {
            description: "Disconnected graph",
            edges: [
                { from: 0, to: 1, count: 5 },
                { from: 2, to: 3, count: 7 },
            ],
            maxUserId: 3,
        },
        {
            description: "Large graph with numerous indirect relationships",
            edges: [
                { from: 0, to: 1, count: 10 },
                { from: 1, to: 2, count: 15 },
                { from: 2, to: 3, count: 20 },
                { from: 3, to: 4, count: 25 },
                { from: 4, to: 5, count: 30 },
                { from: 5, to: 6, count: 35 },
                { from: 6, to: 7, count: 40 },
                { from: 7, to: 8, count: 45 },
                { from: 8, to: 9, count: 50 },
                { from: 1, to: 5, count: 10 },
                { from: 2, to: 7, count: 15 },
                { from: 0, to: 9, count: 5 },
            ],
            maxUserId: 9,
        },
        {
            description: "README example",
            edges: [
                {from: 0, to: 2, count: 1},
                {from: 4, to: 2, count: 1},
                {from: 4, to: 3, count: 1},
                {from: 5, to: 4, count: 1},
                {from: 5, to: 3, count: 1},
            ],
            maxUserId: 5,
        }
    ];

    testCases.forEach(({ description, edges, maxUserId }) => {
        describe(description, () => {
            const originalTotalDebts = calculateTotalDebts(edges);
            const simplifiedEdges = simplifyEdges(edges, maxUserId);
            //console.log(simplifiedEdges);

            it("should preserve net balances for all users", () => {
                const simplifiedTotalDebts = calculateTotalDebts(simplifiedEdges);
                expect(simplifiedTotalDebts).toEqual(originalTotalDebts);
            });

            it("should not introduce new connections", () => {
                expect(allEdgesSubsetOf(simplifiedEdges, edges)).toBe(true);
            });

            it("should not increase debts for any user", () => {
                expect(anyOwesMore(simplifiedEdges, edges)).toBe(false);
            });

            it("should reduce or maintain the number of edges", () => {
                expect(simplifiedEdges.length).toBeLessThanOrEqual(edges.length);
            });
        });
    });
});


