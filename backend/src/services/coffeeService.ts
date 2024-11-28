// src/services/coffeeService.ts
import { User, CoffeeCount, Log } from '../models';

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

    console.log('Coffee transaction successful');
    return true;
};