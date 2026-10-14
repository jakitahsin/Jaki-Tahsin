import crypto from 'crypto';
import {sign,isAdmin,h} from './_lib.js';
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method==='GET')return res.json({admin:isAdmin(req)});
 if(req.method==='DELETE'){res.setHeader('Set-Cookie','jt_auth=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0');return res.json({ok:true})}
 if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
 const pw=process.env.ADMIN_PASSWORD;
 if(!pw||(process.env.ADMIN_SECRET||'').length<16)return res.status(500).json({error:'Set ADMIN_PASSWORD and ADMIN_SECRET (16+ chars) in Vercel env vars, then redeploy.'});
 const ok=crypto.timingSafeEqual(h(req.body?.password||''),h(pw));
 if(!ok){await new Promise(r=>setTimeout(r,800));return res.status(401).json({error:'Wrong password'})}
 res.setHeader('Set-Cookie',`jt_auth=${sign('admin')}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`);
 res.json({ok:true});
}
