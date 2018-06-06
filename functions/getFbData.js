const axios = require('axios');

module.exports = (id, token) => {
    const url = `https://graph.facebook.com/v2.6/${id}?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${token}`;
    return axios.get(url)    
}