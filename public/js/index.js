

function almanacEnter() {
    if (window.event.keyCode == 13) {
        almanacClick()
    }
}

function calendarEnter() {
    if (window.event.keyCode == 13) {
        calendarClick()
    }
}

function calendarClick() {
    var year = document.getElementById("yearInput").value
    if (year < 1281 || year > 1654){
        alert("This year is not supported by the site.")
    } else {
        const req = {
            newYear: year
        }
        fetch('/calendar', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req)
        }).then(function(res){
            window.location.href = res.url;
            return res;
        })
    }
}

function almanacClick() {
    var year = document.getElementById("yearInput").value
    if (year < 1281 || year > 1654){
        alert("This year is not supported by the site.")
    } else {
        const req = {
            newYear: year
        }
        fetch('/almanac', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req)
        }).then(function(res){
            window.location.href = res.url;
            return res;
        })
    }
}