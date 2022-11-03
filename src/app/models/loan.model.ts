export enum LoanStatusEnum {
    ACTIVE = "active",
    INACTIVE = "inactive"
}

export interface Loan {
    _id?: string,
    customerId: string,
    customerName: string,
    loanType: string,
    totalAmount: number,
    amountPaid: number,
    amountDue: number,
    loanIssueDate: Date | string,
    loanStatus: LoanStatusEnum.ACTIVE | LoanStatusEnum.INACTIVE
}