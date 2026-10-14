import {put,list} from '@vercel/blob';
import {sign,isAdmin} from './_lib.js';
const path=k=>k==='public'?'site-data.json':'inv-'+sign('inv').slice(0,24)+'.json';
export default async function handler(req,res){
 const k=req.query.k;if(!['public','inv'].includes(k))return res.status(400).json({error:'bad key'});
 if(k==='inv'&&!isAdmin(req))return res.status(401).json({error:'Login required'});
 try{
  if(req.method==='GET'){
   const {blobs}=await list({prefix:path(k),limit:1});
   res.setHeader('Cache-Control',k==='public'?'public, s-maxage=5, stale-while-revalidate=30':'no-store');
   if(!blobs.length)return res.json(null);
   const r=await fetch(blobs[0].url+'?t='+Date.now());return res.json(await r.json());
  }
  if(req.method==='POST'){
   if(!isAdmin(req))return res.status(401).json({error:'Login required'});
   const s=JSON.stringify(req.body);if(!req.body||typeof req.body!=='object'||s.length>2e6)return res.status(400).json({error:'Invalid data'});
   await put(path(k),s,{access:'public',addRandomSuffix:false,allowOverwrite:true,contentType:'application/json',cacheControlMaxAge:60});
   return res.json({ok:true});
  }
  res.status(405).json({error:'Method not allowed'});
 }catch(e){res.status(500).json({error:'Storage error: '+e.message+' (is the Blob store connected?)'})}
}
