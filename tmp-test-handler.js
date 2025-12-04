const handler = require('./pages/api/pdf').default;

const req = {
  method: 'GET',
  query: { subject: 'Chemistry', topic: 'Sets', grade: '12' },
};

const res = {
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(payload) {
    console.log('status', this.statusCode, 'payload keys', Object.keys(payload));
    if (payload.message) {
      console.log('message', payload.message);
    }
    if (payload.base64) {
      console.log('base64 length', payload.base64.length);
    }
  },
};

handler(req, res).then(() => console.log('done')).catch((err) => console.error(err));
