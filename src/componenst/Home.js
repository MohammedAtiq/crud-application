import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
    // const [check, setCheck] = useState(true)
    const [employeData, setEmployeData] = useState([])
    const handleCheck = (id) => {
        let employeDataOri = [...employeData];
        let index = employeDataOri.findIndex(item => item.id === id);
        // console.log(index)
        if (index !== -1) {
            employeDataOri[index].active = !employeDataOri[index].active;
        }
        console.log(employeDataOri[index].active)
        setEmployeData(employeDataOri);

        if (employeDataOri[index].active === true) {
            alert(employeDataOri[index].name + ' is active')
        }

        // setCheck(!check)
    }
    // console.log("check", check)

    const navigate = useNavigate()
    const LoadDetail = (id) => {
        navigate(`/Detail/${id}`)

    }

    const LoadEdit = (id) => {
        navigate(`/Edit/${id}`)
    }

    const Removefunction = (id) => {
        if (window.confirm('Are you sure you want to remove')) {
            const saveUser = async () => {
                try {
                    await fetch(`http://localhost:8000/employee/${id}`, {
                        method: 'DELETE'
                    });
                    getData()
                } catch (error) {
                    console.log("error=>", error)
                }
            }
            saveUser()
        }
    }


    const [search, setSearch] = useState('')
    const getData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/employee?q=${search}`)
            const resp = await response.json()
            const rever = resp.reverse();
            setEmployeData(rever)
        } catch (err) {
            console.log(err)
        }
    }

    const againApi = async () => {
        try {
            const response = await fetch(`http://localhost:8000/employee`)
            const resp = await response.json()
            const rever = resp.reverse();
            setEmployeData(rever)
            setSearch('')
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleSearch = async (e) => {
        e.preventDefault()
        getData()
    }

    return (
        <div className="container">
            <div className="card mt-5">
                <div className="card-title text-center mt-2">
                    <h2>Employee Listing</h2>
                </div>

                <div className=" position-relative">
                    <form className="text-center" onSubmit={handleSearch}>
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
                        <button className="btn btn-success p-1 mx-2" type="submit">search</button>
                    </form>
                    {
                        search.length !== 0 ? <button onClick={againApi} className="btn p-1 crossBtn"><i className="fa fa-times" aria-hidden="true"></i></button> : ''
                    }
                </div>

                <div className="card-body">
                    <div className="divbtn mb-3 d-flex justify-content-end ">
                        <Link to="/CreatNew" className="btn btn-success">Add New <i className="fa fa-plus-square" aria-hidden="true"></i></Link>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="bg-dark text-white">
                                <tr>
                                    <td>ID</td>
                                    <td>Image</td>
                                    <td>Name</td>
                                    <td>Email</td>
                                    <td>Phone</td>
                                    <td className="text-center">Action</td>
                                    <td>Active</td>
                                    <td>status</td>
                                </tr>
                            </thead>
                            <tbody>
                                {employeData &&
                                    employeData.map((item, epId) => (
                                        <tr key={epId}>
                                            <td>{epId + 1}</td>
                                            <td><img src={item.upimages} alt="" className="tableImg" /></td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td className="d-flex justify-content-center">
                                                <button onClick={() => LoadDetail(item.id)} className="btn btn-primary mx-2"><i className="fa fa-info-circle" aria-hidden="true"></i></button>
                                                <button onClick={() => LoadEdit(item.id)} className="btn btn-success mx-2"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                                <button onClick={() => Removefunction(item.id)} className="btn btn-danger mx-2"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
                                            </td>
                                            <td>{item.active ? <p class="text-decoration-underline text-primary">Online</p> : <p class="text-decoration-line-through text-danger">Ofline</p>}</td>
                                            <td ><div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" value={item.active} onClick={() => handleCheck(item.id)} />
                                            </div>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
