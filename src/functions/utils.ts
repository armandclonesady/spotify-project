const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const nameLimit = 20;
const  allowedTypes : Array<string> = ['album', 'artist', 'playlist', 'track'];

const convertDate = (date: string, precision: string) => {
    const [year, month, day]: Array<number> = date.split('-').map((x: string) => parseInt(x));
    switch (precision) {
        case 'month':
            return `${intToMonth(month)} ${year}`;
        case 'day':
            return `${day} ${intToMonth(month)} ${year}`;
        default:
            return `${year}`;
    }
}

const intToMonth = (month: number) => {
    return months[month];
}

const shortenName = (name: string) => { 
    return name.substring(0, nameLimit) + "...";
}

const nameTooLong = (name: string) => {
    return name.length > nameLimit;
}

const msToTime = (duration: number) => {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    return `${hours > 0 ? hours + ':' : ''}${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

}

const convertFollowers = (followers: string): string => {
    const intFollowers = parseInt(followers);
    if (intFollowers > 1000000) {
        return `${(intFollowers / 1000000).toFixed(1)}M`;
    } else if (intFollowers > 1000) {
        return `${(intFollowers / 1000).toFixed(1)}K`;
    } else {
        return followers;
    }
}

const getTotalAlbumLenght = (albums: Array<any>) => {
    let total = 0;
    albums.forEach((track: any) => {
        total += track.duration_ms;
    });
    return total;
}

export {
    allowedTypes, 
    convertDate, 
    intToMonth, 
    shortenName, 
    nameTooLong, 
    msToTime, 
    convertFollowers, 
    getTotalAlbumLenght
};