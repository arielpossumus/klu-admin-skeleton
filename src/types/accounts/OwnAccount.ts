export type OwnAccount = {
    id: string;
    name: string;
    dueDate: string;
    currency: string;
    alias: string;
    type: string;
    accountHolder: string;
};

/** Par cobros / pagos desde mock o API. */
export type OwnAccountsBundle = {
    cobros: OwnAccount;
    pagos: OwnAccount;
};

export type AccountPurpose = keyof OwnAccountsBundle;
