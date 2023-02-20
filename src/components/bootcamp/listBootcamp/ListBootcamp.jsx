import { useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { SET_BOOTCAMP_DATA } from '../../../redux/slice/bootCampSlice'
import { AccessBootcampAPI } from '../../../services/bootcamp/BootcampService'
import './ListBootcamp.css'
const ListBootcamp = () => {
    const [bootcampList, setBootcampList] = useState([])
    const [selectIsNameChecked, setSelectIsNameChecked] = useState(false)
    const [selectedMiles, setSelectedMiles] = useState(0)
    const [selectedZipcode, setselectedZipcode] = useState(0)
    const [selectedPriceRange, setselectedPriceRange] = useState(0)
    const [selectHousing, setselectHousing] = useState(false)
    const [selectJobGuarantee, setselectJobGuarantee] = useState(false)
    // const dispatch = useDispatch() 
    const dispatch = useDispatch()
    const accessBootcampApi = new AccessBootcampAPI(dispatch)
    //Todo: bootcamp api interceptor not working on useEffect as different dispatch instance has been used
    useEffect(() => {
        const fetchBootcamps = async () => {
            const query = {}
            const bootcamps = await accessBootcampApi.getAllBootcampByFiltering(query, dispatch)
            dispatch(SET_BOOTCAMP_DATA({ bootcampData: bootcamps.data }))
            setBootcampList(bootcamps.data)
        }
        fetchBootcamps()
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        const query = {
            name: selectIsNameChecked,
            distance: selectedMiles,
            price: selectedPriceRange,
            housing: selectHousing,
            jobGuarantee: selectJobGuarantee,
            page: 1,
            limit: 5,
            zipcode: selectedZipcode
        }
        const bootcamps = await accessBootcampApi.getAllBootcampByFiltering(query, dispatch)
        dispatch(SET_BOOTCAMP_DATA({ bootcampData: bootcamps.data }))
        setBootcampList(bootcamps.data)
    }
    return (
        <div className='wholepage h-screen'>
            <div className='sidebar'>
                <div className="card  bg-base-100 shadow-xl">
                    <div >
                        <form onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="cursor-pointer label">
                                    <span className="label-text">Sort By Name:&nbsp  </span>
                                    <input type='checkbox' checked={selectIsNameChecked} onChange={(e) => setSelectIsNameChecked(!selectIsNameChecked)} className="toggle toggle-info" />
                                </label>
                            </div>
                            <div className='card-body'>
                                <h2 className="card-title">Search By Distance</h2>
                                <input onChange={(e) => setSelectedMiles(e.target.value)} type="number" placeholder="Miles from" className="input input-bordered w-full max-w-xs" />
                                <input onChange={(e) => setselectedZipcode(e.target.value)} type="number" placeholder="Zipcode" className="input input-bordered w-full max-w-xs" />
                                <h2 className="card-title">Search By Price:<span className='text-success'>${selectedPriceRange}</span></h2>
                                <input onChange={(e) => setselectedPriceRange(e.target.value)} type="range" min="0" max="20000" defaultValue="0" className="range range-xs" />
                            </div>
                            <div className='justify-center others-search flex flex-row gap-5 flex-wrap content-center'>
                                <div className="form-control">
                                    <label className="cursor-pointer label">
                                        <span className="label-text">Housing:&nbsp  </span>
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-warning"
                                            checked={selectHousing}
                                            onChange={(e) => setselectHousing(!selectHousing)}
                                        />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="cursor-pointer label">
                                        <span className="label-text">Job Guarantee:&nbsp  </span>
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-warning"
                                            checked={selectJobGuarantee}
                                            onChange={(e) => setselectJobGuarantee(!selectJobGuarantee)}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="card-actions justify-center">
                                <button type='submit' className="btn search-btn">Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='bootcamp-list mt-8' >
                <div className="card card-side bg-base-100 shadow-xl">
                    <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">New movie is released!</h2>
                        <p>Click the button to watch on Jetflix app.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Watch</button>
                        </div>
                    </div>
                </div>
                <div className="card card-side bg-base-100 shadow-xl">
                    <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">New movie is released!</h2>
                        <p>Click the button to watch on Jetflix app.</p>
                        <div className="card-actions justify-end">
                            <button className=" btn btn-primary pt-6">Watch</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ListBootcamp