import crypto from 'crypto';
const S=()=>process.env.ADMIN_SECRET||'';
export const sign=v=>crypto.createHmac('sha256',S()).update(v).digest('hex');
export function isAdmin(req){const m=(req.headers.cookie||'').match(/jt_auth=([a-f0-9]{64})/);if(!m||S().length<16)return false;return crypto.timingSafeEqual(Buffer.from(m[1]),Buffer.from(sign('admin')))}
export const h=v=>crypto.createHash('sha256').update(String(v)).digest();
