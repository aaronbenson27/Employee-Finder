const userInput = function () {
    let userSurvey = [];
    for (i = 1; i <= 10; i++) {
        if ($(`#question${i}`).val() !== null && $('#name').val() !== '' && $('#image').val() !== '') {
            userSurvey.push($(`#question${i}`).val())
            if (userSurvey.length === 10) {
                $.ajax({
                    url: "api/employees",
                    method: "GET"
                }).then(function (data) {
                    compareSurvey(data, userSurvey)
                })
            }
        }
        else {
            $('#alertBlock').empty();
            $('#alertBlock').append(`<div id="error" class="alert alert-danger">Please fill out all fields before submitting!</div>`)
            $(`.form-control`).val('');
            break;
        }
    }
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
    let index = 0
    for (i = 1; i < surveyDifference.length; i++) {
        if (surveyDifference[i] < surveyDifference[index]) {
            index = i;
        }
    }
    renderMatch(data, index);
    pushSurvey(userSurvey);
}

const renderMatch = function (data, index) {
    $('.modal-body').html(`<p>${data[index].name}</p><p><img id = "finalImage" src = ${data[index].photo}></p>`)
    $('#myModal').modal('show')
}

const pushSurvey = function (userSurvey) {
    const nameVal = $('#name').val();
    const imageVal = $('#image').val()
    $.ajax({
        url: "/api/employees",
        method: "POST",
        data: {
            "name": nameVal,
            "photo": imageVal,
            "scores": userSurvey
        }
    }).then(function (data) {
        $(`.form-control`).val('');
    })
}


$("#submit").on("click", userInput);
