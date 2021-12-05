export class Flow {
    constructor(public flowId: number,
        public companyId: string,
        public name: string,
        public description: string,
        public documents: Array<FlowDocument>) { 
    }
}

export class FlowDocument {
    constructor(public id: number,
        public flowId: number,
        public documentName: string,
        public fileName: string,
        public fileContent: Blob,
        public downloadable: boolean) { 
    }
}