import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditEmply = () => {
    const { iid } = useParams()

    const navigation = useNavigate()

    const [name, namechange] = useState("");
    const [email, emailchange] = useState("");
    const [phone, phonechange] = useState("");
    const [active, activechange] = useState(true);
    const [validation, valchange] = useState(false);
    const [upimages, setUpImages] = useState("");
    const [age, agechange] = useState("");
    console.log(age)

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/employee/${iid}`)
                const resp = await response.json()
                console.log(resp)
                namechange(resp.name)
                emailchange(resp.email)
                phonechange(resp.phone)
                activechange(resp.active)
                setUpImages(resp.upimages)
                agechange(resp.age)
            } catch (err) {
                console.log(err)
            }
        }
        getData()
    }, [iid])



    const handlesubmit = (e) => {
        e.preventDefault();

        const saveUser = async () => {
            const val = { name, email, phone, active, validation, upimages, age }

            try {
                await fetch(`http://localhost:8000/employee/${iid}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(val)
                });
                navigation("/")
            } catch (error) {
                console.log("error=>", error)
            }
        }
        saveUser()
    }


    return (
        <div>
            <div className="offset-lg-3 col-lg-6 mt-5">
                <form className="container" onSubmit={handlesubmit}>

                    <div className="card" style={{ "textAlign": "left" }}>
                        <div className="card-title text-center mt-2">
                            <h2>Employe Edit</h2>
                        </div>
                        <div className="card-body">

                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input required value={name} onMouseDown={() => valchange(true)} onChange={e => namechange(e.target.value)} className="form-control"></input>
                                        {name.length === 0 && validation && <span className="text-danger">Enter the name</span>}
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" value={email} onChange={e => emailchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input value={phone} onChange={e => phonechange(e.target.value)} className="form-control"></input>

                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-check">
                                        <input checked={active} onChange={e => activechange(e.target.checked)} type="checkbox" className="form-check-input"></input>
                                        <label className="form-check-label">Is Active</label>

                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group mt-3">
                                        <button className="btn btn-success me-4" type="submit">Edit</button>
                                        <Link to="/" className="btn btn-danger">Back</Link>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </form>

            </div>
        </div>
    )
}

export default EditEmply
