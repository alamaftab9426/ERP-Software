import mongoose from "mongoose";

const employeeLiveLocationSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company', 
        required: true,
        index: true
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee', 
        required: true,
        unique: true 
    },
    latitude: { 
        type: Number, 
        required: true 
    },
    longitude: { 
        type: Number, 
        required: true 
    },
   
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true } 
    },
    accuracy: { 
        type: Number, 
        default: 0 
    },
    isOnline: { 
        type: Boolean, 
        default: false,
        index: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });


employeeLiveLocationSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('EmployeeLiveLocation', employeeLiveLocationSchema);