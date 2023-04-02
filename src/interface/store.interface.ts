export interface IMail {
    id: number, title: string, isRead: boolean, isInbox: boolean, isSelected: boolean
}

export interface IStore {
    emails: IMail[],
    modal: { isOpen: boolean, emailId: number },
    isCheckedAll: boolean
}
