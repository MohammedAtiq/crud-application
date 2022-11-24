import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const Detail = () => {
    const { emplyId } = useParams()

    const [emplyData, setEmployeData] = useState({})

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/employee/${emplyId}`)
                const resp = await response.json()
                setEmployeData(resp)
            } catch (err) {
                console.log(err)
            }
        }
        getData()
    }, [emplyId])

    return (
        <div className="container mt-3 ">
            <div className="card-title text-center mb-3">
                <h2>Employee Details</h2>
            </div>
            <div className="card row p-3" style={{ "textAlign": "left" }}>
                {emplyData &&
                    <div>
                        <img src={emplyData.upimages} alt="" className="detImg" />
                        <h2>The Employee name is : <b>{emplyData.name}</b></h2>
                        <h3>Contact Details</h3>
                        <h5>Id :  {emplyData.id}</h5>
                        <h5>Role : {emplyData.role}</h5>
                        <h5>Email is : {emplyData.email}</h5>
                        <h5>Phone is : {emplyData.phone}</h5>
                        <h5>Age is : {emplyData.age}</h5>
                        <Link className="btn btn-danger" to="/">Back to Listing</Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default Detail
