import React from 'react'

const SearchRow = ({year, arr, rollNo}) => {

    // console.log(props);
    const host = process.env.REACT_APP_BACKEND_URL;

    const handleEdit = () => {
    //     localStorage.setItem("report", JSON.stringify(props.report));
    //     window.open('/edit', '_blank');
    }

    // TODO: API fileName
    const handleView = async (semester) => {
        // console.log('fired');
        // console.log('View');
        const res = await fetch(`${host}/api/marksheet/get-pdf`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            },
            body: JSON.stringify({
                rollNo: rollNo,
                semester: semester,
                year: year,
                stream: arr[0].stream,
            })
        });
        if (res.ok) {
            // Handle the response here (e.g., display the PDF to the user)
            const blob = await res.blob();
            // Create a URL for the PDF blob
            const pdfUrl = URL.createObjectURL(blob);

            // Open the PDF in a new tab or download it
            window.open(pdfUrl, '_blank');
        } else {
            alert('Marksheet does not exist!');
        }

    }

    return (
        <tr className=' '>
            <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>{year}</td>
            <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>
                {
                    arr.some((ele)=>ele.semester===1)? 
                    <div className='flex gap-1 justify-center items-center'>
                        <button onClick={handleEdit} className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md'>Edit</button>
                        <button onClick={()=>{handleView(1)} } className='px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md'>View</button>
                    </div>
                    : ''
                }
                </td>
            <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>
               { arr.some((ele)=>ele.semester===2)? 
                    <div className='flex gap-1 justify-center items-center'>
                        <button onClick={handleEdit} className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md'>Edit</button>
                        <button onClick={()=>{handleView(2)} } className='px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md'>View</button>
                    </div>
                    : ''}
            </td>
            <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>
                {
                    arr.some((ele)=>ele.semester===3)? 
                    <div className='flex gap-1 justify-center items-center'>
                        <button onClick={handleEdit} className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md'>Edit</button>
                        <button onClick={()=>{handleView(3)} } className='px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md'>View</button>
                    </div>
                    : ''
                }
            </td>
            <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>
                {
                    arr.some((ele)=>ele.semester===4)? 
                    <div className='flex gap-1 justify-center items-center'>
                        <button onClick={handleEdit} className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md'>Edit</button>
                        <button onClick={()=>{handleView(4)} } className='px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md'>View</button>
                    </div>
                    : ''
                }
            </td>
            <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>
            {arr.some((ele)=>ele.semester===5)? 
                    <div className='flex gap-1 justify-center items-center'>
                        <button onClick={handleEdit} className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md'>Edit</button>
                        <button onClick={()=>{handleView(5)} } className='px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md'>View</button>
                    </div>
                    : ''}
            </td>
            <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>
                {
                    arr.some((ele)=>ele.semester===6)? 
                    <div className='flex gap-1 justify-center items-center'>
                        <button onClick={handleEdit} className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md'>Edit</button>
                        <button onClick={()=>{handleView(6)} } className='px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md'>View</button>
                    </div>
                    : ''
                }
            </td>
        </tr>
    )
}

export default SearchRow
