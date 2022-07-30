
export const getLocation = (input) =>{
    var location = {
        IP_ADDRESS : "",
        ISP :"",
        CITY:"",
        TIMEZONE:"",
        POSTALCODE:""
    };

    let url = 'at_r9TflDSwL0FiTmvHoXop2s8XL4kSw'
    //let myIp = '5.173.33.132'
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${url}&ipAddress=${input}`)
        .then(res=>res.json())
        .then(res=>{
           /* console.log(res.ip);
            console.log(res.isp);
            console.log(res.location.city);
            console.log(res.location.timezone , res.location.postalCode)*/
            location.IP_ADDRESS = res.ip;
            location.ISP = res.isp;
            location.CITY = res.location.city;
            location.TIMEZONE = res.location.timezone;
            location.POSTALCODE = res.location.postalcode;
        })
    return location
}

export default getLocation