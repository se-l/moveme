import { Field, Table, Row } from "../gen/table";


export const tables: Table[] = [
    Table.create({ 
        name: 'Trader', 
        schema: [
        Field.create({ name: 'TraderUUID', type: 'string' }), 
        Field.create({ name: 'NBKID', type: 'string' }),
        Field.create({ name: 'TraderName', type: 'string' })
    ], 
    rows: [
        Row.create({ values: ['123456:', 'zkya2n5', 'Sebastian Lueneburg'] }),
        Row.create({ values: ['456:', 'abcde', 'Big Whale 2'] }),
    ] }),

    Table.create({ 
        name: 'Book', 
        schema: [
        Field.create({ name: 'DealCode', type: 'string' }), 
        Field.create({ name: 'TraderNBK', type: 'string' }),
        Field.create({ name: 'Currency', type: 'string' })
    ],
    rows: [
        Row.create({ values: ['123456:', 'zkya2n5', 'IDR'] }),
        Row.create({ values: ['456:', 'abcde', 'IDR'] }),
    ] }),

    Table.create({ 
        name: 'Counterparty', 
        schema: [
        Field.create({ name: 'CounterpartyUUID', type: 'string' }),
        Field.create({ name: 'CounterpartyName', type: 'string' }),
        Field.create({ name: 'SierraMnemonic', type: 'string' })
    ],
    rows: [
        Row.create({ values: ['123456:', 'Counterparty 1', 'CP1'] }),
        Row.create({ values: ['456:', 'Counterparty 2', 'CP2'] }),
    ] })
]