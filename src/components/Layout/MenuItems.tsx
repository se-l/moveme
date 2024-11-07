import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppCtx } from '../../AppCtx'
import { ListItemButton, MenuItem } from '@mui/material'
import _ from 'lodash'

export default function MenuItems() {
    const navigate = useNavigate()
    const appCtx = useContext(AppCtx)
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    const routeItems = [
        { label: 'Deals', route: '/deals' },
        { label: 'Mappings', route: '/mappings' },
        { label: 'Analytics', route: '/analytics' }
    ]

    return (
        <>
            {_.map(routeItems, (item, index) => (
                <ListItemButton
                    key={index}
                    selected={selectedIndex === index}
                    onClick={(event) => {
                        setSelectedIndex(index)
                        navigate(item.route)
                    }}
                >
                    <MenuItem>{item.label}</MenuItem>
                </ListItemButton>
            ))}
        </>
    )
}
