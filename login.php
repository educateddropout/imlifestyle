<!DOCTYPE html>
<html>
	<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="AddOns/css/w3css/4/w3.css">
        <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat"> -->
        <link rel="stylesheet" href="AddOns/css/font-awesome-4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="AddOns/css/myStyleLogin.css">
        <script src="AddOns/js/angular.min.js"></script>
        <script type="text/javascript" src="Angular/login.js"></script>
        <title>Report Generator Home</title>
    </head>
    <body ng-app="login">
        <div id = "container">
            <div id="header">
                <rg-header></rg-header>
            </div>
            <div class="w3-container" id="body">
                <login-body></login-body>
                <br>
                <br>
            </div> 
            <div id="footer">
                <rg-footer></rg-footer>
            </div>
        </div>
    </body>
</html>
