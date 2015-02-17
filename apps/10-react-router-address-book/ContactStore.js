var API = 'http://addressbook-api.herokuapp.com/contacts';

var _contacts = {};
var _changeListeners = [];
var _initCalled = false;

var ContactStore = module.exports = {

    init() {
        if (_initCalled) return;

        _initCalled = true;

        getJSON(API, (err, res) => {
            res.contacts.forEach(contact => {
                _contacts[contact.id] = contact;
            });

            ContactStore.notifyChange();
        });
    },

    getContacts() {
        var array = [];

        for (var id in _contacts)
            array.push(_contacts[id]);

        return array;
    },

    getContact(id) {
        return _contacts[id];
    },

    addChangeListener(listener) {
        _changeListeners.push(listener);
    },

    removeChangeListener(listener) {
        _changeListeners = _changeListeners.filter(l => {
            return l !== listener
        });
    },

    notifyChange() {
        _changeListeners.forEach(listener => {
            listener();
        });
    },

    addContact(contact, cb) {
        postJSON(API, {contact: contact}, res => {
            _contacts[res.contact.id] = res.contact;
            ContactStore.notifyChange();
            if (cb) cb(res.contact);
        });
    },

    removeContact(id, cb) {
        deleteJSON(API + '/' + id, cb);
        delete _contacts[id];
        ContactStore.notifyChange();
    }
};

var AUTH_ID = 'xxx-123-abc';
getJSON = (url, cb) => {
    var req = new XMLHttpRequest();
    req.onload = () => {
        if (req.status === 404) {
            cb(new Error('not found'));
        } else {
            cb(null, JSON.parse(req.response));
        }
    };
    req.open('GET', url);
    req.setRequestHeader('AUTHORIZATION', AUTH_ID);
    req.send();
};

deleteJSON = (url, cb) => {
    var req = new XMLHttpRequest();
    req.onload = cb;
    req.open('DELETE', url);
    req.setRequestHeader('AUTHORIZATION', AUTH_ID);
    req.send();
}

postJSON = (url, obj, cb) => {
    var req = new XMLHttpRequest();
    req.onload = () => {
        cb(JSON.parse(req.response));
    };
    req.open('POST', url);
    req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    req.send(JSON.stringify(obj));
}
