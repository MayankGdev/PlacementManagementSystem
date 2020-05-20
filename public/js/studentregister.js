$().ready(function () {

    $("#studregistration").validate({
        rules: {
            Rollno:{
                required:true  
            },
            name:{
                required:true,
                minlength:3,
                maxlength:20
            },
            email: {
                required: true,
                email: true
            },
            Phone:{
                required:true,
                minlength:10,
                maxlength:10
            },
            Course:{
                required:true,
                minlength:2,
                maxlength:15
            },
            Semester:{
                required:true,
                minlength:1,
                maxlength:1
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 32,
            }
        },
        messages: {
            Rollno:{
                required:"Roll no can't be empty"
            },
            name:{
                required:"Name cant be Empty",
                minlength:"Name must be 3 or more character",
                maxlength:"Name must be lessthan 20 character"
            },

            email: {
                required: "Email can't be empty",
                email: "Invalid email format"
            },
            Phone:{
                required:"Phone no can't be empty",
                minlength:"Phone must be 10 character",
                maxlength:"Phone must be 10 character"
            },
            Course:{
                required:"Course can't be empty",
                minlength:"Course must be 2 or more character",
                maxlength:"Course must be lessthan 16 character"
            },
            Semester:{
                required:"semseter can't be empty",
                minlength:"Semester must be of 1 character",
                maxlength:"Semester must be of 1 character"
            },
            password: {
                required: "Password can not be empty",
                minlength: "Password must be 6 or more character",
                maxlength: "password must be lessthan 33 character",
            }
        }
    });
});