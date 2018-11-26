var config = {
  apiKey: "AIzaSyAjeNM7DF7NWT3drxlZ8KYMf6B5bn9Jeo0",
  authDomain: "train-schedule-8ddd4.firebaseapp.com",
  databaseURL: "https://train-schedule-8ddd4.firebaseio.com",
  projectId: "train-schedule-8ddd4",
  storageBucket: "",
  messagingSenderId: "215011023664"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;

$("#submitButton").on("click", function (event) {
  event.preventDefault();
  trainName = $("#inputTrainName").val().trim();
  destination = $("#inputDestination").val().trim();
  firstTrainTime = $("#inputFirstTrainTime").val().trim();
  frequency = $("#inputFrequency").val().trim();

  

  database.ref().push({
    Name_Of_Train: trainName,
    Destination: destination,
    First_Arrival: firstTrainTime,
    Frequency_Of_Arrival: frequency
  });

  $("#inputTrainName").val("");
  $("#inputDestination").val("");
  $("#inputFirstTrainTime").val("");
  $("#inputFrequency").val("");

});

database.ref().on("child_added", function (snapshot) {

  var snap = snapshot.val();
  var newRow = $("<tr>");
  var trainFirstArrival = moment(snap.First_Arrival, "hh:mm");
  var currentTime = moment().format("hh:mm");
  var differenceInTime = (moment().diff(moment(trainFirstArrival), "minutes"));
  var differenceRemainder = differenceInTime % snap.Frequency_Of_Arrival;
  var minutesUntilTrain = snap.Frequency_Of_Arrival - differenceRemainder;
  var nextTrain = moment().add(minutesUntilTrain, "minutes");
  var nextTrainText = moment(nextTrain).format("hh:mm");


  console.log("=================================");
  console.log(snap.Name_Of_Train);
  console.log("CURRENT TIME: " + currentTime);
  console.log("trainFirstArrival: " + trainFirstArrival.format("hh:mm"));
  console.log("differenceInTime " + differenceInTime);
  console.log("snap.freq of arrival: " + snap.Frequency_Of_Arrival);
  console.log("minutes until the train: " + minutesUntilTrain);
  console.log("next train: " + nextTrain);
  console.log("next train: " + nextTrainText);
  

  newRow.append(
    $("<td>").text(snap.Name_Of_Train),
    $("<td>").text(snap.Destination),
    $("<td>").text(snap.Frequency_Of_Arrival),
    $("<td>").text(nextTrainText),
    $("<td>").text(minutesUntilTrain)

  );

  $("tbody").append(newRow);
});