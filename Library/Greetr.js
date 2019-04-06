(function(global, $) {
    
    // Prevent library user from having to use 'new' to create Greetr object
    var Greetr = function(fName, lName, lang) {
        return new Greetr.init(fName, lName, lang);
    };
    
    // These variables are not visible outside of the library
    // as they are hidden withoin the scope of the IIFE and 
    // never directly accessible.
    var supportedLangs = ['EN', 'ES'];
    
    var greetings = {
        EN: 'Hello',
        ES: 'Hola'
    };
    
    var formalGreetings = {
        EN: 'Greetings',
        ES: 'Saludos'
    };
    
    var logMessages = {
        EN: 'Logged in',
        ES: 'Incio sesion'
    }
    
    Greetr.init = function(fName, lName, lang) {
        var self = this;
        self.firstName = fName || '';
        self.lastName = lName || '';
        self.language = lang || 'EN';
        
        self.validate();
    };

    Greetr.prototype = {
        
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        },
        
        validate: function() {
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
        },
        
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + ' !';
        },
        
        formalGreeting: function() {
            return formalGreetings[this.language] + ', ' + this.fullName();
        },
        
        greet: function(formal) {
            var msg;
            
            // if undefined or null it will be coerced to false
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            
            if (console) {
                console.log(msg);
            }
            
            // 'this' refers to the calling object at execution runtime
            // and returning 'this' makes the method chainable
            return this;
        },
        
        log: function() {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            
            return this;
        },
        
        setLanguage: function(lang) {
            this.language = lang;
            
            this.validate();
            
            return this;
        },
        
        htmlGreeting: function(selector, formal) {
            if (!$) {
                throw 'jQuery not loaded';
            }
            
            if (!selector) {
                throw 'Missing jQuery selector';
            }
            
            var msg;
            
            // if undefined or null it will be coerced to false
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            $(selector).html(msg);
            
            return this;
        }
    };
    
    // Ensure all objects created by Greetr have the same prototype
    Greetr.init.prototype = Greetr.prototype;
    
    // Add library and alias to the global object
    // Library client code can use either.
    global.Greetr = global.G$ = Greetr;
        
}(window, jQuery));