'use strict';

app.controller('UserCtrl', ['$scope', '$Api', 'SweetAlert', function($scope, $Api, SweetAlert) {

	$scope.btnText = "Add";

	$scope.submit = function () {
		if ( $scope.userData.name == '' || $scope.userData.userName == '' || $scope.userData.access == '' ) {
			
			SweetAlert.swal("Required fields missing", "Name, Username and Access type is required");
			return false;
		}

		if ( $scope.userData.id != '' && $scope.userData.index != undefined ) {

			var index = $scope.userData.index;
			$Api.updateUser($scope.userData).success(function(data) {
				if ( data.status == "OK" ) {
					$scope.userData = {};
					$scope.btnText = "Add";
					$scope.users[index] = data.data;
				} else {

				}
			}).error(function(data) {
				console.log("error",data);
			});

		} else {
			if ( $scope.userData.password == '' ) {
				
				SweetAlert.swal("Password is required", "Password is required for new user");
				return;
			}
			if ( $scope.userData.password.length < 5 ) {
				
				SweetAlert.swal("Too short password ", "Password must be atleast 5 characters long");
				return;
			}
			$Api.addUser($scope.userData).success(function(data) {
				if ( data.status == "OK" ) {
					$scope.userData = {};
					bringData();
				} else {

				}
			}).error(function(data) {
				console.log("error",data);
			});
		}
	}

	$scope.clear = function () {
		$scope.userData = {};
		$scope.btnText = "Add";
	}

	$scope.delete = function ( id ) {
		SweetAlert.swal({
			title: "Are you sure?",
			text: "Are you sure you want to delete this user?",
			type: "warning",
			showCancelButton: true
		}, function(isConfirm){ 
			if (isConfirm) {
				$Api.deleteUser(id).success(function(data) {
					// console.log("success",data);
					bringData();
				}).error(function(data) {
					console.log("error",data);
				});
			} 
		});
		$scope.clear();

	}

	$scope.update = function (user) {
		
		var index = $scope.users.indexOf(user);

		$scope.userData = {
			id: user._id,
			name: user.name,
			userName: user.userName,
			access: user.access,
			index: index
		};
		$scope.btnText = "Update";
	}

	$scope.users = [];

	var bringData = function () {
		$Api.getUsers().success(function(data) {
			// console.log("success",data);
			$scope.users = data.data;
		}).error(function(data) {
			console.log("error",data);
		});
	}

	bringData();

	$scope.getUnit = function ( unit ) {
		var unitVal = null;
		switch (unit) {
			case "all":
				unitVal = "All";
				break;
			case "shaheen":
				unitVal = "Shaheen";
				break;
			case "scouts":
				unitVal = "Scouts";
				break;
			case "rovers":
				unitVal = "Rovers";
				break;

		}
		return unitVal;
	}
}]);