export default interface ICards {
    id: string
    title: string
    description: string
    image: string
    price: number
    count: number
}

// type Record = { body: string }
// type Event = { Records: Record[] }
interface Record {
    body: string
}

export interface IProp {
    Records: Record[]
}
