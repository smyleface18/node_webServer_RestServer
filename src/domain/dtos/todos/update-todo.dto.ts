



export class UpdateTodoDto {

    constructor(
        public readonly id: Number,
        public readonly text?: string,
        public readonly completedAt?: Date
    ){}

    get values() {
        const returnObj: {[key: string]: any} = {};

        if(this.text) returnObj.text = this.text;
        if(this.completedAt) returnObj.completedAt = this.completedAt

      return  returnObj
    }

    static create( props: {[key: string]: any}): [string?, UpdateTodoDto?]{

        const {id, text, completedAt } = props;
        let newCompletedAt = completedAt

        if( !id || isNaN(Number(id)) ) return ['id must be a valid number'] 

        if(completedAt){
            const newCompletedAt = new Date(completedAt)
            if(newCompletedAt.getTime.toString() === 'Invalid Date'){
                return ['CompletedAt must be a valid date']
            }
        }

        {
            completedAt
        }
        return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
    }

}