
var AUTH_ID = 'af35g1be'
var xhr = {
    getJSON(url, cb) {
        var req = new XMLHttpRequest();
        req.onload = () => {
            if (req.status === 404) {
                cb(new Error('not found'));
            } else {
                cb(null, JSON.parse(req.response));
            }
        }
        req.open('GET', url);
        req.setRequestHeader('Authorization', AUTH_ID);
        req.send();
    },

    postJSON(url, obj, cb) {
        var req = new XMLHttpRequest();
        req.onload = () => {
            cb(JSON.parse(req.response));
        };
        req.open('POST', url);
        req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        req.setRequestHeader('Authorization', AUTH_ID);
        req.send(JSON.stringify(obj));
    },

    deleteJSON(url, cb) {
        var req = new XMLHttpRequest();
        req.onload = cb;
        req.open('DELETE', url);
        req.setRequestHeader('Authorization', AUTH_ID);
        req.send();
    }
};

module.exports = xhr;