import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import { json, useNavigate } from 'react-router-dom';

const EditMarksheet = () => {

    const host = process.env.REACT_APP_BACKEND_URL;

    const [loading, setLoading] = useState(false);
    const [marksheet, setMarksheet] = useState({});
    const [subjectRowDisplay, setSubjectRowDisplay] = useState([]);

    let navigate = useNavigate();

    const authToken = localStorage.getItem('auth-token');
    const report = JSON.parse(localStorage.getItem('report'));

    // Return to home page for invalid access
    useEffect(() => {
        if (!authToken) {
            navigate('/', { replace: true });
        }


        const fetchSemesterInfo = async () => {
            const res = await fetch(`${host}/api/marksheet/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken
                },
                body: JSON.stringify({ _id: report._id })
            });
            return await res.json();
        }

        fetchSemesterInfo().then((jsonData) => {
            if (jsonData) {
                // console.log(jsonData);
                setMarksheet(jsonData)
                document.title = jsonData.rollNo;
                // const subjects = jsonData.subjects;
                // const element = [];
                // for (let i = 0; i < subjects.length; i++) {
                //     element.push(
                //         <tr className='text-xs' key={i} id={`${subjects[i].subjectName}`}>
                //             <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                //                 <input type="text" readOnly value={subjects[i].subjectName} name={`subjectName-${subjects[i].subjectName}`} id={`subjectName-${subjects[i].subjectName}`} className='w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                //             </td>
                //             <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                //                 <input type="number" name={`fullMarks-${subjects[i].subjectName}`} value={100} onChange={() => { handleSubjectEdit(subjects[i].subjectName) }} id={`fullMarks-${subjects[i].subjectName}`} className=' w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                //             </td>
                //             <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                //                 <input type="number" readOnly value={subjects[i].year1} name={`year1-${subjects[i].subjectName}`} id={`year1-${subjects[i].subjectName}`} className=' w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                //             </td>
                //             <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                //                 <input type="number" value={subjects[i].internalMarks} onChange={() => { handleSubjectEdit(subjects[i].subjectName) }} name={`internalMarks-${subjects[i].subjectName}`} id={`internalMarks-${subjects[i].subjectName}`} className=' w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                //             </td>
                //             {
                //                 subjects[i].year2 &&
                //                 <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                //                     <input type="number" readOnly value={subjects[i].year2} name={`year2-${subjects[i].subjectName}`} id={`year2-${subjects[i].subjectName}`} className=' w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                //                     {/* {subjects[i].year2} */}
                //                 </td>}{
                //                 subjects[i].practicalMarks &&
                //                 <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                //                     <input type="number" value={subjects[i].practicalMarks} onChange={() => { handleSubjectEdit(subjects[i].subjectName) }} name={`practicalMarks-${subjects[i].subjectName}`} id={`practicalMarks-${subjects[i].subjectName}`} className=' w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                //                 </td>
                //             }
                //             {subjects[i].theoryMarks && <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                //                 <input type="number" value={subjects[i].theoryMarks} onChange={() => { handleSubjectEdit(subjects[i].subjectName) }} name={`theoryMarks-${subjects[i].subjectName}`} id={`theoryMarks-${subjects[i].subjectName}`} className=' w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                //             </td>}
                //             <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                //                 <input type="number" value={subjects[i].total} readOnly name={`total-${subjects[i].subjectName}`} id={`total-${subjects[i].subjectName}`} className=' w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                //             </td>
                //             <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                //                 <input type="text" readOnly value={subjects[i].letterGrade} name={`letterGrade-${subjects[i].subjectName}`} id={`letterGrade-${subjects[i].subjectName}`} className=' w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                //             </td>
                //             <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                //                 <input type="number" readOnly value={subjects[i].ngp} name={`ngp-${subjects[i].subjectName}`} id={`ngp-${subjects[i].subjectName}`} className=' w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                //             </td>
                //             <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                //                 <input type="number" value={subjects[i].credit} onChange={() => { handleSubjectEdit(subjects[i].subjectName) }} name={`credit-${subjects[i].subjectName}`} id={`credit-${subjects[i].subjectName}`} className=' w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                //             </td>
                //             <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                //                 <input type="number" value={subjects[i].tgp} onChange={() => { handleSubjectEdit(subjects[i].subjectName) }} name={`tgp-${subjects[i].subjectName}`} id={`tgp-${subjects[i].subjectName}`} className=' w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                //             </td>
                //             <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                //                 <input type="text" value={jsonData.status} readOnly name={`status-${subjects[i].subjectName}`} id={`status-${subjects[i].subjectName}`} className=' w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                //             </td>
                //         </tr>
                //     );
                // }
                // setSubjectRowDisplay(element);
            }
        }).catch((error) => {
            console.log(error);
        })
    }, []);


    const getLetterGrade = (subjectPercent) => {
        if (subjectPercent >= 90 && subjectPercent <= 100) { return "A++"; }
        if (subjectPercent >= 80 && subjectPercent < 90) { return "A+"; }
        if (subjectPercent >= 70 && subjectPercent < 80) { return "A"; }
        if (subjectPercent >= 60 && subjectPercent < 70) { return "B+"; }
        if (subjectPercent >= 50 && subjectPercent < 60) { return "B" }
        if (subjectPercent >= 40 && subjectPercent < 50) { return "C+"; }
        if (subjectPercent >= 30 && subjectPercent < 40) { return "C"; }
        if (subjectPercent >= 0 && subjectPercent < 30) { return "F"; }
    }

    const handleSubjectEdit = (subjectName) => {
        console.log(subjectName);
        const index = marksheet.subjects.findIndex(element => element.subjectName === subjectName);
        console.log(index);
        let subjectObj = marksheet.subjects[index];

        subjectObj = {
            subjectName: document.getElementById(`subjectName-${subjectName}`).value,
            year1: Number(document.getElementById(`year1-${subjectName}`).value),
            fullMarks: Number(document.getElementById(`fullMarks-${subjectName}`).value),
            internalMarks: Number(document.getElementById(`internalMarks-${subjectName}`).value),
            theoryMarks: Number(document.getElementById(`theoryMarks-${subjectName}`).value),
            credit: Number(document.getElementById(`credit-${subjectName}`).value),
            tgp: Number(document.getElementById(`tgp-${subjectName}`).value)

        }

        if (marksheet.stream.toUpperCase() === "BCOM") {
            subjectObj["year2"] = Number(document.getElementById(`year2-${subjectName}`).value)
            subjectObj["total"] = subjectObj.internalMarks + subjectObj.theoryMarks;
        }
        else {
            subjectObj["practicalMarks"] = Number(document.getElementById(`practicalMarks-${subjectName}`).value)
            subjectObj["total"] = subjectObj.internalMarks + subjectObj.theoryMarks + subjectObj.practicalMarks;
        }
        subjectObj["letterGrade"] = getLetterGrade((subjectObj.total * 100) / subjectObj.fullMarks);
        subjectObj["ngp"] = subjectObj["total"]/10;

        marksheet.status = (((subjectObj.total*100)/subjectObj.total) > 30)? 'P': 'F';

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMarksheet((prev) => ({ ...prev, [name]: value }));
        // setAddSubjectRow([]);
        // todo
    }


    const handleViewSubjects = () => {
        const subjects = marksheet.subjects;
        console.log(subjects);
        const element = [];
        for (let i = 0; i < subjects.length; i++) {
            element.push(
                <tr className='text-xs' key={i} id={`${subjects[i].subjectName}`}>
                    <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                        <input type="text" readOnly value={subjects[i].subjectName} name={`subjectName-${subjects[i].subjectName}`} id={`subjectName-${subjects[i].subjectName}`} className='w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                    </td>
                    <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                        <input type="number" name={`fullMarks-${subjects[i].subjectName}`} value={100} onChange={() => { handleSubjectEdit(subjects[i].subjectName) }} id={`fullMarks-${subjects[i].subjectName}`} className=' w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                    </td>
                    <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                        <input type="number" readOnly value={subjects[i].year1} name={`year1-${subjects[i].subjectName}`} id={`year1-${subjects[i].subjectName}`} className=' w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                    </td>
                    <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                        <input type="number" value={subjects[i].internalMarks} onChange={() => { handleSubjectEdit(subjects[i].subjectName) }} name={`internalMarks-${subjects[i].subjectName}`} id={`internalMarks-${subjects[i].subjectName}`} className=' w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                    </td>
                    {
                        subjects[i].year2 &&
                        <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                            <input type="number" readOnly value={subjects[i].year2} name={`year2-${subjects[i].subjectName}`} id={`year2-${subjects[i].subjectName}`} className=' w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                            {/* {subjects[i].year2} */}
                        </td>}{
                        subjects[i].practicalMarks &&
                        <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                            <input type="number" value={subjects[i].practicalMarks} onChange={() => { handleSubjectEdit(subjects[i].subjectName) }} name={`practicalMarks-${subjects[i].subjectName}`} id={`practicalMarks-${subjects[i].subjectName}`} className=' w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                        </td>
                    }
                    {subjects[i].theoryMarks && <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                        <input type="number" value={subjects[i].theoryMarks} onChange={() => { handleSubjectEdit(subjects[i].subjectName) }} name={`theoryMarks-${subjects[i].subjectName}`} id={`theoryMarks-${subjects[i].subjectName}`} className=' w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                    </td>}
                    <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                        <input type="number" value={subjects[i].total} readOnly name={`total-${subjects[i].subjectName}`} id={`total-${subjects[i].subjectName}`} className=' w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                    </td>
                    <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                        <input type="text" readOnly value={subjects[i].letterGrade} name={`letterGrade-${subjects[i].subjectName}`} id={`letterGrade-${subjects[i].subjectName}`} className=' w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                    </td>
                    <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                        <input type="number" readOnly value={subjects[i].ngp} name={`ngp-${subjects[i].subjectName}`} id={`ngp-${subjects[i].subjectName}`} className=' w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                    </td>
                    <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                        <input type="number" value={subjects[i].credit} onChange={() => { handleSubjectEdit(subjects[i].subjectName) }} name={`credit-${subjects[i].subjectName}`} id={`credit-${subjects[i].subjectName}`} className=' w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                    </td>
                    <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                        <input type="number" value={subjects[i].tgp} onChange={() => { handleSubjectEdit(subjects[i].subjectName) }} name={`tgp-${subjects[i].subjectName}`} id={`tgp-${subjects[i].subjectName}`} className=' w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                    </td>
                    <td className={`border-2 ${i === subjects.length - 1 ? '' : 'border-b-transparent'} border-black text-center font-medium py-3 w-[8.3%] `}>
                        <input type="text" value={marksheet.status} readOnly name={`status-${subjects[i].subjectName}`} id={`status-${subjects[i].subjectName}`} className=' w-[95%] py-2 rounded-md border border-slate-500 text-center' />
                    </td>
                </tr>
            );
        }
        setSubjectRowDisplay(element);
    }












    return (
        <>
            {/* Loading Bar */}
            {loading === true ?
                <div className='absolute top-0 right-0 z-10 w-full'>
                    <Loading />
                </div> : ''
            }
            {/* Edit Student */}
            <div id="view-student" className='m-3 py-5'>
                {/* Heading */}
                <div id='heading'>
                    <h1 className='text-3xl font-semibold border-b-2 border-b-blue-600 py-2 '>Edit Marksheet</h1>
                </div>

                {/* Information */}
                <div className="w-full overflow-auto my-20">
                    <div className='w-full border-2 border-blue-500 min-w-[1240px]  '>
                        {/* <span className='mx-2'>#student-marksheet</span> */}
                        <div className='rows w-full p-3 my-3   '>
                            <div className="row flex gap-7 ">
                                <div id="name-field" className='flex gap-3 items-center  my-1 w-1/2'>
                                    <div className='w-[15%]'>
                                        <label htmlFor="name">Name</label>
                                    </div>
                                    <div>
                                        <input type="text" name="name" value={marksheet?.name} onChange={handleChange} className='border-2 border-slate-700 px-4 py-1 rounded-md' />
                                    </div>
                                </div>
                                <div className='flex gap-3 items-center border my-1 invisible'>
                                    <div className=''>
                                        <label htmlFor="">Registration No.</label>
                                    </div>
                                    <div>
                                        <input type="text" className='border-2 border-slate-700 px-4 py-1 rounded-md' />
                                    </div>
                                </div>
                            </div>
                            <div className="row flex gap-7 ">
                                <div id="rollno-field" className='flex gap-3 items-center  my-1 w-1/2'>
                                    <div className='w-[15%]'>
                                        <label htmlFor="rollNo">Roll No.</label>
                                    </div>
                                    <div>
                                        <input type="text" name="rollNo" value={marksheet?.rollNo} className='border-2 border-slate-700 px-4 py-1 rounded-md' />
                                    </div>
                                </div>
                                <div id="registrationno-field" className='flex gap-3 items-center  my-1 '>
                                    <div className=''>
                                        <label htmlFor="registrationNo">Registration No.</label>
                                    </div>
                                    <div>
                                        <input type="text" name="registrationNo" value={marksheet?.registrationNo} readOnly className='border-2 border-slate-700 px-4 py-1 rounded-md' />
                                    </div>
                                </div>
                            </div>

                            <hr className='my-9 border-slate-300' />
                            <div className="row flex gap-7  ">
                                <div id="stream-field" className='flex gap-3 items-center  my-1 w-1/4'>
                                    <div className=''>
                                        <label htmlFor="stream">Stream</label>
                                    </div>
                                    <div className='w-full'>
                                        <select name="stream" id="stream" value={marksheet?.stream} className='border-2 border-slate-700 w-full px-4 py-1 rounded-md'>
                                            <option value="bcom">BCOM</option>
                                            <option value="ba">BA</option>
                                            <option value="bsc">BSC</option>
                                        </select>
                                    </div>
                                </div>
                                <div id="course-field" className='flex gap-3 items-center my-1 w-1/4'>
                                    <div className=''>
                                        <label htmlFor="course">Course</label>
                                    </div>
                                    <div className='w-full'>
                                        <select name="course" id="course" value={marksheet?.course} className='border-2 border-slate-700 w-full px-4 py-1 rounded-md'>
                                            <option value="honours">honours</option>
                                            <option value="general">general</option>
                                        </select>
                                    </div>
                                </div>
                                <div id="semester-field" className='flex gap-3 items-center my-1 w-1/4'>
                                    <div className=''>
                                        <label htmlFor="semester">Semester</label>
                                    </div>
                                    <div>
                                        <input type="number" name="semester" value={marksheet?.semester} className='border-2 border-slate-700 px-4 py-1 rounded-md' />
                                    </div>
                                </div>
                                <div id="year-field" className='flex gap-3 items-center my-1 w-1/4'>
                                    <div className=''>
                                        <label htmlFor="year">Year</label>
                                    </div>
                                    <div>
                                        <input type="number" name="year" value={marksheet?.year} readOnly className='border-2 border-slate-700 px-4 py-1 rounded-md' />
                                    </div>
                                </div>
                            </div>
                            <hr className='my-9 border-slate-300' />


                            <div className="row w-full">
                                <div className="w-full flex justify-between items-center ">
                                    <h3 className='text-xl font-medium my-2'>Semester: {marksheet?.semester}</h3>
                                    <div>
                                        <button className='px-4 py-2 bg-blue-500 text-white font-medium rounded-md' onClick={handleViewSubjects}>View Subjects</button>
                                    </div>
                                </div>

                                {/* Edit Subject */}
                                <div className='w-full'>
                                    <table className='w-full border-2 border-black'>
                                        <thead className='w-full bg-slate-100'>
                                            <td className='border-2 border-black text-center font-medium py-3 w-[8.3%]'>Subject</td>
                                            <td className='border-2 border-black text-center font-medium py-3 w-[8.3%]'>Full Marks</td>
                                            <td className='border-2 border-black text-center font-medium py-3 w-[8.3%]'>Year1</td>
                                            <td className='border-2 border-black text-center font-medium py-3 w-[8.3%]'>Internal M</td>
                                            {marksheet?.stream?.toUpperCase() === "BCOM" ?
                                                <td className='border-2 border-black text-center font-medium py-3 w-[8.3%]'>Year2</td> :
                                                <td className='border-2 border-black text-center font-medium py-3 w-[8.3%]'>Practical M</td>
                                            }
                                            <td className='border-2 border-black text-center font-medium py-3 w-[8.3%]'>Theory M</td>
                                            <td className='border-2 border-black text-center font-medium py-3 w-[8.3%]'>Total</td>
                                            <td className='border-2 border-black text-center font-medium py-3 w-[8.3%]'>Grade</td>
                                            <td className='border-2 border-black text-center font-medium py-3 w-[8.3%]'>NGP</td>
                                            <td className='border-2 border-black text-center font-medium py-3 w-[8.3%]'>Credit</td>
                                            <td className='border-2 border-black text-center font-medium py-3 w-[8.3%]'>TGP</td>
                                            <td className='border-2 border-black text-center font-medium py-3 w-[8.3%]'>Status</td>
                                            {/* <td className='border-2 border-black text-center font-medium py-3 w-[8.3%]'>Actions</td> */}
                                        </thead>
                                        <tbody className='border-2 border-black'>
                                            {/* {addSubjectRow} */}
                                            {subjectRowDisplay}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <hr className='my-9 border-slate-300' />



                            <div>
                                <button className='bg-green-500 hover:bg-green-600 text-white font-medium rounded-md px-4 py-2'>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default EditMarksheet
