export interface FiltersProps{
    [index: string]: {filter:string, dbColumn:string[]}
}

export const OrderFilters: FiltersProps={
    ORDER_NUMBER:{
        filter:'order_number',
        dbColumn:[
            'o.order_number'
        ]
    },
    USERNAME:{
        filter:'username',
        dbColumn:[
            'u.first_name',
            'u.last_name'
        ]
    },
    ORDER_STATUS:{
        filter:'order_status',
        dbColumn:[
            'os.name'
        ]
    },
    CLIENT_NAME:{
        filter:'client_name',
        dbColumn:[
            'c.name'
        ]
    }
}

export const PrinterFilters: FiltersProps={
    MODEL:{
        filter:'model',
        dbColumn:[
            'pm.name'
        ]
    },
    BRAND:{
        filter:'brand',
        dbColumn:[
            'pb.name'
        ]
    },
    STATUS:{
        filter:'status',
        dbColumn:[
            'pb.name'
        ]
    },
    TYPE:{
        filter:'type',
        dbColumn:[
            'pt.name'
        ]
    },
    SERIAL_NUMBER:{
        filter:'serial_number',
        dbColumn:[
            'p.serial_number'
        ]
    }
}

export const ClientFilters: FiltersProps={
    NAME:{
        filter:'name',
        dbColumn:[
            'c.name'
        ]
    },
    CITY:{
        filter:'city',
        dbColumn:[
            'c.city'
        ]
    }
}

export const UserFilters: FiltersProps={
    USER_NAME:{
        filter:'user_name',
        dbColumn:[
            'u.first_name',
            'u.last_name'
        ]
    },
    EMAIL:{
        filter:'email',
        dbColumn:[
            'u.email'
        ]
    }
}

export const MaterialFilters: FiltersProps={
    MATERIAL:{
        filter:'material',
        dbColumn:[
            'm.name',
        ]
    },
    TYPE:{
        filter:'type',
        dbColumn:[
            'mt.name'
        ]
    }
}