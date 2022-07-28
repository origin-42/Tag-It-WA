export const GetDate = (epoch) => {
    var myDate = new Date(epoch * 1000);
    return myDate.toDateString();
}