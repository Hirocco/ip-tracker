
export const getLocation = (input) =>{
    let url = 'at_r9TflDSwL0FiTmvHoXop2s8XL4kSw'
    //let myIp = '5.173.33.132'
    return fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${url}&ipAddress=${input}`)
            .then(res=>res.json())
}

export default getLocation