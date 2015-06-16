app.service('$Api', ['$http', '$q', 'ServiceUrl', function($http, $q, ServiceUrl) {

	function Api () {

		this.login = function (data) {
			
			var deferred = $q.defer();
			var promise = deferred.promise;

			$http.post(ServiceUrl + 'login', data)
			.success(function(data, status, headers, config) {
				deferred.resolve({
					status: data.status,
					user: data.user
				});
			})
			.error(function(data, status, headers, config) {
				deferred.reject({
					status: 'FAIL'
				});
			});

			promise.success = function(fn) {
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn) {
				promise.then(null, fn);
				return promise;
			}
			return promise;
		}

		this.addScout = function (data) {
			
			var deferred = $q.defer();
			var promise = deferred.promise;

			$http.post(ServiceUrl + 'scout/add', data)
			.success(function(data, status, headers, config) {
				deferred.resolve({
					status: data.status
				});
			})
			.error(function(data, status, headers, config) {
				deferred.reject({
					status: 'FAIL'
				});
			});

			promise.success = function(fn) {
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn) {
				promise.then(null, fn);
				return promise;
			}
			return promise;
		}

		this.updateScout = function (data) {
			
			var deferred = $q.defer();
			var promise = deferred.promise;
			var id = data.id;

			$http.post(ServiceUrl + 'scout/update/' + id, data)
			.success(function(data, status, headers, config) {
				deferred.resolve({
					status: data.status,
					data: data.data
				});
			})
			.error(function(data, status, headers, config) {
				deferred.reject({
					status: 'FAIL'
				});
			});

			promise.success = function(fn) {
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn) {
				promise.then(null, fn);
				return promise;
			}
			return promise;
		}

		this.getScouts = function () {
			var deferred = $q.defer();
			var promise = deferred.promise;

			$http.get(ServiceUrl + 'scouts/list')
			.success(function(data, status, headers, config) {
				deferred.resolve(data);
			})
			.error(function(data, status, headers, config) {
				deferred.reject({
					status: 'FAIL'
				});
			});

			promise.success = function(fn) {
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn) {
				promise.then(null, fn);
				return promise;
			}
			return promise;
		}

		this.deleteScout = function (id) {
			var deferred = $q.defer();
			var promise = deferred.promise;

			$http.get(ServiceUrl + 'scout/remove/'+id)
			.success(function(data, status, headers, config) {
				deferred.resolve(data);
			})
			.error(function(data, status, headers, config) {
				deferred.reject({
					status: 'FAIL'
				});
			});

			promise.success = function(fn) {
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn) {
				promise.then(null, fn);
				return promise;
			}
			return promise;
		}
	}

	return new Api();
}]);