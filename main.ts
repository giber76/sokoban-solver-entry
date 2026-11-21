import fs from'node:fs'
const{MAKEFUN_INPUT_DIR:I,MAKEFUN_OUTPUT_DIR:O}=process.env
let W
const L='udlr'
const J=d=>L[W.indexOf(d)]
const F=(a,o,p)=>{let q=[p],r=[];r[p]=-1
for(let h=0;h<q.length;h++)for(let d of W){let t=q[h]+d
if(!a[t]&&!o[t]&&r[t]==null){r[t]=q[h];q.push(t)}}
return r}
const P=s=>{let w=s.indexOf('\n'),a=[],g=[],b=[],p=0,i=0
for(let c of s){if(c=='\n')continue
a[i]=c=='#'
if('.+*'.includes(c))g.push(i)
if(c=='$'||c=='*')b.push(i)
if(c=='@'||c=='+')p=i
i++}
W=[-w,w,-1,1]
return{w,a,g,b,p}}
const S=V=>{let{a,g,b,p}=V,B=[b.slice()],A=[-1],U=[0],Q=[p],M=new Set()
M.add(b.join()+'|'+p)
for(let e=0;e<B.length;e++){let s=B[e],o=[]
for(let x of s)o[x]=1
let r=F(a,o,Q[e]-U[e])
for(let j in s){let bo=s[j]
for(let d of W){let t=bo+d
if(r[bo-d]==null||a[t]||o[t])continue
o[bo]=0;o[t]=1
let N=s.slice(),k;N[j]=t;N.sort((x,y)=>x-y);k=N.join()+'|'+bo
o[t]=0;o[bo]=1
if(M.has(k))continue
M.add(k);B.push(N);A.push(e);U.push(d);Q.push(t)
if(N.every(x=>g.includes(x))){let m='',x=B.length-1
while(x>0){let d=U[x],fr=Q[x]-d,pp=Q[A[x]]-U[A[x]],oo=[]
for(let z of B[A[x]])oo[z]=1
let v=F(a,oo,pp),u='',y=fr-d
while(y!=pp){u=J(y-v[y])+u;y=v[y]}
m=u+J(d)+m;x=A[x]}
return m}}}
}
return null}
const T=V=>{let{w,a,g,b,p}=V,r=(p/w)|0,A=a.slice(),n=a.length,q=new Array(n).fill(-1),R=[]
for(let i=r*w;i<(r+1)*w;i++)A[i]=1
for(let s=0;s<n;s++){if(A[s]||q[s]>=0)continue
let v=F(A,[],s);for(let t in v)q[t]=R.length
R.push({b:[],g:[]})}
for(let x of b)if(q[x]>=0)R[q[x]].b.push(x)
for(let x of g)if(q[x]>=0)R[q[x]].g.push(x)
return R.filter(x=>x.b.length)}
const C=V=>{let r=T(V)
if(!r)return S(V)
let p=V.p,m=''
for(let x of r){let a=V.a.slice()
for(let o of r)if(o!==x)for(let b of o.b)a[b]=1
let s=S({a,g:x.g,b:x.b,p})
if(s==null)return null
m+=s;for(let c of s)p+=W[L.indexOf(c)];x.b=x.g}
return m}
for(let id of fs.readdirSync(I)){let s=C(P(fs.readFileSync(I+'/'+id+'/level.txt','utf8'))),d=O+'/'+id;fs.mkdirSync(d,{recursive:true});fs.writeFileSync(d+'/solution.txt',(s||'')+'\n')}
