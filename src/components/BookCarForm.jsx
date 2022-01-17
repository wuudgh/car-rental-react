import React from 'react'
import Confirmed from './Confirmed';

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router';



const BookCarForm = (props) => {
    const {cars} = props;
    
    const [submit, setSubmit] = useState(false);
    const navigate = useNavigate ()
    
    

    const [bookingInfo, setBookingInfo] = useState({
        carType:"",
        pickUpDate:"",
        returnDate:"",
        cityName:"",
    });

    useEffect(() => {
        if(submit){
            postBookingInfo()   
        }
        setSubmit(false)
    },[submit, bookingInfo])

    //post fetch bookingInfo*************
    const postBookingInfo =() => {
        try{
            fetch('http://localhost:4000/Bookings', {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(bookingInfo)
            })
            .then(res => res.json())
            .then(data => {
                console.log("data", data);
                setBookingInfo(data)
                navigate("/confirmed")
            })
        }
        catch (error){
            console.log("carsFetch",error)
        }
    } 
       
    const submitHandler = (e) => {
        e.preventDefault();
        setSubmit(true);
    }
     
    const changeCarType = (e) => {
        setBookingInfo({...bookingInfo,carType: e.target.value,})    
    }

    const changePickUPDate = (e) => {
        setBookingInfo({...bookingInfo,pickUpDate: e.target.value})
    }
    const changeReturnDate = (e) => {
        setBookingInfo({...bookingInfo,returnDate: e.target.value})
    }
    const changeCityName = (e) => {
        setBookingInfo({...bookingInfo,cityName: e.target.value})
    }




    return ( 
        <form id="book-a-form" onSubmit={submitHandler}>
            <h3 className="h3">It's easy for you <br/>to rent a car</h3>
                      <label className="cartype" htmlFor="car-type">Car Type:</label>
                      <select className="select-car-type" name="car type" onChange={changeCarType}>
                          <option value="">select car</option>
                          {cars && cars.map((car) =>{
                              return(   
                                        <option value={car.typeOfCar}>{car.typeOfCar}</option>  
                              )
                          })}   
                      </select>
                  <div className="pickup-date">
                    <label className="pickupdate" htmlFor="Pickup-Date">Pick Up Date:</label>
                   <input
                      type="Date"  
                      name="pickup-date"
                      value={bookingInfo.pickUpDate}
                      onChange={changePickUPDate}
                      /> 
                      </div>
                      <div className="return-date">
                      <label>Return Date:</label>
                      <input 
                        type="date" 
                        name="return-date"
                        value={bookingInfo.returnDate}
                        onChange={changeReturnDate}
                      />
                      </div>
                      <div className="location">
                          <label htmlFor="cities">Cities:</label>
                          <select className="select-cities" name="cities" onChange={changeCityName}>
                              <option value="">select city</option>
                              <option value="accra">Accra</option>
                              <option value="kumasi">Kumasi</option>
                              <option value="cape">Cape Coast</option>  
                          </select>
                      </div>
                      <div className="reserve">
                          <button type = "submit">Reserve Now</button>
                      </div>
      </form>
          
         
        
          
    )
}

export default BookCarForm
