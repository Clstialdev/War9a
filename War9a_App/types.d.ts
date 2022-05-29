type languages = "english" | "french" | "arabic"


type latlng = {latitude: number, longitude: number}

type serviceRegistration = {
    name:string,
    nameAsArray:Array<string>,
    address:string,
    latlng: latlng,
    city:string,
    image: string,
    description:string,
    owner: string,
    phone: string,
    created: Timestamp,
    queued: any,
    seats: number,
    lanes: number,
    laneTypes: Array<string>,
    openCloseDates: string,
    tags: [string],
    likes: number,
    rating: number,
    tpc: number,
}

type tags = "doctor"|"barber"|"food"|""|"other";

type service = {
    name:string,
    address:string,
    city:string,
    description:string,
    tpc: number
}

type stateTagProps = {
    icon?:string,
    name:string,
    active?:boolean,
    color?:string,
    onPress?:()=>void,
}

type notificationSettings = {
    active: boolean,
    sound: boolean,
    onRemoved: boolean,
    onNewClient: boolean
}