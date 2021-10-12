//dailyunreachedpeoplegroup.js

Module.register("MMM-DailyUnreachedPeopleGroup", {
    // Default module config.
    unreached: [],
    defaults: {
        apiKey: '713e8995cb24'
    },

    start: function() {
        Log.info("Starting module: " + this.name);
        var self = this;
        var apiKey = this.config.apiKey

        //Do this once first
        self.sendSocketNotification('START', apiKey);

        //Then every - hours
        setInterval(function () {
            self.sendSocketNotification('START', configuredVersion);
        }, 3600000); //perform every hour (3600000 milliseconds)
    },

    getStyles: function () {
        return ["MMM-DailyUnreachedPeopleGroup.css"];
    },

    // Override dom generator.
    getDom: function() {
        Log.log("Updating MMM-DailyUnreachedPeopleGroup DOM.");

        var displayTitle = "";
        var displaySummary = "";
        var displayPray = "";

        if(this.groupAndCountry != null){
            displayTitle = this.groupAndCountry;
            displaySummary = this.peopleSummary;
            displayPray = this.peoplePray;
        }
        //create wrapper for module
        const wrapper = document.createElement("div")

        //create Title div, assign class, and innerHTML value for module
        var title = document.createElement("div")
        title.className = "dim title"
        title.innerHTML = displayTitle

        //create peopleSummary div and innerHTML value for module
        var peopleSummary = document.createElement("div")
        peopleSummary.innerHTML = displaySummary
        
        //create peoplePray div and innerHTML value for module
        var peoplePray = document.createElement("div")
        peoplePray.innerHTML = displayPray

        //switch statement that uses size as specified in MM config file to assign a class to people Summary and Prayer
        switch (this.config.size) {
            case 'xsmall':
                peopleSummary.className = "dim xsmall";
                peoplePray.className = "dim xsmall";
                break;
            case 'small':
                peopleSummary.className = "dim small";
                peoplePray.className = "dim small";
                break;
            case 'medium':
                peopleSummary.className = "dim medium";
                peoplePray.className = "dim medium";
                break;
            case 'large':
                peopleSummary.className = "dim large";
                peoplePray.className = "dim large";
                break;
            default:
                peopleSummary.className = "dim medium";
                peoplePray.className = "dim medium";
        }

        wrapper.appendChild(title, peopleSummary, peoplePray)
        wrapper.appendChild(peopleSummary)
        wrapper.appendChild(peoplePray)
        return wrapper;
        },

    //Receives websocket from module node.helper, parses out info & updates Dom
    socketNotificationReceived: function (notification, payload) {
        Log.log("socket received from MMM-DailyUnreachedPeopleGroup Node Helper");
        if (notification == "JOSHUA_PROJECT_RESULT") {
            
            let unreached = payload[0]

            if(unreached.PeopNameInCountry.includes(', ')){
                var peopleName = unreached.PeopNameInCountry.split(',')[1].substring(1) + " " + unreached.PeopNameInCountry.split(',')[0].substring(0);
            } else { 
                peopleName = unreached.PeopNameInCountry
            };
            Log.log("Unreached People Group of the Day -", peopleName);

            this.groupAndCountry = ('Today\'s Unreached People Group of the Day is the ' + peopleName + ' from ' + unreached.Ctry)
            this.peopleSummary = ('Summary: ' + unreached.ProfileText[0].Summary)
            this.peoplePray = ('Prayer: ' + unreached.ProfileText[0].PrayForPG)

            this.updateDom();
        }
    },
});
