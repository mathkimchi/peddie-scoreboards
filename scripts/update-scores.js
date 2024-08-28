function updateEventList(events) {
    for (let i = 0; i < events.length; i++) {
        // "event" is a keyword or st in js
        eventObject = events[i];

        // prepare elements
        const newEventName = document.createElement("p2");
        const newEventTime = document.createElement("p2");
        const newEventLocation = document.createElement("p2");
        const newEventState = document.createElement("p2");

        newEventName.classList.add("event-name");
        newEventTime.classList.add("event-time");
        newEventLocation.classList.add("event-location");
        newEventState.classList.add("event-state");

        // set the data
        newEventName.innerText = eventObject["display-name"];
        newEventTime.innerText = eventObject["time"];
        newEventLocation.innerText = eventObject["location"];
        newEventState.innerText = eventObject["state"];

        // add the elements to event list
        // NOTE: order of the following lines matters
        document.getElementById("event-list").appendChild(newEventName);
        document.getElementById("event-list").appendChild(newEventLocation);
        document.getElementById("event-list").appendChild(newEventTime);
        document.getElementById("event-list").appendChild(newEventState);
    }
}

function updateOverallScores(events) {
    var blueScore = 0;
    var goldScore = 0;

    // count points
    for (let i = 0; i < events.length; i++) {
        // "event" is a keyword in js or st
        eventObject = events[i];

        // possible states are:
        // `blue` or `gold` - game ended, the name of the winning team
        // `tie` - game ended in a tie 
        // `ongoing` - currently happening 
        // `scheduled` - hasn't started yet 
        if (eventObject["state"] == "blue") {
            blueScore += 1;
        } else if (eventObject["state"] == "gold") {
            goldScore += 1;
        }
    }

    document.getElementById("blue-score").innerText = blueScore;
    document.getElementById("gold-score").innerText = goldScore;
}

function update() {
    fetch("../blue-and-gold-games/data/events.json").then(response => {
        if (!response.ok) {
            throw new Error("Bad Response")
        }
        return response.text()
    }).then(eventsString => {
        console.log(eventsString);

        events = JSON.parse(eventsString);

        updateEventList(events);
        updateOverallScores(events);
    })
        .catch(error => {
            console.error(error);
            // document.getElementById("portfolio-code3").innerText = "Unable to fetch portfolio, try again later"
        });
}

update();
