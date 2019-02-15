const userInput = function () {
    let userSurvey = [];
    for (i = 1; i <= 11; i++) {
        if ($(`#question${i}`).val() !== undefined && $('#name').val() !== '' && $('#image').val() !== '') {
            userSurvey.push($(`#question${i}`).val())
        }
        else {
            $('.modal-body').text(`Please answer all questions.`)
        }
    }
    $.ajax({
        url: "api/employees",
        method: "GET"
    }).then(function (data) {
        compareSurvey(data, userSurvey)
        console.log(userSurvey)
    })
}

const compareSurvey = function (data, userSurvey) {
    let surveyDifference = [];
    for (i = 0; i < data.length; i++) {
        let difference = 0
        for (j = 0; j < data[i].scores.length; j++) {
            difference += Math.abs(data[i].scores[j] - userSurvey[j])
            
        }
        surveyDifference.push(difference)
    }

    console.log(surveyDifference)
    console.log(surveyDifference.indexOf(Math.min(surveyDifference)))
    renderMatch(data, surveyDifference);
    pushSurvey(userSurvey);
}

const renderMatch = function (data, surveyDifference) {

}

const pushSurvey = function (userSurvey) {
    const nameVal = $('#name').val();
    const imageVal = $('#image').val()
    $.ajax({
        url: "/api/employees",
        method: "POST",
        data: {
            name: nameVal,
            photo: imageVal,
            scores: userSurvey
        },
        datatype: JSON
    }).then(function(data) {
        console.log(data)
    })
}


$("#submit").on("click", userInput);
