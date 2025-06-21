const mongoose = require('mongoose');
require('dotenv').config();

async function testDatabase() {
    try {
        console.log('🔧 Testing MongoDB Connection...');
        console.log('Connection String:', process.env.MONGODB_URI.replace(/:[^:]*@/, ':****@'));
        
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected Successfully!');
        
        // Test creating a simple document
        const TestSchema = new mongoose.Schema({
            message: String,
            timestamp: { type: Date, default: Date.now }
        });
        
        const Test = mongoose.model('Test', TestSchema);
        
        const testDoc = new Test({ message: 'NexusApp Database Test' });
        await testDoc.save();
        console.log('✅ Test document created successfully!');
        
        // Fetch the document
        const foundDoc = await Test.findOne({ message: 'NexusApp Database Test' });
        console.log('✅ Test document retrieved:', foundDoc.message);
        
        // Clean up
        await Test.deleteOne({ _id: testDoc._id });
        console.log('✅ Test document cleaned up');
        
        console.log('🎉 Database is working perfectly!');
        
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Database connection closed');
    }
}

testDatabase();