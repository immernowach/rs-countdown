$(document).ready(function() {
    const rsStartDate = new Date("Jul 1, 2024 00:00:00").getTime();
    const rsEndDate = new Date("Nov 1, 2024 23:59:59").getTime();
    const totalDuration = rsEndDate - rsStartDate;
    const totalDays = Math.ceil(totalDuration / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.ceil(totalDays / 7);

    let showTimeLeft = true;

    // Toggle between time left and time passed
    $("#title").click(function() {
        showTimeLeft = !showTimeLeft;
        $(this).text(showTimeLeft ? "Wie lange noch???" : "Wie viel ist geschafft???");
        updateLabels();
    });

    function updateLabels() {
        if (showTimeLeft) {
            $("#weeksLabel").text("Wochen übrig");
            $("#daysLabel").text("Tage übrig");
            $("#percentLabel").text("Prozent übrig");
        } else {
            $("#weeksLabel").text("Wochen geschafft");
            $("#daysLabel").text("Tage geschafft");
            $("#percentLabel").text("Prozent geschafft");
        }
    }

    // Update the countdown every 1 second
    const countdownFunction = setInterval(function() {
        // Get the current date and time
        const now = new Date().getTime();

        // Calculate the remaining time
        const distance = rsEndDate - now;
        const elapsedTime = now - rsStartDate;

        // Time calculations for days, weeks, hours, minutes, and seconds
        const daysLeft = Math.floor(distance / (1000 * 60 * 60 * 24));
        const weeksLeft = Math.floor(daysLeft / 7);
        const hoursLeft = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);

        const daysPassed = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
        const weeksPassed = Math.floor(daysPassed / 7);
        const hoursPassed = Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesPassed = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        const secondsPassed = Math.floor((elapsedTime % (1000 * 60)) / 1000);

        // Calculate progress in percentage
        const progressPercent = ((elapsedTime / totalDuration) * 100).toFixed(2);

        // Display the results
        $("#daysLeft").text(showTimeLeft ? daysLeft : daysPassed);
        $("#hoursLeft").text(showTimeLeft ? hoursLeft : hoursPassed);
        $("#minutesLeft").text(showTimeLeft ? minutesLeft : minutesPassed);
        $("#secoundsLeft").text(showTimeLeft ? secondsLeft : secondsPassed);

        $("#weeksCount").text(showTimeLeft ? weeksLeft : weeksPassed);
        $("#weeksMax").text(totalWeeks);

        $("#daysCount").text(showTimeLeft ? daysLeft : daysPassed);
        $("#daysMax").text(totalDays);

        $("#progressPercent").text(progressPercent);

        // If the countdown is finished, display a message
        if (distance < 0) {
            clearInterval(countdownFunction);
            $("#daysLeft").text("0");
            $("#hoursLeft").text("0");
            $("#minutesLeft").text("0");
            $("#secoundsLeft").text("0");
            $("#weeksCount").text("0");
            $("#daysCount").text("0");
            $("#progressPercent").text("100.00");
        }
    }, 1000);
});
