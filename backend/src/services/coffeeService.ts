// src/services/coffeeService.ts
import { User, CoffeeCount, CoffeeCountSimplified, Log } from '../models';
import { simplifyCoffeeDebts } from './coffeeDebtSimplificationService';
import { getUsersWithRawCoffeeCount } from './userService';


/**
 * Adds a coffee transaction between a sender and a receiver.
 * 
 * This function creates a new coffee transaction between the sender and receiver, indicating that the sender has sent a coffee to the receiver.
 * 
 * @param senderName - The name of the sender.
 * @param receiverName - The name of the receiver.
 * @returns A promise that resolves to true if the transaction was successful, or false if there was an error.
 */
export const addCoffee = async (senderName: string, receiverName: string) => {
    if (senderName === receiverName) {
        console.log('Sender and receiver cannot be the same');
        return false;
    }

    const sender = await User.findOne({ where: { name: senderName } });
    const receiver = await User.findOne({ where: { name: receiverName } });

    if (!sender || !receiver) {
        console.log('Sender or receiver not found');
        return false;
    }

    const coffeeRecord = await CoffeeCount.findOne({
        where: { senderId: sender.id, receiverId: receiver.id },
    });

    if (coffeeRecord) {
        coffeeRecord.count += 1;
        await coffeeRecord.save();
    } else {
        await CoffeeCount.create({ senderId: sender.id, receiverId: receiver.id, count: 1 });
    }

    await Log.create({ type: 'logCoffee', senderId: sender.id, receiverId: receiver.id });

    console.log('Coffee transaction successful. Recomputing simplified coffee counts...');

    const success = await recomputeSimplifiedCoffeeCounts();


    return success;
};

/**
 * Adds a simplified coffee transaction between a sender and a receiver.
 * 
 * This function creates a new simplified coffee transaction between the sender and receiver, indicating that the sender is owed coffees by the receiver.
 * 
 * @param senderId - The ID of the sender.
 * @param receiverId - The ID of the receiver.
 * @param count - The number of coffees owed.
 * @returns A promise that resolves to true if the transaction was successful, or false if there was an error.
 */
const addSimplifiedCoffeeEdge = async (senderId: number, receiverId: number, count: number) => {
    if (senderId === receiverId) {
        console.log('Sender and receiver cannot be the same');
        return false;
    }

    const sender = await User.findOne({ where: { id: senderId } });
    const receiver = await User.findOne({ where: { id: receiverId } });

    if (!sender || !receiver) {
        console.log('Sender or receiver not found');
        return false;
    }

    await CoffeeCountSimplified.create({ senderId: sender.id, receiverId: receiver.id, count: count });

    return true;
}

/**
 * Recompute the coffee-simplified table based on the raw coffee data. 
 * This function should be called whenever the raw coffee data is modified.
 * 
 * @returns A promise that resolves to true if the recomputation was successful, or false if there was an error.
 */
export const recomputeSimplifiedCoffeeCounts = async () => {
    // Get the raw coffee data
    const users = await getUsersWithRawCoffeeCount();

    // Compute the simplified coffee debts
    const simplifiedCoffeeCounts = simplifyCoffeeDebts(users);

    // Clear the coffee-simplified table
    await CoffeeCountSimplified.destroy({ where: {} });

    console.log('Cleared simplified coffee counts.');


    //Add the new simplified coffee debts
    let success = true;
    for (const edge of simplifiedCoffeeCounts) {
        const edgeSuccess = await addSimplifiedCoffeeEdge(edge.senderId, edge.receiverId, edge.count);
        if (!edgeSuccess) {
            success = false;
        }
    }


    if (success) {
        console.log('Recomputed simplified coffee counts.');
    } else {
        console.log('Error recomputing simplified coffee counts.');
    }

    return success;
}

/**
 * Logs the number of rows in the simplified coffee counts table to the console. Debug function.
 */
export const logSimplifiedCoffeeCount = async (label: string='') => {
    const simplifiedCoffeeCounts = await CoffeeCountSimplified.findAll();
    console.log('[' + label + '] Number of simplified coffee counts:' + simplifiedCoffeeCounts.length);
}