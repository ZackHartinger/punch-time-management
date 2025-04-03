// Date format helpers

export const to12Hour = (time) => {
    const [hours, minutes] = time.split(':')
    let formattedTime = "";
    if (hours < 12) {
        formattedTime = hours + ":" + minutes + " AM";
    }
    else if (hours == 12) {
        formattedTime = hours + ":" + minutes + " PM";
    }
    else {
        formattedTime = (hours - 12) + ":" + minutes + " PM";
    }
    return formattedTime;
}

