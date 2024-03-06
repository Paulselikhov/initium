export interface IClient {
    id?: number,
    name: string,
    surname: string,
    email: string,
    phone: string
}

export interface IClientWithSelect extends IClient {
    selected: boolean;
}

export enum MODES {
    ADD = 'add',
    EDIT = 'edit'
}