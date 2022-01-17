import React from 'react'

import {useState, useEffect} from 'react'

function Price (props) {
    const {cars} = props;
    //console.log("car", cars)
  
    return (
        <>
            {cars.map((car,index) => {
                return (
                    <div key={index}>
                        <img className='price-images' src={car.image}/>
                        <div className='price-tag'>{car.typeOfCar}</div>
                        <div>{car.priceDaily}</div>
                    </div>
                )    
            })}
        </>
    )

    }

export default Price
