describe('LoginController', function() {

    var controller, 
        loginServiceMock,
        stateMock,
        ionicPopupMock;

    beforeEach(module('app'));  

    describe('#doLogin', function() {

        // TODO: Call doLogin on the Controller

        it('should call login on dinnerService', function() {
            expect(loginServiceMock.login).toHaveBeenCalledWith('sea6@aber.ac.uk', 'b261la'); 
        });

        describe('when the login action is performed,', function() {
            it('if successful, should change state to home', function() {

                // TODO: Mock the login response from DinnerService

                expect(stateMock.go).toHaveBeenCalledWith('app.home');
            });

            it('if unsuccessful, should show a popup', function() {

                // TODO: Mock the login response from DinnerService

                expect(ionicPopupMock.alert).toHaveBeenCalled();
            });
        });
    })
});
