/** Fila tal como viene en getAllTransactions.json (campos usados + resto opcional). */
export type TransactionListApiRow = {
    id?: number;
    transaction?: number;
    date?: string;
    hour?: string;
    type?: string;
    concept?: string;
    businessName?: string;
    business_name?: string;
    approved?: boolean;
    response_code_description?: string;
    status?: string;
    amount?: string;
    transaction_amount?: string;
    totalAmount?: string;
    [key: string]: unknown;
};

export type TransactionListResponse = {
    total: number;
    rows: TransactionListApiRow[];
};
