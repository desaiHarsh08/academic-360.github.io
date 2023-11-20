let count = 0;
let tmpArr = [];
let mymarksheetArr = [];
for (let i = 0; i < data.length; i++) {
  const student = data[i];
  count += 1;
  console.log(count)
  for (let j = 0; j < student.subjects.length; j++) {

    // eslint-disable-next-line
    const sgpa = isNaN(Number(student.sgpa)) ? 0 : (Number(student.sgpa) == 0 ? 0 : Number(student.sgpa).toFixed(2))
    console.log(sgpa, student.rollNo)

    let obj = {
      uniqueIdentifier: student.registrationNo + student.subjects[j].subjectName,
      "Registration No.": student.registrationNo,
      Stream: student.stream,
      Course: student.course,
      Semester: student.semester,
      Name: student.name,
      SGPA: sgpa,
      Remarks: student.remarks,
      Subject: student.subjects[j].subjectName,
      Year1: student.subjects[j].year1,
      "Full Marks": student.subjects[j].fullMarks,
      Year2: student.subjects[j].year2,
      "Practical Marks": student.subjects[j].practicalMarks,
      NGP: student.subjects[j].ngp,
      Credit: student.subjects[j].credit,
      TGP: student.subjects[j].tgp,
      "Internal Marks": student.subjects[j].internalMarks,
      "Theory Marks": student.subjects[j].theoryMarks,
      Total: student.subjects[j].total,
      Status: student.status,
      "Roll No.": student.rollNo,
    };

    const isDuplicate = mymarksheetArr.some((item) => item.uniqueIdentifier === obj.uniqueIdentifier);
    console.log('in loop, ', marksheetArr, isDuplicate, obj)
    if (!isDuplicate) {
      mymarksheetArr.push(obj);
      console.log(marksheetArr)
      tmpArr.push(
        <div className='my_tr w-full flex border ' >
          <div className='border-r-2 font-medium  py-3 flex justify-center items-center w-[500px]'>
            <span>{student.registrationNo}</span>
          </div>
          <div className='border-r-2 font-medium  py-3 flex justify-center items-center w-[500px]'>
            <span>{student.stream}</span>
          </div>
          <div className='border-r-2 font-medium  py-3 flex justify-center items-center w-[500px]'>
            <span>{student.course}</span>
          </div>
          <div className='border-r-2 font-medium  py-3 flex justify-center items-center w-[500px]'>
            <span>{student.semester}</span>
          </div>
          <div className='border-r-2 font-medium  py-3 flex justify-center items-center w-[500px]'>
            <span>{student.name}</span>
          </div>
          <div className='border-r-2 font-medium  py-3 flex justify-center items-center w-[500px]'>
            {/* eslint-disable-next-line */}
            <span>{isNaN(Number(student.sgpa)) ? 0 : (Number(student.sgpa) == 0 ? 0 : Number(student.sgpa).toFixed(2))}</span>
          </div>
          <div className='border-r-2 font-medium  py-3 flex justify-center items-center w-[500px]'>
            <span>{student.remarks}</span>
          </div>
          <div className='border-r-2 font-medium  py-3 flex justify-center items-center w-[500px]'>
            <span>{student.subjects[j].fullMarks}</span>
          </div>
          <div className='border-r-2 font-medium  py-3 flex justify-center items-center w-[500px]'>
            <span>{student.subjects[j].year1}</span>
          </div>
          <div className='border-r-2 font-medium  py-3 flex justify-center items-center w-[500px]'>
            <span>{student.subjects[j].practicalMarks}</span>
          </div>
          <div className='border-r-2 font-medium  py-3 flex justify-center items-center w-[500px]'>
            <span>{student.subjects[j].ngp}</span>
          </div>
          <div className='border-r-2 font-medium  py-3 flex justify-center items-center w-[500px]'>
            <span>{student.subjects[j].credit}</span>
          </div>
          <div className='border-r-2 font-medium  py-3 flex justify-center items-center w-[500px]'>
            <span>{student.subjects[j].tgp}</span>
          </div>
          <div className='border-r-2 font-medium  py-3 flex justify-center items-center w-[500px]'>
            <span>{student.subjects[j].subjectName}</span>
          </div>
          <div className='border-r-2 font-medium  py-3 flex justify-center items-center w-[500px]'>
            <span>{student.subjects[j].internalMarks}</span>
          </div>
          <div className='border-r-2 font-medium  py-3 flex justify-center items-center w-[500px]'>
            <span>{student.subjects[j].theoryMarks}</span>
          </div>
          <div className='border-r-2 font-medium  py-3 flex justify-center items-center w-[500px]'>
            <span>{student.subjects[j].total}</span>
          </div>
          <div className='border-r-2 font-medium py-3 flex justify-center items-center w-[500px]'>
            <span>{student.status.toUpperCase()}</span>
          </div>
          <div className='border-r-2 font-medium  py-3 flex justify-center items-center w-[500px]'>
            <span>{student.subjects[j].letterGrade}</span>
          </div>
          <div className='border-r-2 font-medium  py-3 flex justify-center items-center w-[500px]'>
            <span>{student.rollNo}</span>
          </div>
        </div>
      );
    }
    else {
      continue;
    }



  }


}