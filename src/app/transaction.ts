export class Transaction {
    uuid: string;
    timestamp: string;
    amount: number;

    constructor(uuid: string, timestamp: string, amount: number) {
        this.uuid = uuid;
        this.timestamp = timestamp;
        this.amount = amount;
    }
}
