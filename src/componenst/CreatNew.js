import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const CreatNew = () => {

    const navigation = useNavigate()

    const [name, namechange] = useState("");
    const [email, emailchange] = useState("");
    const [phone, phonechange] = useState("");
    const [age, agechange] = useState("");
    const [active, activechange] = useState(false);
    const [validation, valchange] = useState(false);
    const [images, setImages] = useState("");
    const [upimages, setUpImages] = useState("");
    const [role, rolechange] = useState("");
    console.log(role)


    const submitImage = () => {
        const data = new FormData();
        data.append("file", images)
        data.append("upload_preset", "rgwmf4dz")
        data.append("cloud_name", "dsua0hdxg")

        fetch("https://api.cloudinary.com/v1_1/dsua0hdxg/image/upload", {
            method: "post",
            body: data
        }).then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setUpImages(data.url)
            }).catch((err) => {
                console.log(err)
            })
    }


    const [employeData, setEmployeData] = useState([])

    const getData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/employee`)
            const resp = await response.json()
            const rever = resp.reverse();
            setEmployeData(rever)
        } catch (err) {
            console.log(err)
        }
    }

    // const listRepos = employeData.map(item => item.email)
    // console.log("listRepos=>", listRepos)

    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handlesubmit = (e) => {
        e.preventDefault();
        const saveUser = async () => {
            const val = { name, email, phone, active, validation, upimages, role, age }
            console.log(val)

            if (employeData && employeData.length) {
                const userEmail = employeData.filter(el => el.email === email)
                const userName = employeData.filter(el => el.name === name)
                if (userEmail.length === 0 && userName.length === 0) {
                    try {
                        await fetch('http://localhost:8000/employee', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(val)
                        });
                        navigation("/")
                    } catch (error) {
                        console.log("error=>", error)
                    }
                } else if (userName.length !== 0) {
                    alert("Name Already Present")
                } else if (userEmail.length !== 0) {
                    alert("Email Already Present")
                }
            }
        }
        saveUser()
    }


    return (
        <div>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>

                    <div className="card mt-5" style={{ "textAlign": "left" }}>
                        <div className="card-title text-center mt-3">
                            <h2>Employee Create🤝</h2>
                        </div>
                        <div className="card-body">

                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="form-group d-flex">
                                        <input type="file" onChange={e => setImages(e.target.files[0])} className="form-control"></input>
                                        <button onClick={submitImage} className="upBtn"><i className="fa fa-upload" aria-hidden="true"></i></button>
                                    </div>
                                </div>

                                <div className="col-lg-12 mt-2">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input required value={name} onMouseDown={() => valchange(true)} onChange={e => namechange(e.target.value)} className="form-control"></input>
                                        {name.length === 0 && validation && <span className="text-danger">Enter the name</span>}
                                    </div>
                                </div>

                                <div className="col-lg-12 mt-2">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" value={email} onChange={e => emailchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12 mt-2">
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input value={phone} onChange={e => phonechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12 mt-2">
                                    <div className="form-group">
                                        <label>Age</label>
                                        <input value={age} onChange={e => agechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12 mt-2">
                                    <label>Role</label>
                                    <select className="form-select" value={role} onChange={e => rolechange(e.target.value)}>
                                        <option >Role</option>
                                        <option >Admine</option>
                                        <option >Member</option>
                                        <option >User</option>
                                    </select>
                                </div>


                                <div className="col-lg-12 mt-3">
                                    <div className="form-check">

                                        <input checked={active} onChange={e => activechange(e.target.checked)} type="checkbox" className="form-check-input"></input>
                                        <label className="form-check-label">
                                            <span className="me-2">Status</span>
                                            <strong>{active === false ? "unactive" : "active"}</strong>
                                        </label>


                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group mt-3">
                                        <button className="btn btn-success me-3" type="submit">Save</button>
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

export default CreatNew


// json-server --watch db.json --port 8000