$(document).ready(function(){
    $('#usernamevalidation').hide();
    $('#emailvalidation').hide();
    $('#passwordvalidation').hide();
    $('#confirmpasswordvalidation').hide();

    var Error=true;
    var emailError=true;
    var password_error=true;
    var confirm_password_error=true;

    $('#username').keyup(function(){
        username_validation();
    });

    function username_validation(){
        var username_val=$('#username').val();
        if(username_val.length==""){
            $('#usernamevalidation').show();
            $('#usernamevalidation').html('Username cannot be empty');
            $('#usernamevalidation').css('color','red');
            Error=false;
            return false;

        }
        else{
            $('#usernamevalidation').hide();

        } 

        if(username_val.length<3||username_val.length>10){
            $('#usernamevalidation').show();
            $('#usernamevalidation').html('Invalid Username');
            $('#usernamevalidation').css('color','red');
            Error=false;
            return false;

        }
        else{
            $('#usernamevalidation').hide();

        } 
       
    }

    $('#email').keyup(function(){
        email_validation();
    });
   function email_validation(){
        var emailregex =  /^([\-\.0-9a-zA-Z]+)@([\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
        var email_val = $('#email').val();
        if (emailregex.test(email_val)){
            $('#emailvalidation').hide();
        }
        else{
            
            $('#emailvalidation').show();
            $('#emailvalidation').html('Email must be of format "xyz@lmn.ab" ');
            $('#emailvalidation').css('color','red');
            emailError=false;
            return false;


        }
        
    }

 

    

    $('#password').keyup(function(){
        password_validation();
    });

    function password_validation(){
        var password_val=$('#password').val();
        if(password_val.length==""){
            $('#passwordvalidation').show();
            $('#passwordvalidation').html('Password cannot be empty');
            $('#passwordvalidation').css('color','red');
            password_error=false;
            return false;
        }
        else{
            $('#passwordvalidation').hide();
        }

        if(password_val.length<=8){
            $('#passwordvalidation').show();
            $('#passwordvalidation').html('Password too short');
            $('#passwordvalidation').css('color','red');
            password_error=false;
            return false;
        }
        else{
            $('#passwordvalidation').hide();
        }
    }

        $('#confirmpassword').keyup(function(){
            confirm_password();

        });

        function confirm_password(){
            var confirm_password_val=$('#confirmpassword').val();
            var password_val=$('#password').val();
            if(password_val!=confirm_password_val){
                $('#confirmpasswordvalidation').show();
            $('#confirmpasswordvalidation').html('Passwords do not match');
            $('#confirmpasswordvalidation').css('color','red');
            confirm_password_error=false;
            return false;

            }
            else{
                $('#confirmpasswordvalidation').hide();

            }
        }

    
});