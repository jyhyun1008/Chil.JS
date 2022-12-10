

function almanacEnter() {
    if (window.event.keyCode == 13) {
        var year = document.getElementById("yearInput").value
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

function calendarEnter() {
    if (window.event.keyCode == 13) {
        var year = document.getElementById("yearInput").value
        console.log(year);
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

function calendarClick() {
    var year = document.getElementById("yearInput").value
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

function almanacClick() {
    var year = document.getElementById("yearInput").value
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