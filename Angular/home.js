
(function(){
     var app = angular.module('myApp', []);

     // --  Javascript code to limit all date fields to date today and below -- //
     var today = new Date();
     var dd = today.getDate();
     var mm = today.getMonth() + 1;
     var yyyy = today.getFullYear();
     if(dd<10){
          dd='0'+dd
     } 
     if(mm<10){
          mm='0'+mm
     } 
     var maxDate = yyyy + '-' + mm + '-' + dd;



     app.directive("sideNavigation", function(){
          return {
               retrict: 'E',
               templateUrl: "AllHtml/rg-sidenavigation.html",
               controller: function ($scope, $http){
                    var userInfo = this;

                    $http({
                         method: "GET",
                         url: "userInfo.php"
                    }).then(function mySuccess(response) {
                         console.log(response.data);
                         if(response.data.errorCtr == 0){
                              userInfo.fullName =  response.data.fullName;
                              userInfo.regionName = response.data.regionName;
                         }
                         else{
                              alert("You are not allowed to access this system.");
                              window.location = "login.php";
                         }
                    }, function myError(response) {
                         console.log(response.status);
                    });

                    this.logOut = function () {

                         $http({
                              method: "GET",
                              url: "logOut.php"
                         }).then(function mySuccess(response) {
                              window.location = "login.php";
                         }, function myError(response) {
                              console.log(response.status);
                         });

                    };
               },
               controllerAs: "userInfo"
          }
     });

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

     app.directive("geoAccomplishment", function(){
          return {
               retrict: 'E',
               templateUrl: "HomeHtml/rg-geoAccomplishment.html"
          }
     });

     app.controller('geoCtrl', function ($scope, $http) {
          //-- initialization of variables to be used -- // 
          var geo = this;
          this.responseMessage = "test";
          this.dateCtr = 0;
          this.startDate = null;
          this.endDate = null;
          this.maxDate = maxDate;
          this.dateErrorMessage = "";
          this.errorMessage = "";
          this.completeMessage = "";
          var pStartDate = "";
          var pEndDate = "";
          var dateErrorCtr = 0;
          this.downloadingCtr = 0;

          //-- data goes here when submit is clicked in GEO Accomplishment--//
          this.geoSubmit = function () {
               this.completeMessage = "";
               
               if(this.dateCtr == 1){
                    if(this.startDate == null || this.endDate == null){
                         this.dateErrorMessage = "Please fill up start and end dates";
                         
                    }
                    else if(this.startDate > this.endDate){
                         this.dateErrorMessage = "Start date must be less than or equal to end date";
                    }
                    else{
                         this.dateErrorMessage = "";
                         this.downloadingCtr = 1;
                         // -- manipulate javascript returned date bug  (Adding 1 day to correct the date) -- //
                         pStartDate = new Date( this.startDate.getTime() + Math.abs(this.startDate.getTimezoneOffset()*60000) );
                         pEndDate = new Date( this.endDate.getTime() + Math.abs(this.endDate.getTimezoneOffset()*60000) );

                         // -- start of http service -- //
                         this.responseMessage = $http({
                              method: "POST",
                              url: "geoAccomplishment.php",
                              data: {
                                   "dateCtr" : this.dateCtr,
                                   "startDate": pStartDate,
                                   "endDate": pEndDate
                              },
                              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                         }).then(function mySuccess(response) {
                              console.log(response);
                              if(response.data.numRows > 0){
                                   // -- adding a element for downloading csv file --//
                                   var saving = document.createElement('a');

                                   // -- csv function is converting the object data to string as encodeURICompenent only accepts string --//
                                   saving.href = 'CSV/' + response.data.regionName +'.csv';

                                   // -- filename -- //
                                   if(geo.dateCtr == 0){
                                        saving.download = response.data.regionName + '_geoAccomplishment.csv';
                                   }
                                   else{
                                        saving.download = response.data.regionName + '_geoAccomplishment_' + response.data.date[0] + '_' + response.data.date[1] + '.csv';
                                   } 
                                   // -- forcing the download -- //
                                   saving.click();
                                   geo.errorMessage = "";
                                  
                                   geo.completeMessage = "Download Complete!";
                              }
                              else{
                                   geo.errorMessage = "No Results Found!";
                                  
                              }
                              geo.downloadingCtr = 0;
                         }, function myError(response) {
                              console.log(response.status);
                         });
                    }  
               }
               else{
                    this.downloadingCtr = 1;
                    // -- start of http service -- //
                    this.responseMessage = $http({
                         method: "POST",
                         url: "geoAccomplishment.php",
                         data: {
                              "dateCtr" : this.dateCtr,
                              "startDate": pStartDate,
                              "endDate": pEndDate
                         },
                         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).then(function mySuccess(response) {
                         console.log(response);
                         if(response.data.numRows > 0){
                              // -- adding a element for downloading csv file --//
                              var saving = document.createElement('a');

                              // -- csv function is converting the object data to string as encodeURICompenent only accepts string --//
                              saving.href = 'CSV/' + response.data.regionName +'.csv';

                              // -- filename -- //
                              if(geo.dateCtr == 0){
                                   saving.download = response.data.regionName + '_geoAccomplishment.csv';
                              }
                              else{
                                   saving.download = response.data.regionName + '_geoAccomplishment_' + response.data.date[0] + '_' + response.data.date[1] + '.csv';
                              } 
                              // -- forcing the download -- //
                              saving.click();
                              geo.errorMessage = "";
                              
                              geo.completeMessage = "Download Complete!";
                         }
                         else{
                              geo.errorMessage = "No Results Found!";
                              
                         }
                         geo.downloadingCtr = 0;

                    }, function myError(response) {
                         console.log(response.status);
                    });
               }
          };
          

     });

     app.directive("staffAccomplishment", function(){
          return {
               retrict: 'E',
               templateUrl: "HomeHtml/rg-staffAccomplishment.html"
          }
     });

     app.controller('staffCtrl', function ($scope, $http) {
          //-- initialization of variables to be used -- // 
          var staff = this;
          var pStartDate = "";
          var pEndDate = "";
          var sDateNFormat = ""; // start date formatted
          var eDateNFormat = ""; // end date formatted

          this.responseMessage = "test";
          this.dateCtr = 0;
          this.staffCtr = 0;
          this.startDate = null;
          this.endDate = null;
          this.errorMessage = "";
          this.dateErrorMessage = "";
          this.completeMessage = "";
          this.downloadingCtr = 0;

          this.maxDate = maxDate;

          //-- data goes here when submit is clicked in GEO Accomplishment--//
          this.staffSubmit = function () {
               this.completeMessage = "";
               
               if(this.dateCtr == 1){
                    if(this.startDate == null || this.endDate == null){
                         this.dateErrorMessage = "Please fill up start and end dates";
                    }
                    else if(this.startDate > this.endDate){
                         this.dateErrorMessage = "Start date must be less than or equal to end date";
                    }
                    else{
                         this.dateErrorMessage = "";
                         this.downloadingCtr = 1;

                         // -- manipulate javascript returned date bug  (Adding 1 day to correct the date) -- //
                         pStartDate = new Date( this.startDate.getTime() + Math.abs(this.startDate.getTimezoneOffset()*60000) );
                         pEndDate = new Date( this.endDate.getTime() + Math.abs(this.endDate.getTimezoneOffset()*60000) );

                         // -- start of http service -- //
                         this.responseMessage = $http({
                              method: "POST",
                              url: "staffAccomplishment.php",
                              data: {
                                   "staffCtr" : this.staffCtr,
                                   "dateCtr" : this.dateCtr,
                                   "startDate": pStartDate,
                                   "endDate": pEndDate
                              },
                              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                         }).then(function mySuccess(response) {
                              
                              console.log(response.data);
                              if(response.data.numRows > 0){
                                   // -- adding a element for downloading csv file --//
                                   var saving = document.createElement('a');

                                   // -- adding the outputted csv file from backend --//
                                   saving.href = 'CSV/' + response.data.regionName +'.csv';

                                   // -- filename -- //
                                   if(staff.dateCtr == 0){
                                        saving.download = response.data.regionName + '_' + response.data.staffName + 'Accomplishment.csv';
                                   }
                                   else{
                                        saving.download = response.data.regionName + '_' + response.data.staffName + 'Accomplishment_' + response.data.date[0] + '_' + response.data.date[1] + '.csv';
                                   } 

                                   // -- forcing the download -- //
                                   saving.click();

                                   staff.completeMessage = "Download Complete!";
                                   staff.errorMessage = "";
                              }
                              else{
                                   staff.errorMessage = "No Results Found!";
                              }
                              staff.downloadingCtr = 0;

                         }, function myError(response) {
                              console.log(response.status);
                         });
                    }
               }
               else{
                    this.downloadingCtr = 1;
                    // -- start of http service -- //
                    this.responseMessage = $http({
                         method: "POST",
                         url: "staffAccomplishment.php",
                         data: {
                              "staffCtr" : this.staffCtr,
                              "dateCtr" : this.dateCtr,
                              "startDate": pStartDate,
                              "endDate": pEndDate
                         },
                         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    }).then(function mySuccess(response) {
                         
                         console.log(response.data);
                         if(response.data.numRows > 0){
                              // -- adding a element for downloading csv file --//
                              var saving = document.createElement('a');

                              // -- adding the outputted csv file from backend --//
                              saving.href = 'CSV/' + response.data.regionName +'.csv';

                              // -- filename -- //
                              if(staff.dateCtr == 0){
                                   saving.download = response.data.regionName + '_' + response.data.staffName + 'Accomplishment.csv';
                              }
                              else{
                                   saving.download = response.data.regionName + '_' + response.data.staffName + 'Accomplishment_' + response.data.date[0] + '_' + response.data.date[1] + '.csv';
                              } 

                              // -- forcing the download -- //
                              saving.click();

                              staff.errorMessage = "";
                              staff.completeMessage = "Download Complete!";
                         }
                         else{
                              staff.errorMessage = "No Results Found!";
                         }
                         staff.downloadingCtr = 0;

                    }, function myError(response) {
                         console.log(response.status);
                    });
               }

          };

     });


})();
