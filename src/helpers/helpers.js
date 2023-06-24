export const parseJwt = (token) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};


export const getToken =()=>{
    let token = localStorage.getItem("token");
    if(token){
        token = token.slice(1, -1)
        return token
    }
    else return 'unauthorized'

}

export const getCreator =()=>{
    let userData = JSON.parse(localStorage.getItem("user"));
    return userData.name
}



export const getStorageData = (key = '') => {
    console.log(localStorage.getItem(key));
    return JSON.parse(localStorage.getItem(key))
};

export const setStorageData = (key, data) => {
    if(key && data) {
       return  localStorage.setItem(key, JSON.stringify(data))
    }
};

export const generatePublicUrl = (fileName) => {
    return `http://localhost:4000/public/${fileName}`;
}



