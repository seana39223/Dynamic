describe('LoginCtrl', function() {

    var controller, 
        loginMock,
        stateMock,
        ionicPopupMock;
    
    beforeEach(module('app'));

    beforeEach(module('#'));  

    describe('#doLogin', function() {


        it('Should Login using correct details', function() {
            expect(loginMock.doLogin).toHaveBeenCalledWith('sea6@aber.ac.uk', 'b261la'); 
        });

        describe('when the login action is performed,', function() {
            it('if successful, should change state to home', function() {
                expect(stateMock.go).toHaveBeenCalledWith('app.home');
            });

            it('if unsuccessful, should show a popup', function() {

                expect(ionicPopupMock.alert).toHaveBeenCalled();
            });
        });
    })

    describe('#register', function(){

        it('Should go to register screen', function(){
             expect(stateMock.go).toHaveBeenCalledWith('register');
        })
    })


});
