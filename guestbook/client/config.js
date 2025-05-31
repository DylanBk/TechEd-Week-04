let env;

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ) {
    env = 'development';
} else {
    env = 'production';
}

export const API_URL = env === 'development' ? 'http://localhost:5000' : 'https://teched-week-04.onrender.com';