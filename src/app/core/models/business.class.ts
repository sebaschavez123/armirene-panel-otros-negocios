import { BranchOffice } from "./branch-office.class";

export class Business {
    id: number;
    name: string;
    type: string;
    ownerId: number;
    deliveryPerWeek: number;
    image : string;
    branchOfficeList: Array<BranchOffice>
    constructor() {
        this.name = '';
        this.type = '';
        this.ownerId = 0;
        this.deliveryPerWeek = 0;
        this.branchOfficeList = [];
    }
}