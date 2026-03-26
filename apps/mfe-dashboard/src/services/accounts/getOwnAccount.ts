import { axiosClient } from "@/services/axiosClient";
import type { OwnAccount, OwnAccountsBundle } from "@/types/accounts/OwnAccount";

const ENDPOINT = "/mockups/accounts/getAccount.json";

const emptyAccount = (): OwnAccount => ({
    id: "",
    name: "",
    dueDate: "",
    currency: "",
    alias: "",
    type: "",
    accountHolder: "",
});

const emptyBundle = (): OwnAccountsBundle => ({
    cobros: emptyAccount(),
    pagos: emptyAccount(),
});

const str = (raw: unknown, fallback = ""): string =>
    typeof raw === "string" && raw.trim() !== "" ? raw.trim() : fallback;

const normalizeAccount = (raw: unknown): OwnAccount => {
    if (raw == null || typeof raw !== "object") return emptyAccount();
    const o = raw as Record<string, unknown>;
    return {
        id: str(o.id),
        name: str(o.name),
        dueDate: str(o.dueDate),
        currency: str(o.currency),
        alias: str(o.alias),
        type: str(o.type),
        accountHolder: str(o.accountHolder ?? o.titular),
    };
};

const normalize = (raw: unknown): OwnAccountsBundle => {
    if (raw == null || typeof raw !== "object") return emptyBundle();
    const root = raw as Record<string, unknown>;
    const dataResponse = root.data_response;
    if (dataResponse == null || typeof dataResponse !== "object") return emptyBundle();
    const dr = dataResponse as Record<string, unknown>;

    const accounts = dr.accounts;
    if (accounts != null && typeof accounts === "object") {
        const a = accounts as Record<string, unknown>;
        return {
            cobros: normalizeAccount(a.cobros),
            pagos: normalizeAccount(a.pagos),
        };
    }

    const legacy = dr.account;
    const one = normalizeAccount(legacy);
    return { cobros: one, pagos: one };
};

export const getOwnAccounts = async (): Promise<OwnAccountsBundle> => {
    const { data } = await axiosClient.get<unknown>(ENDPOINT);
    return normalize(data);
};
