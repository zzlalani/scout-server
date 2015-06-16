'use strict';

app.controller('ScoutCtrl', ['$scope', '$Api', 'SweetAlert', function($scope, $Api, SweetAlert) {

	$scope.btnText = "Add";

	$scope.submit = function () {
		if ( $scope.scoutData.firstName == '' || $scope.scoutData.lastName == '' ) {
			return false;
		}
		
		if ( $scope.scoutData.id != '' && $scope.scoutData.index != undefined ) {

			var index = $scope.scoutData.index;
			$Api.updateScout($scope.scoutData).success(function(data) {
				if ( data.status == "OK" ) {
					$scope.scoutData = {};
					$scope.btnText = "Add";
					$scope.scouts[index] = data.data;
				} else {

				}
			}).error(function(data) {
				console.log("error",data);
			});

		} else {
			$Api.addScout($scope.scoutData).success(function(data) {
				if ( data.status == "OK" ) {
					$scope.scoutData = {};
					bringData();
				} else {

				}
			}).error(function(data) {
				console.log("error",data);
			});
		}
	}

	$scope.clear = function () {
		$scope.scoutData = {};
		$scope.btnText = "Add";
	}

	$scope.delete = function ( id ) {
		SweetAlert.swal({
			title: "Are you sure?",
			text: "Are you sure you want to delete this scout?",
			type: "warning",
			showCancelButton: true
		}, function(isConfirm){ 
			if (isConfirm) {
				$Api.deleteScout(id).success(function(data) {
					// console.log("success",data);
					bringData();
				}).error(function(data) {
					console.log("error",data);
				});
			} 
		});
		$scope.clear();

	}

	$scope.update = function (scout) {
		
		var index = $scope.scouts.indexOf(scout);

		$scope.scoutData = {
			id: scout._id,
			firstName: scout.firstName,
			lastName: scout.lastName,
			index: index
		};
		$scope.btnText = "Update";
	}

	$scope.scouts = [];

	var bringData = function () {
		$Api.getScouts().success(function(data) {
			// console.log("success",data);
			$scope.scouts = data.data;
		}).error(function(data) {
			console.log("error",data);
		});
	}

	bringData();
}]);