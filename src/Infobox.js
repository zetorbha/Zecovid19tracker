import React from 'react'
import {Card,CardContent,Typography} from '@material-ui/core';
import './Infobox.css'


const Infobox = ({title, active, cases, isRed,isOrenge, total, ...props}) => {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active&&`infoBox--selected`} ${isRed&&`infoBox--red`} ${isOrenge&&`infoBox--orgenge`}`}>
            <CardContent >
                <Typography className="infobox__title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className={`infobox__cases ${!isRed&&`infoBox--green`} ${isOrenge&&`infoBox--text--orgenge`}` }>{cases}</h2>
                <Typography className="infobox__total" color="textSecondary">
                  Total:  {total}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Infobox
