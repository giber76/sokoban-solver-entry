import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs'
const A=process.env.MAKEFUN_INPUT_DIR??'/input',B=process.env.MAKEFUN_OUTPUT_DIR??'/output',D=[[0,-1,'u'],[0,1,'d'],[-1,0,'l'],[1,0,'r']]
const P=t=>{let r=t.split('\n').filter(x=>x),h=r.length,w=Math.max(...r.map(x=>x.length)),a=new Uint8Array(w*h).fill(1),g=[],b=[],p=-1
r.forEach((s,y)=>{for(let x=0;x<s.length;x++){let c=s[x],i=y*w+x;if(c!='#'){a[i]=0;if('.*+'.includes(c))g.push(i);if('$*'.includes(c))b.push(i);if('@+'.includes(c))p=i}}})
b.sort((x,y)=>x-y);return{w,a,g,b,p}}
const V=L=>{let{w,a,g}=L,v=new Uint8Array(a.length),q=[...g]
for(let i=0;i<q.length;i++){v[q[i]]=1;for(let[dx,dy]of D){let d=dy*w+dx,y=q[i]-d;if(!a[y]&&!a[y-d]&&!v[y]){v[y]=1;q.push(y)}}}
return v}
const R=(L,o,f,s,t,k)=>{let{w,a}=L,l=f,n=0;k[n++]=f;s[f]=t
while(n){let p=k[--n];if(p<l)l=p;for(let[dx,dy]of D){let q=p+dy*w+dx;if(!a[q]&&!o[q]&&s[q]!=t){s[q]=t;k[n++]=q}}}
return l}
const F=(L,o,g,t)=>{let{w,a}=L
for(let x of[t,t-1,t-w,t-w-1]){let b=x+1,c=x+w,d=c+1
if((a[x]||o[x])&&(a[b]||o[b])&&(a[c]||o[c])&&(a[d]||o[d])&&((o[x]&&!g[x])||(o[b]&&!g[b])||(o[c]&&!g[c])||(o[d]&&!g[d])))return 1}
return 0}
const W=(L,o,f,t)=>{let{w,a}=L,v=new Uint8Array(a.length),s=''
const d=p=>{if(p==t)return 1;v[p]=1;for(let[dx,dy]of D){let q=p+dy*w+dx;if(!a[q]&&!o[q]&&!v[q]&&d(q)){s=(dy?dy<0?'u':'d':dx<0?'l':'r')+s;return 1}}return 0}
if(!d(f))throw 0
return s}
const S=(L,M=250000)=>{let{w,a,g}=L,n=a.length,G=new Uint8Array(n),o=new Uint8Array(n),s=new Int32Array(n),m=new Int32Array(n),k=new Int32Array(n),z=0
for(let x of g)G[x]=1
let v=V(L);if(L.b.some(b=>!v[b]))return null
let B=[L.b],Y=[L.p],A=[-1],U=[0],Q=[0],I=new Map()
for(let b of L.b)o[b]=1
I.set(L.b.join()+'|'+R(L,o,L.p,s,++z,k),0)
for(let b of L.b)o[b]=0
let f=L.b.every(b=>G[b])?0:-1
for(let e=0;f<0&&e<B.length;e++){let bs=B[e]
for(let b of bs)o[b]=1
R(L,o,Y[e],s,++z,k);let H=z
for(let j=0;j<bs.length&&f<0;j++){let b=bs[j]
for(let[dx,dy]of D){let d=dy*w+dx,t=b+d
if(s[b-d]!=H||a[t]||o[t]||!v[t])continue
o[b]=0;o[t]=1
let Z=F(L,o,G,t),K=-1,N=null
if(!Z){N=bs.slice();N[j]=t;N.sort((x,y)=>x-y);K=N.join()+'|'+R(L,o,b,m,++z,k)}
o[t]=0;o[b]=1
if(Z||I.has(K))continue
if(B.length>=M)return null
I.set(K,B.length);B.push(N);Y.push(b);A.push(e);U.push(d);Q.push(t)
if(N.every(b=>G[b])){f=B.length-1;break}}}
for(let x of bs)o[x]=0}
if(f<0)return null
let q=[],mv='',p=L.p,bs=L.b
for(let x=f;x>0;x=A[x])q.unshift(x)
for(let x of q){let nb=B[x],d=U[x],to=Q[x],fr=to-d
for(let b of bs)o[b]=1
mv+=W(L,o,p,fr-d)
for(let b of bs)o[b]=0
mv+=d==-w?'u':d==w?'d':d==-1?'l':'r';p=fr;bs=nb}
return mv}
const T=L=>{let{w,a,g,b,p}=L,v=V(L),r=(p/w)|0,A=a.slice()
for(let i=r*w;i<(r+1)*w;i++)if(!A[i]&&!v[i])A[i]=1
if(b.some(x=>A[x]))return null
let q=new Int32Array(A.length).fill(-1),R=[]
for(let s=0;s<A.length;s++){if(A[s]||q[s]>=0)continue
let f=[s];q[s]=R.length
for(let i=0;i<f.length;i++)for(let[dx,dy]of D){let n=f[i]+dy*w+dx;if(!A[n]&&q[n]<0){q[n]=R.length;f.push(n)}}
R.push({b:[],g:[]})}
for(let x of b)R[q[x]].b.push(x)
for(let x of g)if(q[x]>=0)R[q[x]].g.push(x)
if(g.some(x=>q[x]<0)||R.some(r=>r.b.length-r.g.length))return null
return R.filter(r=>r.b.length)}
const C=L=>{let r=T(L)
if(!r)return S(L)
let p=L.p,mv=''
for(let x of r){let a=L.a.slice()
for(let o of r)if(o!==x)for(let b of o.done?o.g:o.b)a[b]=1
let s=S({w:L.w,a,g:x.g,b:x.b,p})
if(s==null)return null
mv+=s;for(let c of s)p+=c=='u'?-L.w:c=='d'?L.w:c=='l'?-1:1;x.done=1}
return mv}
for(let id of readdirSync(A).sort()){let s=C(P(readFileSync(A+'/'+id+'/level.txt','utf8')));mkdirSync(B+'/'+id,{recursive:true});writeFileSync(B+'/'+id+'/solution.txt',(s||'')+'\n')}
