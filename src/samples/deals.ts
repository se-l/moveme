import { Deal } from '../gen/deal'; 
export const deals = [
    Deal.create({
        id: '1',
        ts: '13161',
        status: 'received'
    }),
    Deal.create({
        id: '2',
        ts: '13161',
        status: 'booked'
    }),
    Deal.create({
        id: '3',
        ts: '13161',
        status: 'sent'
    }),
    Deal.create({
        id: '4',
        ts: '13161',
        status: 'booked'
    }),
    Deal.create({
        id: '5',
        ts: '13161',
        status: 'failed'
    }),
]