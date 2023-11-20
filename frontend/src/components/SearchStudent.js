import React, { useState } from 'react'
import Loading from './Loading';
import { Link } from 'react-router-dom';
import SemesterReportRow from './SemesterReportRow';


const SearchStudent = () => {

  const host = process.env.REACT_APP_BACKEND_URL;

  const [loading, setLoading] = useState(false);

  const [rollNo, setRollNo] = useState('');

  const [reportArr, setReportArr] = useState([]);

  const handleChange = (event) => {
    setRollNo(event.target.value);
  }

  // TODO: Result Display
  const handleSearch = async () => {
    setLoading(true);
    console.log(rollNo)
    const res = await fetch(`${host}/api/marksheet/search-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
      },
      body: JSON.stringify({ rollNo })
    });
    const data = await res.json();
    setLoading(false);
    console.log(data);
    if (data) {
      const element = [];
      let cummulativeCredit = 0;
      for (let i = 0; i < data.length; i++) {
        // data[i]["cummulativeCredit"] = /
        cummulativeCredit += data[i].totalCredit;
      }

      for (let i = 0; i < data.length; i++) {
        if (Number(data[i].semester) === 6) {
          data[i]["cummulativeCredit"] = cummulativeCredit;
          break;
        }
      }

      for (let i = 0; i < data.length; i++) {
        element.push(
          <SemesterReportRow
            key={i + 1}
            report={data[i]}
          />
        );
      }
      setReportArr(element);
    }

  }



  return (
    <>
      {/* Loading Bar */}
      {loading === true ?
        <div className='absolute top-0 right-0 z-10 w-full'>
          <Loading />
        </div> : ''}

      {/* Search Student */}
      <div id="search-student" className='my-3 py-5 w-full overflow-x-scroll'>
        <div id='heading'>
          <h1 className='text-3xl font-semibold border-b-2 border-b-blue-600 py-2 '>Search Student</h1>
        </div>
        <div className='w-full  my-5 '>
          <div className="rows w-full p-3 my-3 mt-9">

            <div className="row flex flex-col items-center lg:flex-row gap-7 ">
              <div id="rollno-field" className='flex items-center gap-3 w-full lg:w-auto my-1 '>
                <div className=''>
                  <label htmlFor="roll_no">Roll No.</label>
                </div>
                <div>
                  <input type="text" name="rollNo" id="rollNo" value={rollNo} onChange={handleChange} className='border-2 w-full lg:w-auto border-slate-700 px-4 py-1 rounded-md' />
                </div>
              </div>
              <div className='row my-3 '>
                <button onClick={handleSearch} className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 '>Search</button>

              </div>
            </div>


            <hr className='my-9 border-slate-300' />

            {/* Display the table */}
            <div className='w-full'>
              <table className='w-full border-2 border-black min-w-[1240px] overflow-x-scroll'>
                <thead className='bg-slate-100 min-w-[1240px] overflow-x-scroll'>
                  <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>Roll No.</td>
                  <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>Semester</td>
                  <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>Year</td>
                  <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>Full Marks</td>
                  <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>Marks Obtained</td>
                  <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>Semester Credit</td>
                  <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>SGPA</td>
                  <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>Cummulative Credit</td>
                  <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>CGPA</td>
                  <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>Letter Grade</td>
                  <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>Remarks</td>
                  <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>Action</td>
                </thead>
                <tbody >
                  {reportArr}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default SearchStudent
