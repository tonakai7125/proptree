

export class DuplicatePropDefError extends Error
{
    public readonly propertyName: string;
    constructor(propertyName: string) {
        super(`Duplicate property definition: ${propertyName}`);
        this.propertyName = propertyName;
    }
}

