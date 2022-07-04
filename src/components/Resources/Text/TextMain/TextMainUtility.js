const getStories = async() => {
    const response = await fetch('http://127.0.0.1:8010/getStories/', {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Headers" : "*"
        }});

    if(response.ok){
        const result = await response.json();
        return result['result'];
    }
    return [];
};

const getShabads = async() => {
    const response = await fetch('https://social-chatbot-backend.herokuapp.com/get_shabads/', {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Headers" : "*"
        }});
    console.log(response);
    if(response.ok){
        const result = await response.json();
        return result['result'];
    }
    return [];
};

const containerStyle = {
    padding : '2%',
};

const rowStyle = {
    padding : '1.5%',
};

export {
    getStories,
    getShabads,
    containerStyle,
    rowStyle,
};