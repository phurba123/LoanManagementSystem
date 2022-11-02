export enum AddEditEnum {
    AddCustomer = "add",
    EditCustomer = "edit"
}

export interface Customer {
    _id?: any,
    firstName: string,
    lastName: string,
    email: string,
    contactNo: Number,
    dob: Date| string,
    department: string
}