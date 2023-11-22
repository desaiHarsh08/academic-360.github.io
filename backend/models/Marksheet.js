import mongoose from 'mongoose';
const { Schema } = mongoose;

const MarksheetSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
    
  },
  year: {
    type: Number
  },
  rollNo: {
    type: String,
    
  },
  registrationNo: {
    type: String,
    
  },
  stream: {
    type: String,
    
  },
  course: {
    type: String,
    
  },
  semester: {
    type: Number,
    
  },
  sgpa: {
    type: Number,
    
  },
  remarks: {
    type: String,
    
  },
  classification: {
    type: String,
    
  },
  cgpa: {
    type: Number,
    
  },
  status: {
    type: String,
    
  },
  totalCredit: {
    type: Number,
    
  },
  subjects: {
    type: Array,
    
  },
  totalMarksObtained: {
    type: Number
  },
  fullMarksSum: {
    type: Number
  },
  UID: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  }
});

const StudentMarksheet = mongoose.model('marksheet', MarksheetSchema);

export default StudentMarksheet;