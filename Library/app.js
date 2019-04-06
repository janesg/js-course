function Person(fName, lName) {
    this.firstName = fName;
    this.lastName = lName;
}

Person.prototype.greetings = function() {
    console.log("Hi there, " + this.firstName + " " + this.lastName);
}

new Person('Enid', 'Flapwiddle').greetings();

// This is the relevant part of the library exercise
// ..............
$('#login').click(function() {
    var loginGreeter = G$('Bob', 'Bobbins');
    
    $('#login-div').hide();
    
    loginGreeter.setLanguage($('#lang').val()).htmlGreeting('#greeting', true).log();
});
