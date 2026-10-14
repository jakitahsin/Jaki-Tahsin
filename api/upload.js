import {put} from '@vercel/blob';
import {isAdmin} from './_lib.js';
export default async function handler(req,res){
 if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
 if(!isAdmin(req))return res.status(401).json({error:'Login required'});
 const m=/^data:(image\/(?:png|jpeg|webp));base64,(.+)$/.exec(req.body?.dataUrl||'');
 if(!m)return res.status(400).json({error:'Only PNG, JPEG or WebP images'});
 const buf=Buffer.from(m[2],'base64');if(buf.length>4e6)return res.status(400).json({error:'Image too large (max 4MB)'});
 const name=String(req.body.name||'img').replace(/[^a-z0-9._-]/gi,'_').slice(0,50).replace(/\.[a-z]+$/i,'')+'.'+m[1].split('/')[1];
 try{const b=await put('uploads/'+name,buf,{access:'public',contentType:m[1],addRandomSuffix:true});res.json({url:b.url})}
 catch(e){res.status(500).json({error:'Upload failed: '+e.message})}
}
