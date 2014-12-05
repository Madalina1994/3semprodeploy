var mongoose = require( 'mongoose' );

var dbURI;

//This is set by the backend tests
if( typeof global.TEST_DATABASE != "undefined" ) {
  dbURI = global.TEST_DATABASE;
}
else{
  //dbURI = 'mongodb://test:test@ds053310.mongolab.com:53310/3semproject';
  dbURI = 'mongodb://test:test@ds055990.mongolab.com:55990/sempro';
  //dbURI = 'mongodb://localhost/testDB'
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  global.mongo_error = "Not Connected to the Database";
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

var TeacherSchema = new mongoose.Schema({
  username: String,
  fullName: String,
  degree: String,
  classId: [{type: mongoose.Schema.ObjectId, ref: 'classes'}]
});

var StudentSchema = new mongoose.Schema({
  username: String,
  fullName: String,
  classId: {type: mongoose.Schema.ObjectId, ref: 'classes'}
});

var ClassSchema = new mongoose.Schema({
  name: String,
  description: String,
  startTime: String,
  endTime: String
});

var SemesterSchema = new mongoose.Schema({
  name: String,
  requiredPoints: Number,
  startTime: String,
  endTime: String,
  classId: {type: mongoose.Schema.ObjectId, ref: 'classes'}
});

var PeriodSchema = new mongoose.Schema({
  name: String,
  description: String,
  maximumPoints: Number,
  startTime: String,
  endTime: String,
  semesterId: {type: mongoose.Schema.ObjectId, ref: 'semesters'}
});

var TaskSchema = new mongoose.Schema({
  name: String,
  description: String,
  maximumPoints: Number,
  startTime: String,
  endTime: String,
  periodId: {type: mongoose.Schema.ObjectId, ref: 'periods'}
});

var CompletedTaskSchema = new mongoose.Schema({
  receivedPoints: Number,
  comment: String,
  taskId: {type: mongoose.Schema.ObjectId, ref: 'tasks'},
  studentId: {type: mongoose.Schema.ObjectId, ref: 'students'}
});

exports.StudentModel = mongoose.model('Student', StudentSchema);
exports.TeacherModel = mongoose.model('Teacher', TeacherSchema);
exports.ClassModel = mongoose.model('Class', ClassSchema);
exports.SemesterModel = mongoose.model('Semester', SemesterSchema);
exports.PeriodModel = mongoose.model('Period', PeriodSchema);
exports.TaskModel = mongoose.model('Task', TaskSchema);
exports.CompletedTaskModel = mongoose.model('CompletedTask', CompletedTaskSchema);
