(function(){
     var app = angular.module('login', []);

     app.directive("rgHeader", function(){
          return {
               retrict: 'E',
               templateUrl: "AllHtml/rg-header.html"
          }
     });

     app.directive("rgFooter", function(){
          return {
               retrict: 'E',
               templateUrl: "AllHtml/rg-footer.html"
          }
     });

     app.directive("loginBody", function(){
          return {
               retrict: 'E',
               templateUrl: "LoginHtml/rg-loginBody.html"
          }
     });

     app.controller('loginCtrl', function ($scope, $http) {
          
          var lg = this;
          this.errorMessage = "";

          this.loginClick = function(){
               
               this.responseMessage = $http({
                    method: "POST",
                    url: "loginVerify.php",
                    data: {
                         "username" : this.username,
                         "password" : this.password,
                    },
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

               }).then(function mySuccess(response) {
                    console.log(response.data);
                    if(response.data.errorCtr == 0){
                         window.location = "home.php";
                    }
                    else{
                         lg.errorMessage = response.data.errorMessage;     
                    }
               }, function myError(response) {
                    console.log(response.status);
               });
          };
     });

})();