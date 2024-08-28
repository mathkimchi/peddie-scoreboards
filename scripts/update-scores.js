const blocksInOrder = ["Pep Rally", "Block 1", "Block 2", "Block 3"];

function activeBlockIndex() {
    // TODO
    // 0 means currently pep rally
    // 3 means currently block 3
    return 0;
}

function addEventToList(eventName, eventLocation, eventWorth, eventBlock, eventGenre) {
    const eventBlockIndex = blocksInOrder.indexOf(eventBlock);

    console.debug("Adding event with", eventName, eventLocation, eventWorth, eventBlock, eventGenre, eventBlockIndex);

    var eventList;
    if (eventBlockIndex < activeBlockIndex()) {
        // this event is over; don't display
        return;
    } else if (eventBlockIndex == activeBlockIndex()) {
        // current event
        eventList = document.getElementById("current-event-list");
    } else {
        // scheduled event
        eventList = document.getElementById("scheduled-event-list");
    }

    // prepare elements
    const newEventName = document.createElement("p2");
    const newEventLocation = document.createElement("p2");

    newEventName.classList.add("event-name");
    newEventLocation.classList.add("event-location");

    // set the text based on the data
    newEventName.innerText = eventName;
    newEventLocation.innerText = eventLocation;

    // add the elements to event list
    // NOTE: order of the following lines matters
    eventList.appendChild(newEventName);
    eventList.appendChild(newEventLocation);
}

function updateEventList(eventsDataString) {
    var block = "Unset Block";
    var genre = "Unset Genre";

    for (line of eventsDataString.split("\n")) {
        console.debug("Line:", line);
        if (line == "") {
            // should not happen but whatever, ignore
            continue;
        } else if (line.startsWith("$")) {
            // attribute line: `$ATTRNAME:Attribute Value`
            const attributeName = line.split(":")[0].slice(1);
            const attributeValue = line.split(":")[1];

            if (attributeName == "BLOCK") {
                block = attributeValue;
            } else if (attributeName == "GENRE") {
                genre = attributeValue;
            }
        } else {
            // data line: `Event Name;Event Location;Points Worth`
            const dataValues = line.split(";");
            console.debug("Data values:", dataValues);
            const eventName = dataValues[0];
            const eventLocation = dataValues[1];
            const eventWorth = dataValues[2];

            addEventToList(eventName, eventLocation, eventWorth, block, genre);
        }
    }
}

function updateTotalScores(totalScores) {
    var blueScore = totalScores["blue-total-score"];
    var goldScore = totalScores["gold-total-score"];

    document.getElementById("blue-score").innerText = blueScore;
    document.getElementById("gold-score").innerText = goldScore;
}

function update() {
    document.getElementById("current-block").innerText = blocksInOrder[activeBlockIndex()];

    fetch("../blue-and-gold-games/data/events.data").then(response => {
        if (!response.ok) {
            throw new Error("Bad Response")
        }
        return response.text()
    }).then(updateEventList)
        .catch(error => {
            console.error(error);
            // document.getElementById("portfolio-code3").innerText = "Unable to fetch portfolio, try again later"
        });

    fetch("../blue-and-gold-games/data/totalScores.json").then(response => {
        if (!response.ok) {
            throw new Error("Bad Response")
        }
        return response.text()
    }).then(JSON.parse).then(updateTotalScores)
        .catch(error => {
            console.error(error);
            // document.getElementById("portfolio-code3").innerText = "Unable to fetch portfolio, try again later"
        });
}

update();
