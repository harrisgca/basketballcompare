'use strict';

// Players controller
angular.module('players').controller('PlayersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Players',
	function($scope, $stateParams, $location, Authentication, Players) {
		$scope.authentication = Authentication;

		// Create new Player
		$scope.create = function() {
			// Create new Player object
			var player = new Players ({
				firstName: this.firstName,
				lastName: this.lastName,
				seasons : []
			});

			/**For some reason Angular isn't allowing me to directly assign an object to the
			   seasons key. So I just initialize seasons as an empty array & push the seasons
			   object to it. I have to flatten the array by one level because of this, that's
			   what the concat method is doing.

			   this.seasonData is a stringified JSON object that I got from parsing CSV data
			   I then convert data back to JSON object and push data to seasons array
			**/
			player.seasons.push(JSON.parse(this.seasonData));
			player.seasons = [].concat.apply([],player.seasons);

			console.log(player);

			// Redirect after save
			player.$save(function(response) {
				$location.path('players/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

		};

		// Remove existing Player
		$scope.remove = function(player) {
			if (player) {
				player.$remove();

				for (var i in $scope.players) {
					if ($scope.players[i] === player) {
						$scope.players.splice(i, 1);
					}
				}
			} else {
				$scope.player.$remove(function() {
					$location.path('players');
				});
			}
		};

		// Update existing Player
		$scope.update = function() {
			var player = $scope.player;

			player.$update(function() {
				$location.path('players/' + player._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Players
		$scope.find = function() {
			$scope.players = Players.query();
		};

		// Find existing Player
		$scope.findOne = function() {
			$scope.player = Players.get({
				playerId: $stateParams.playerId
			});
		};
	}
]);