export interface ILayout {
    _id?: string,
    name: string,
    russian_name: string,
    layout: string,
    priority: number,
    variables: {
        varName: string,
        type: string,
        russian_varName: string
    }[],
}
